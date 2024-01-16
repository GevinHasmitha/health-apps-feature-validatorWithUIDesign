import { HttpRequestConfig, useAuthContext } from "@asgardeo/auth-react";
import { Box, Container } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { CCDA_TO_FHIR_URL } from "../../configs/Constants";
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
  statusCode: string;
}

export const CcdaToFhir = () => {
  const [state, setState] = useState<State>({
    input: "",
    output: "",
    errorMessage: "",
    isError: false,
    isLoading: false,
    statusCode: "500",
  });

  const { input, output, errorMessage, isError, isLoading, statusCode } = state;
  const { darkMode } = useContext(DarkModeContext);

  const [screenWidth, setScreenWidth] = React.useState<number>(
    window.innerWidth
  );
  const handleResize = (): void => setScreenWidth(window.innerWidth);
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { state: authState } = useAuthContext();
  const { isAuthenticated = false } = authState;
  const { httpRequest } = useAuthContext();

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

    // If input is empty, do not call the backend
    if (state.input === "") {
      return;
    }

    const Config = window.Config;
    const requestConfig: HttpRequestConfig = {
      url: Config.BFF_BASE_URL + CCDA_TO_FHIR_URL,
      method: "POST",
      headers: {
        Accept: "*application/json",
        "Content-Type": "application/xml",
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
          errorMessage: error.response.data.message,
          output: JSON.stringify(error.response.data.message, null, 2),
          isError: true,
          isLoading: false,
        }));
      });
  };

  const inputEditor = (
    <CodeEditor
      title="C-CDA Message"
      value={input}
      readOnly={!isAuthenticated}
      onChange={handleInputChange}
      darkMode={darkMode}
      onClear={handleInputClear}
      onExecute={callBackend}
      placeholder="Paste or edit a C-CDA message here..."
      fileType="xml"
      uploadEnabled
      readFile={readFile}
      clearEnabled
      width="100%"
      height="calc(100vh - 197px)"
      id="comp-ccda-to-fhir-input-editor"
      aria-label="C-CDA Resource Editor"
      isDisabled={!isAuthenticated}
      executeButtonToolTipText="Perform transformation"
      acceptFileTypes=".xml"
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
      fileType="json"
      downloadEnabled
      downloadName="c-cda-to-fhir-output"
      clearEnabled
      width="100%"
      height="calc(100vh - 197px)"
      id="fhir-resource-editor"
      aria-label="FHIR Resource Editor"
      isDisabled={!isAuthenticated}
      isLoading={isLoading}
    />
  );

  return (
    <Container
      id="ccda-to-fhir-container"
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column", height: 1 }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          mt: 5,
        }}
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
              id="ccda-resource-box"
              aria-label="C-CDA Resource Box"
            >
              {inputEditor}
            </Box>
            <Box
              sx={{
                pl: 1,
                pb: 1,
                width: "50%",
              }}
              id="fhir-resource-box"
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
