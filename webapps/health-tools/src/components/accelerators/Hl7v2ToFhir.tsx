import { HttpRequestConfig, useAuthContext } from "@asgardeo/auth-react";
import { Box, Container } from "@mui/material";
import DOMPurify from "dompurify";
import React, { useCallback, useContext, useState } from "react";
import { HL7V2_TO_FHIR_URL } from "../../configs/Constants";
import { THROTTLED_OUT_PAGE_TITLE } from "../../configs/TextConstants";
import LoginOverlay from "../authentication/LoginOverlay";
import { DarkModeContext } from "../context/DarkModeContext";
import ErrorDisplay from "../error/ErrorDisplay";
import BasicTabs from "../execution/BasicTabs";
import { CodeEditor } from "../execution/CodeEditor";

interface State {
  input: string;
  output: string;
  errorMessage: string;
  isError: boolean;
  isLoading: boolean;
  outputType: string;
  statusCode: string;
}

export const Hl7v2ToFhir = () => {
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

  const callBackend = () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      output: "",
      isError: false,
      errorMessage: "",
    }));

    validateInput();
    const Config = window.Config;
    const requestConfig: HttpRequestConfig = {
      url: Config.BFF_BASE_URL + HL7V2_TO_FHIR_URL,
      method: "POST",
      headers: {
        Accept: "*application/json",
        "Content-Type": "text/plain",
      },
      data: input,
    };
    httpRequest(requestConfig)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          output: JSON.stringify(res.data, null, 2),
          isLoading: false,
        }));
      })
      .catch((error) => {
        setState((prevState) => ({
          ...prevState,
          statusCode: error.response.status,
          output: JSON.stringify(error.response.data, null, 2),
          errorMessage: error.response.data,
          isError: true,
          isLoading: false,
        }));
      });
  };

  const inputEditor = (
    <CodeEditor
      title="HL7 Message"
      value={input}
      readOnly={!isAuthenticated}
      onChange={handleInputChange}
      darkMode={darkMode}
      onClear={handleInputClear}
      onExecute={callBackend}
      placeholder="Paste or edit a HL7 message here..."
      fileType="textile"
      uploadEnabled
      readFile={readFile}
      clearEnabled
      width="100%"
      height="calc(100vh - 197px)"
      id="comp-hl7-to-fhir-input-editor"
      aria-label="HL7 Resource Editor"
      isDisabled={!isAuthenticated}
      executeButtonToolTipText="Perform transformation"
      acceptFileTypes=".txt"
    />
  );

  const outputEditor = (
    <CodeEditor
      title="FHIR Resource"
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
                {outputEditor}
              </>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};
