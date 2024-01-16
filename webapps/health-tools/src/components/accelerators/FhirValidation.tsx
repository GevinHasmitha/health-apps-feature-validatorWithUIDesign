import { Box, Container } from "@mui/material";
import { isError } from "util";
import { THROTTLED_OUT_PAGE_TITLE } from "../../configs/TextConstants";
import LoginOverlay from "../authentication/LoginOverlay";
import ErrorDisplay from "../error/ErrorDisplay";
import BasicTabs from "../execution/BasicTabs";
import React, { useCallback, useContext, useState } from "react";
import { CodeEditor } from "../execution/CodeEditor";
import { HttpRequestConfig, useAuthContext } from "@asgardeo/auth-react";
import DOMPurify from "dompurify";
import { DarkModeContext } from "../context/DarkModeContext";
import { HL7V2_TO_FHIR_URL } from "../../configs/Constants";

import _ from 'lodash';
// import CodeMirror from "@uiw/react-codemirror";
import { classname } from "@uiw/codemirror-extensions-classname";
import { json } from "@codemirror/lang-json";
import  "./FhirValidationCSS.css"
import { ReactNode } from 'react';
import { Alert,AlertTitle } from '@mui/material';

interface State {
  input: string;
  output: string;
  errorMessage: string;
  isError: boolean;
  isLoading: boolean;
  outputType: string;
  statusCode: string;
}

export const FhirValidation = () => {

  const [extensions, setExtensions] = useState<any>([json()]);
  var errorLines:number[] = [];
  // const [errorLines, setErrorLines] = useState<number[]>([]);

  const [state, setState] = useState<State>({
    input: "",
    output: "",
    errorMessage: "",
    isError: false,
    isLoading: false,
    outputType: "json",
    statusCode: "500",
  });

  const { state: authState, httpRequest } = useAuthContext();
  const { isAuthenticated = false } = authState;
  const [screenWidth, setScreenWidth] = React.useState<number>(
    window.innerWidth
  );

  const handleResize = (): void => setScreenWidth(window.innerWidth);
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    input,
    output,
    errorMessage,
    isError,
    isLoading,
    outputType,
    statusCode,
  } = state;

  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const handleInputChange = useCallback((value: string) => {
    setState((prevState) => ({
      ...prevState,
      input: value,
    }));
  }, []);

  const handleInputClear = () => {
    setState((prevState) => ({
      ...prevState,
      input: "",
    }));
  };

  const validateInput = () => {
    if (state.input !== "") {
      const cleanInput = DOMPurify.sanitize(state.input);
      setState((prevState) => ({
        ...prevState,
        input: cleanInput,
      }));
    }
  };

  const handleOutputClear = () => {
    setState((prevState) => ({
      ...prevState,
      output: "",
      isError: false,
    }));
  };

  const readFile = (fileInput?: string | ArrayBuffer | null) => {
    if (typeof fileInput == "string") {
      setState((prevState) => ({
        ...prevState,
        input: fileInput,
      }));
    }
  };

  const checkForMissingFields=(errorData:string[]):boolean => {
    for (let data of errorData){
      let pattern = /Missing required field '([^']+)'/;
      const patternMatch = data.match(pattern);
      if (patternMatch && patternMatch.length === 2){
        // console.log(patternMatch[1]);
        return true;
      }
    }
    return false;
  }


  const validateInvalidFields=(errorData:string[],userInputJson:JSON):JSON =>{
    for (let data of errorData){
      let pattern = /Invalid field '([^']*)'/;
      const patternMatch = data.match(pattern);
      if (patternMatch && patternMatch.length === 2){
      //  console.log(patternMatch[1]);
       userInputJson = addPrefixToMatchingKey(userInputJson, patternMatch[1]);
      }
    }
    return userInputJson;
  }

  const validateInvalidValues=(errorData:string[], userInputJson:JSON)=>{
    for (let data of errorData){
      let pattern = /Invalid value of field '([^']*)'/;
      const patternMatch = data.match(pattern);
      if (patternMatch && patternMatch.length === 2){
      //  console.log(patternMatch[1]);
        modifyInvalidValues(userInputJson, patternMatch[1]);
      }
     }
  }

  const validateDateTime=(errorData:string[],userInputJson:JSON):JSON => {
    for (let data of errorData){
      let pattern =/Invalid pattern \(constraint\) for field '([^']*)'/;
      const patternMatch = data.match(pattern);
      if (patternMatch && patternMatch.length === 2){
       console.log(patternMatch[1]);
       userInputJson = addPrefixToMatchingKey(userInputJson, patternMatch[1]);
      }
     }
     return userInputJson;
    }


  const modifyInvalidValues=(userInputJson:JSON, fieldvalue:string) =>{
    /*If the error is created by a value, below code is used to navigate to that field. Then it will directly 
      add $$ to that value, so calling the addPrefixToMatchingKey function is not needed (this can be done because if the error
      is with a value, the error message will contain the path, if it is with a key, we have to use the 
      addPrefixToMatchingKey function to search for the location of the key in the json)*/
    //const _ = require("lodash"); //Had to use a library because value can also be nested several levels deep

    if (fieldvalue) {
      try {
            // Get the current value
            const currentValue = _.get(userInputJson, fieldvalue);
            // console.log("Current value: " + currentValue);
            // console.log(JSON.stringify(userInputJson))
            // Modify the value
            const modifiedValue = "$$" + currentValue;
            // Set the new value
            _.set(userInputJson, fieldvalue, modifiedValue); //Appending $$ to the key cant be done because keys are immutable so have to create a new key and append it to the json
      } catch (error) {
        console.error(error);
      }
    }
  }

  const addPrefixToMatchingKey=(obj:any, searchString:string)=> {
    for (let key in obj) {
      if (key === searchString || key === "") {
        //if key is empty string, then the error is with the resourceType
        let entries = Object.entries(obj); //Similar to map

        // Iterate over the array
        for (let i = 0; i < entries.length; i++) {
          if (entries[i][0] === key) {
            // Replace the key
            entries[i][0] = "$$" + key;
          }
        }
        // Convert array back to object
        obj = Object.fromEntries(entries);
        return obj;
      }

      /*Here if the current key has an object as the value, this will execute*/
      if (typeof obj[key] === "object") {
        /*If the current key's value is an array containing many objects, then the else will execute therby recursively executing 
         addPrefixToMatchingKey for each object in the array. But if the current key's value is just a simple object, the the "if" will run
         executind addPrefixToMatchingKey for the current object*/
        if (!Array.isArray(obj[key])) {
          let obj2 = addPrefixToMatchingKey(obj[key], searchString);
          obj[key] = obj2;
        } else {
          for (const arrayElementIndex in obj[key]) {
            let obb = addPrefixToMatchingKey(
              obj[key][arrayElementIndex],
              searchString
            );
            obj[key][arrayElementIndex] = obb;
          }
        }
      }
    }
    return obj;
  }



  const findErrorLines=(userInputJson:JSON, errorLines:number[]) =>{
    let jsonStringg = JSON.stringify(userInputJson, null, 2); // 2 is the number of spaces for indentation

    //Finds error locations by getting the line numbers where $$ is present
    if (jsonStringg) {
      let linesArr = jsonStringg.split("\n");

      for (let i = 0; i < linesArr.length; i++) {
        if (linesArr[i].includes("$$")) {
          linesArr[i] = linesArr[i].replace("$$", "");
          errorLines.push(i);
      //    setErrorLines((prevState) => [...prevState, i]);
        }
      }
      let modifiedJsonStringg = linesArr.join("\n");
      //  document.getElementById('content').innerHTML = `<pre>${modifiedJsonStringg}</pre>`;
      // setValue(modifiedJsonStringg);
      setState((prevState) =>({
        ...prevState,
        input: modifiedJsonStringg
      }))
    }
  }

  const classnameExt = classname({
    add: (lineNumber) => {
      for (const line of errorLines) {
        if (line === lineNumber - 1) {
          return "errorMarker";
        }
      }
    },
  });


  const callBackend = async (): Promise<string[]>  => {
    let errorData:string[]= [];
    
    // Change this method to call the FHIR validation endpoint
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      output: "",
      isError: false,
      errorMessage: "",
    }));

    let userInputJson="";
    try {
      userInputJson = JSON.parse(input);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }

    validateInput();
  
    const Config = window.Config;
    const requestConfig: HttpRequestConfig = {
      url: "http://localhost:9090/sampleResource",
      method: "POST",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
      },
      data: userInputJson,
    };
    await httpRequest(requestConfig)
      .then((res) => {
        errorData = res.data;;

      })
      .catch((error) => {
        console.log(error)

      });
      return errorData;
  };


  const handleSubmit =  async () => {
    // setState((prevState) => ({
    //   ...prevState,
    //   isError: true,

    // }));

    let userInputJson;
    try {
      userInputJson = JSON.parse(input);
    } catch (error:any) {
      console.log(`Invalid JSON format: ${error.message}`)
      return;
    }

    let errorData: string[] = await callBackend();
    if(errorData.length == 0){
      console.log("Validation Successful")
      setExtensions([json()]);
      return;
    }
    console.log(errorData);

    // console.log(input);
    const missingFields = checkForMissingFields(errorData);

    userInputJson = validateInvalidFields(errorData, userInputJson);

    validateInvalidValues(errorData, userInputJson);

    userInputJson = validateDateTime(errorData, userInputJson);

    findErrorLines(userInputJson, errorLines);
    console.log(errorLines);

    //For displaying the error messages(FOR TESTING PURPOSES)
    //====================================================
    let newOutput = "";
    for(let i=0; i<errorData.length; i++){
      newOutput += "\n" + JSON.stringify(errorData[i] + "\n");
    }  
    setState((prevState) =>({
      ...prevState,
      output: newOutput
    }));
    //======================================================


// setState((prevState) =>({
//   ...prevState,
//   output: JSON.stringify(errorData)
// }))

    // console.log(JSON.stringify(userInputJson, null, 2));

    //Highlighting the lines with errors
    if (!errorData && missingFields === false) {
      setExtensions([json()]); //Hides the line highlights when succesful
    } else {
      setExtensions([classnameExt, json()]); //Highlights the lines when having errors
    }


  }
  // function getGreeting(name: string): ReactNode {
  //   return <h1>Hello, {name}!</h1>;
  // }

  const outputDisplay = (): ReactNode => {
    return  (
     <Alert 
        severity="error"
        sx={{
        width:"95%",
          margin:"10px",
          background:"#FFD6D6",
          borderRadius:"10px",
          boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.1)",
          lineHeight:"0.7",
      }}
     >
       <AlertTitle>Error</AlertTitle>
        This is a success Alert with an encouraging title.
    </Alert>
    )
  }

  const inputEditor = (
    <CodeEditor
      title="FHIR Resource"
      value={input}
      readOnly={!isAuthenticated}
      onChange={handleInputChange}
      darkMode={darkMode}
      onClear={handleInputClear}
      onExecute={handleSubmit}
      placeholder="Paste or edit a FHIR resource here..."
      // fileType="json"
      uploadEnabled
      readFile={readFile}
      clearEnabled
      width="100%"
      height="calc(100vh - 197px)"
      id="comp-fhir-validation-input-editor"
      aria-label="HL7 Resource Editor"
      isDisabled={!isAuthenticated}
      executeButtonToolTipText="Perform transformation"
      acceptFileTypes=".txt"
      extensions={extensions}
    />
  );

  const outputEditor = (
    <CodeEditor
      title="Result"
      value={output}
      readOnly
      darkMode={darkMode}
      onClear={handleOutputClear}
      placeholder={
        isLoading ? "Loading..." : "FHIR Resource will be displayed here..."
      }
      fileType={outputType}
      downloadEnabled
      downloadName="hl7-to-fhir-output"
      clearEnabled
      width="100%"
      height="calc(100vh - 197px)"
      id="comp-hl7-to-fhir-output-editor"
      aria-label="FHIR Resource Editor"
      isDisabled={!isAuthenticated}
      isLoading={isLoading}
    />
  );
  return (
    <Container
      id="hl7v2-to-fhir-container"
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column", height: 1, mt: 0 }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
        marginTop={5}
      >
        {screenWidth < 900 && (
          <>
            <BasicTabs
              inputEditor={inputEditor}
              outputEditor={outputEditor}
              isInterectable={isAuthenticated}
              statusCode={statusCode}
              isError={isError}
              errorMessage={errorMessage}
            ></BasicTabs>
          </>
        )}
        {screenWidth >= 900 && (
          <>
            {!isAuthenticated && <LoginOverlay />}
            <Box
              sx={{
                pr: 1,
                pb: 1,
                width: "50%",
              }}
              id="box-hl7-resource-box"
              aria-label="HL7 Resource Box"
            >
              {inputEditor}
            </Box>
            <Box
              sx={{
                pl: 1,
                pb: 1,
                width: "50%",
                border: 1,
                borderColor: "grey.500",
                overflow: "auto",
                height:"300px",
              }}
              id="box-fhir-resource-box"
              aria-label="FHIR Resource Box"
            >
              <>
                {isError && (
                  <ErrorDisplay
                    statusCode={statusCode}
                    message={
                      statusCode == "429"
                        ? THROTTLED_OUT_PAGE_TITLE
                        : errorMessage
                    }
                  />
                )}
                {outputDisplay()}
                {outputDisplay()}
                {outputDisplay()}
                {outputDisplay()}
                {outputDisplay()}
                {outputDisplay()}
                {outputDisplay()}
                {outputDisplay()}
              </>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};
