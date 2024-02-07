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
  openAlertKey: number | null;
}

export const FhirValidation = () => {

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
    validationState: false,
    openAlertKey: null
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
    //console.log(JSON.stringify(userInputJson));
    return userInputJson;
  }

  const validateInvalidValues=(errorData:string[], userInputJson:JSON)=>{
    for (let data of errorData){
      let pattern = /Invalid value of field '([^']*)'/;
      const patternMatch = data.match(pattern);
      if (patternMatch && patternMatch.length === 2){
      //  console.log(patternMatch[1]);
      userInputJson = updateNestedKey(userInputJson, patternMatch[1]);
      }
     }
     return userInputJson;
  }

  const validateDateTime=(errorData:string[],userInputJson:JSON):JSON => {
    for (let data of errorData){
      //If the error is nested, it will contain path
      let pattern = /Invalid pattern \(constraint\) for field '([^']*)'/;
      const patternMatch = data.match(pattern);
      if (patternMatch && patternMatch.length === 2){
        console.log(patternMatch[1]);
        console.log("After modifying invalid value")
        userInputJson = updateNestedKey(userInputJson, patternMatch[1]);
      }
    }
     return userInputJson;
    }


    const updateNestedKey = (obj: any, path: string) => {
      const keys:any = path.split(/\.|\[(\d+)\]/).filter(Boolean);
      let current = obj;
      let parent = null;
      let oldKey = null;
    
      for (let key of keys) {
          if (current && (key in current || (Array.isArray(current) && !isNaN(key)))) {
              parent = current;
              oldKey = key;
              current = current[key];
          } else {
              // Key not found, handle accordingly (return undefined or throw an error, for example)
              return undefined;
          }
      }
    
      if (parent && oldKey !== null) {
          // Create a new object
          const newObj:any = Array.isArray(parent) ? [] : {};
          for (let key in parent) {
            if (key === oldKey) {
              newObj["$$" + key] = parent[key]; // Add $$ to the matching key
             } else {
              newObj[key] = parent[key];
             }
          }  
  
         if (keys.length === 1) {      //If the error is in the first level of the json
            return newObj;
         }else{                        //If the error is nested
          // Find the parent of the parent
            let grandParent = obj;
            let parentKey = keys[keys.length - 2];
            for (let key of keys.slice(0, -2)) {
                grandParent = grandParent[key];
            }
            // Replace the parent with the new object in the grandparent
            grandParent[parentKey] = newObj;
         }
      }
      return obj;
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
    let jsonString = JSON.stringify(userInputJson, null, 2); // 2 is the number of spaces for indentation

    //Finds error locations by getting the line numbers where $$ is present
    if (jsonString) {
      let linesArr = jsonString.split("\n");

      for (let i = 0; i < linesArr.length; i++) {
        if (linesArr[i].includes("$$")) {
          linesArr[i] = linesArr[i].replace("$$", "");
          errorLines.push(i);
      //    setErrorLines((prevState) => [...prevState, i]);
        }
      }
      let modifiedJsonString = linesArr.join("\n");
      setState((prevState) =>({
        ...prevState,
        input: modifiedJsonString
      }))
    }
  }

  const displayErrorMessages = (errorData : string[]) => {
    let j=0;

    //======================================================Grouping missing fields===============================
    let missingRootData: string[] = [];
    let missingNestedData: { [key: string]: string[] } = {};
    for(let i=0; i< errorData.length; i++){   

      if (errorData[i].includes("Missing required field")){     
          let match = errorData[i].match(/'([^']+)'/);
          let fieldName:string ="";
          if (match) {
            fieldName=match[1];
          }else{
            console.log("Cannot extract missing field name form error message");
            continue;
          }

          //Checks whether error is root level
          if(fieldName.split('.').length === 1){
            missingRootData.push(fieldName);

          //If error not root level, creates a map of the missing fields for each level
          }else{
            let firstWord = fieldName.split('.')[0];
            // If the first word is not already a key in missingData, add it with an empty array
            if (!missingNestedData[firstWord]) {
              missingNestedData[firstWord] = [];
            }
            // Add the field name to the array for this first word
            missingNestedData[firstWord].push(fieldName);
        }
      }
    }

     //If missing field is at root level 
     if(missingRootData.length !== 0){
      let rootMessage="Missing required field(s); \n";
      for (let value of missingRootData){
        rootMessage = rootMessage +  value+"\n" ;
      }
      console.log(rootMessage);
      setState((prevState)=>({
        ...prevState,
        globalErrorData: prevState.globalErrorData ? [...prevState.globalErrorData, rootMessage] : [rootMessage]
      }))
     }
     
     //If missing field is at a seperate level 
     if (Object.keys(missingNestedData).length !== 0){ 
        for (let key in missingNestedData){     
          let nestedMessage="";
          nestedMessage = "Missing required field(s) in field '" +  key+"' ;\n" ;
          for (let value of missingNestedData[key]){
            nestedMessage = nestedMessage + value + "\n";
          }
        
          setState((prevState)=>({
            ...prevState,
            globalErrorData: prevState.globalErrorData ? [...prevState.globalErrorData, nestedMessage] : [nestedMessage]
          }))
      }
    }


//====================================================================================================================

    
    for(let i=0; i< errorData.length; i++){  
      if(!errorData[i].includes("Missing required field")){
        if (
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
          const errorMessage = `Line ${errorLines[j] + 1}) ${errorData[i]}`;
        //  setGlobalErrorData((prevState) =>[...prevState,errorMessage]);
          setState((prevState) => ({
            ...prevState,
            globalErrorData: prevState.globalErrorData ? [...prevState.globalErrorData, errorMessage] : [errorMessage]
          }));
          j++;
        }
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

    setState((prevState)=>({  
      ...prevState,
      globalErrorData: [],   //Clears the error messages from the previous validation
      openAlertKey: null     //So that the alert is collapsed when the input is changed
    }))

    let userInputJson:JSON;
    try {
      userInputJson = JSON.parse(input);
    } catch (error:any) {
      console.log(`Invalid JSON format: ${error.message}`)
      setState((prevState)=>({
        ...prevState,
        globalErrorData: [`Invalid JSON format: ${error.message}`],
        windowView: true
      }))
      return;
    }

    let errorData: string[] = await callBackend();
    if(errorData.length == 0){
      console.log("Validation Successful");
      setState((prevState)=>({
        ...prevState,
        extensions: [json()],     
        windowView: false,        //So that the alert boxes are not displayed
        validationState: true     //So that the the success alert is displayed
      }));
      return;
    }
    console.log(errorData);

    const missingFields = checkForMissingFields(errorData);

    userInputJson = validateInvalidFields(errorData, userInputJson);

    userInputJson = validateInvalidValues(errorData, userInputJson);

    userInputJson = validateDateTime(errorData, userInputJson);

    findErrorLines(userInputJson, errorLines);

    //Highlighting the lines with errors
    if (!errorData && missingFields === false) {
      setState((prevState)=>({
        ...prevState,
        extensions: [json()]   //Hides the line highlights when succesful
      }));   
    } else {
      setState((prevState)=>({
        ...prevState,
        extensions: [classnameExt, json()]  //Highlights the lines when having errors
      }));
    }

    if (errorData.length !== 0) {
      displayErrorMessages(errorData);
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
const getAlertTitle = (alertMessage: string): string => {
  if(alertMessage.includes("Resource type is invalid")){
    return "Unknown Resource Type";
  }else if(alertMessage.includes("Missing required Element")){
    return "Missing Required Field";
  }else if(alertMessage.includes("Missing required field")){
    return "Missing Required Field";
  }else if(alertMessage.includes("Invalid field")){
    return "Unexpected Field";
  }else if(alertMessage.includes("Invalid value of field")){
    return "Invalid Value";
  }else if(alertMessage.includes("Invalid pattern (constraint)")){
    return "Pattern Mismatch";
  }else if(alertMessage.includes("may be missing or invalid or it's value invalid")){
    return "Multitype Error";
  }
  return "Error";
}

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
          Validation Successful!
      </Alert>
      </Collapse>
    )
  }

  interface DisplayAlertProps{
    message: string;
    alertKey: number;
  }

  const DisplayErrorAlert= ({ message, alertKey }:DisplayAlertProps): ReactNode => {
    const [open, setOpen] = React.useState(state.openAlertKey === alertKey ? true : false);

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
       setState((prevState)=>({
        ...prevState,
        extensions: [classnameExt, json(), selectedClassnameExt]
        }))
      
      }
    }
    return  (
      <Collapse in={open} collapsedSize={65} style={{marginBottom: '12px' }}>
        <Alert
          severity="error"
          sx={{
            width: "95%",
            background: "#FFD6D6",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            borderRadius: "0px",
          }}
          onClick={(event) => {
            jumpToError();
            // When jumpToError is called, it will re render the component, so the open state will be initialized
            // to false so that the alert is collapsed. So, i set the key to the alertKey so that the open state 
            // is initialized to true when the state key and the alertKey are the same so that only the required
            // alert is expanded on alert click.
            setState((prevState)=>({
              ...prevState,
              openAlertKey: alertKey  
              }))
          }}
          
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

        <AlertTitle>{getAlertTitle(message)}</AlertTitle>
         {/* So that the new line characters are displayed */}
         <div style={{whiteSpace: 'pre-line'}}>  
         {message}
         </div>
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
                width: screenWidth >= 900 ? "50%" : "100%",
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
                    <DisplayErrorAlert message={item} alertKey={index}/>
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
      basicSetupOptions={{
        highlightActiveLine:false,
        highlightActiveLineGutter:false
      }}
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
              outputEditor={state.validationState === true ? <DisplaySuccessAlert/> : changeView()}
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
