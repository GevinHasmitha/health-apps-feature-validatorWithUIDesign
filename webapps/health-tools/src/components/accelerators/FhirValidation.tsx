import { Box, Container } from "@mui/material";
import { THROTTLED_OUT_PAGE_TITLE } from "../../configs/TextConstants";
import LoginOverlay from "../authentication/LoginOverlay";
import ErrorDisplay from "../error/ErrorDisplay";
import BasicTabs from "../execution/BasicTabs";
import React, { useCallback, useContext, useState } from "react";
import { CodeEditor } from "../execution/CodeEditor";
import { HttpRequestConfig, useAuthContext } from "@asgardeo/auth-react";
import DOMPurify from "dompurify";
import { DarkModeContext } from "../context/DarkModeContext";

import _, { set } from 'lodash';
import { classname } from "@uiw/codemirror-extensions-classname";
import { json } from "@codemirror/lang-json";
import  "./FhirValidationCSS.css"
import { ReactNode } from 'react';
import { Alert,AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';

interface State {
  input: string;
  output: string;
  errorMessage: string;
  isError: boolean;
  isLoading: boolean;
  outputType: string;
  statusCode: string;
  extensions: any;
  globalErrorData: string[];
  globalUserInputJson: any; //Because an issue arises when initializing state with JSON
  globalErrorLines: number[];
  windowView: boolean;
  validationState: boolean;
}

export const FhirValidation = () => {

  //const [extensions, setExtensions] = useState<any>([json()]);
 // const [globalErrorData, setGlobalErrorData] = useState<string[]>([]);
//  const [globalUserInputJson, setGlobalUserInputJson] = useState<JSON>();
 // const [globalErrorLines, setGlobalErrorLines] = useState<number[]>([]);
 // const [windowView, setWindowView] = useState<boolean>(false);
//  const [validationState, setValidationState] = useState<boolean>(false);
  let errorLines:number[] = [];


  const [state, setState] = useState<State>({
    input: "",
    output: "",
    errorMessage: "",
    isError: false,
    isLoading: false,
    outputType: "json",
    statusCode: "500",
    extensions: [json()],
    globalErrorData: [],
    globalUserInputJson: {},
    globalErrorLines: [],
    windowView: false,
    validationState: false
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
 //   setValidationState(false);  //So that the the success alert reset each time input changes
    setState((prevState) => ({
      ...prevState,
      validationState: false,   //So that the the success alert reset each time input changes
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

  const displayErrorMessages = (errorData : string[]) => {
 //   setGlobalErrorData([]); //Clears the error messages from the previous validation
    // setState((prevState)=>({  //Clears the error messages from the previous validation
    //   ...prevState,
    //   globalErrorData: []
    // }))
    let j=0;
    for(let i=0; i< errorData.length; i++){
      if (
        errorData[i].includes("Missing required field") ||
        errorData[i].includes("Resource type is invalid") ||
        errorData[i].includes("Missing required Element") ||
        errorData[i].includes("may be missing or invalid or it's value invalid")
      ) {
     //   setGlobalErrorData((prevState) => [...prevState, errorData[i]]);
        setState((prevState) => ({
          ...prevState,
          globalErrorData: prevState.globalErrorData ? [...prevState.globalErrorData, errorData[i]] : [errorData[i]]
        }));


      } else {
        // document.getElementById("errorMsg").innerHTML += `<b>Line ${errorLines[j] + 1}) ${errorData[i]}<br><br><b>`;
        const errorMessage = `Line ${errorLines[j] + 1}) ${errorData[i]}`;
   //     setGlobalErrorData((prevState) =>[...prevState,errorMessage]);
        setState((prevState) => ({
          ...prevState,
          globalErrorData: prevState.globalErrorData ? [...prevState.globalErrorData, errorMessage] : [errorMessage]
        }));
        j++;
      }
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

  const scrollToErrorLine=(userInputJson: JSON, scrollLine : number)=>{

    const jsonString = JSON.stringify(userInputJson, null, 2);
    const lines = jsonString.split('\n');
    const scroller = document.getElementsByClassName("cm-scroller")[0];

    if (scroller) {
      const totalLines = lines.length;/* total number of lines in the json */
      const totalHeight = scroller.scrollHeight;
      const singleLineHeight = totalHeight / totalLines;
  
      const targetY = (singleLineHeight * scrollLine)-22;

      scroller.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });

    }
  }  



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

    setState((prevState)=>({  //Clears the error messages from the previous validation
      ...prevState,
      globalErrorData: []
    }))

    let userInputJson:JSON;
    try {
      userInputJson = JSON.parse(input);
    } catch (error:any) {
      console.log(`Invalid JSON format: ${error.message}`)
     // setWindowView(true);
   //   setGlobalErrorData([`Invalid JSON format: ${error.message}`])
      setState((prevState)=>({
        ...prevState,
        globalErrorData: [`Invalid JSON format: ${error.message}`],
        windowView: true
      }))
      return;
    }

    let errorData: string[] = await callBackend();
    if(errorData.length == 0){
      console.log("Validation Successful")
      //setExtensions([json()]);  //Removes the line highlighting if added
      setState((prevState)=>({
        ...prevState,
        extensions: [json()],
        windowView: false,
        validationState: true
      }))
    //  setWindowView(false);     //So that the alert boxes are not displayed
    //  setValidationState(true);  //So that the the success alert is displayed
      return;
    }
    console.log(errorData);

    const missingFields = checkForMissingFields(errorData);

    userInputJson = validateInvalidFields(errorData, userInputJson);

    validateInvalidValues(errorData, userInputJson);

    userInputJson = validateDateTime(errorData, userInputJson);

    findErrorLines(userInputJson, errorLines);

    //Highlighting the lines with errors
    if (!errorData && missingFields === false) {
    //  setExtensions([json()]); //Hides the line highlights when succesful
      setState((prevState)=>({
        ...prevState,
        extensions: [json()]
      }))
      
    } else {
    //  setExtensions([classnameExt, json()]); //Highlights the lines when having errors
      setState((prevState)=>({
        ...prevState,
        extensions: [classnameExt, json()]
      }))
    }

    if (errorData.length !== 0) {
 //     setWindowView(true);
      //setValidationState(false);
      displayErrorMessages(errorData);
      //setGlobalUserInputJson(userInputJson);
      //setGlobalErrorLines(errorLines);
      setState((prevState)=>({
        ...prevState,
        globalUserInputJson: userInputJson,
        globalErrorLines: errorLines,
        windowView: true,
        validationState: false
      }))


    }



  }


 //===============================================================
  const DisplaySuccessAlert = () => {
    const [open, setOpen] = React.useState(true);
    return (
      <Collapse in={open} collapsedSize={0}>
      <Alert
        severity="success"
        sx={{ 
          background: "#D6FFD6",
        }}
        action={
          <Button color="inherit"
            size="small"
            onClick={() => {
              open ? setOpen(false) : setOpen(true);
            }}
      >
            <b>Close</b>
          </Button>
        }
        >
        <AlertTitle>Success</AlertTitle>
          Validation Successful!
      </Alert>
      </Collapse>
    )
  }

  interface DisplayAlertProps{
    message: string;
  }

  const DisplayErrorAlert= ({ message }:DisplayAlertProps): ReactNode => {
    const [open, setOpen] = React.useState(false);

    const match = message.match(/Line (\d+)/);   //Gets the line number from the error message
    const errorLineNumber = match ? match[1] : null;

    const jumpToError= () => {
      if(state.globalUserInputJson && errorLineNumber){
      scrollToErrorLine(state.globalUserInputJson, parseInt(errorLineNumber));
      
      errorLines = state.globalErrorLines;  //Initializing the  errorLines varaibale after re render

      const selectedClassnameExt = classname({
        add: (lineNumber) => {
            if (parseInt(errorLineNumber) === lineNumber) {
              return "selectedError";
            }         
        },
      });
     //  setExtensions([classnameExt, json(), selectedClassnameExt]);
       setState((prevState)=>({
        ...prevState,
        extensions: [classnameExt, json(), selectedClassnameExt]
        }))
      
      }
    }
    return  (
      <Collapse in={open} collapsedSize={75}>
        <Alert
          severity="error"
          sx={{
            width: "95%",
            margin: "10px",
            background: "#FFD6D6",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          }}
          onClick={jumpToError}
          action={
            <Button color="inherit"
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                open ? setOpen(false) : setOpen(true);
              }}
            >
              Expand
            </Button>
          }
        >
        <AlertTitle>Error</AlertTitle>
         {message}
      </Alert>
    </Collapse>
    )
  }

  const changeView = () => {
    return(
        <Box
              sx={{
                pl: 1,
                pb: 1,
                mt: 5,
                width: "50%",
                overflow: "auto",
                height:"calc(100vh - 197px)"
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
                 {state.globalErrorData && state.globalErrorData.map((item, index) => (
                    <DisplayErrorAlert message={item} key={index}/>
                 ))}


              </>
            </Box> 
    )
  };

 

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
      executeButtonToolTipText="Validate FHIR Resource"
      acceptFileTypes=".txt"
      extensions={state.extensions}
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
          justifyContent: "center",
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
                width: state.windowView ===true ?  "50%" : "85%",
                height: "100%",
              }}
              id="box-hl7-resource-box"
              aria-label="HL7 Resource Box"
            >
             {state.validationState === true ? <DisplaySuccessAlert/> : null}
             {inputEditor}
            </Box>
            {state.windowView === true ? changeView() : null}
          </>
        )}
      </Box>
    </Container>
  );
};
