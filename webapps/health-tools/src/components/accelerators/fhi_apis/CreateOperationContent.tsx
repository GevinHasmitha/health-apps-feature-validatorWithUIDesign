import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Box, Divider, Typography } from "@mui/material";
import {PreLoader, ResponseAlert} from "../../common";
import { ResourceMethodIcon } from ".";
import { DarkModeContext } from "../../context/DarkModeContext";
import { SelectedSampleContext } from "../../context/SelectedSampleContext";
import { CodeEditor } from "../../execution/CodeEditor";
import { CommonButton } from "../../execution/CommonButton";
import { HeadersTab } from "../../header/HeadersTab";

interface Props {
  backendUrl: string;
  resource: any;
}

export const CreateOperationContent = ({ backendUrl, resource }: Props) => {
  const { loadSample, setLoadSample, selectedLabel, setSelectedLabel } =
    useContext(SelectedSampleContext);
  const { darkMode } = useContext(DarkModeContext);

  const [postRequest, setPostRequest] = useState<string>("");
  const [data, setData] = useState<any>("");
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
  const [selectedAPIName] = useState(
    resource.resourcePath.slice(resource.resourcePath.indexOf("/") + 1)
  );

  const [response, setResponse] = useState<any>({
    statusCode: null,
    statusText: "",
    resUrl: "",
    contentType: "",
  });
  const [request, setRequest] = useState<any>({
    reqUrl: "",
    contentType: "",
    method: "",
  });

  useEffect(() => {
    if (selectedLabel === "FHIR APIs") {
      setPostRequest(loadSample!.data);
      setLoadSample(null);
      setSelectedLabel("");
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2000);
    }
  }, [loadSample, selectedLabel]);

  const handleOnChange = useCallback((value: string) => {
    setPostRequest(value);
  }, []);

  const handleInputClear = () => {
    setPostRequest("");
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const closeResponse = () => {
    setIsError(false);
  };

  const readFile = (fileInput?: string | ArrayBuffer | null) => {
    if (typeof fileInput === "string") {
      setPostRequest(fileInput);
    }
  };

  const handleReset = () => {
    setData("");
    setError("");
    setIsError(false);
    setPostRequest("");
    setSuccessAlert(false);
    setResponse({});
    setRequest({});
  };

  const callBackend = () => {
    setIsLoading(true);
    setData("");
    setError("");
    setSuccessAlert(false);

    axios
      .post(backendUrl, postRequest)
      .then((res) => {
        setRequest({
          reqUrl: res.config["url"],
          contentType: res.config.headers["Content-Type"],
          method: res.config["method"]?.toUpperCase(),
        });
        setResponse({
          statusCode: res.status,
          statusText: res.statusText,
          resUrl: res.request["responseURL"],
          contentType: res.headers["content-type"],
        });
        setData(res.data);
        setIsLoading(false);
        setSuccessAlert(true);
      })
      .catch((error) => {
        setRequest({
          reqUrl: error.config["url"],
          contentType: error.config.headers["Content-Type"],
          method: error.config["method"]?.toUpperCase(),
        });
        setResponse({
          statusCode: error.response.status,
          statusText: error.response.statusText,
          resUrl: error.response.request["responseURL"],
          contentType: error.response.headers["content-type"],
        });
        setError(error.message);
        setIsError(true);
        setData(error.response);
        setIsLoading(false);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
      });
  };

  return (
    <Box
      sx={{
        border: 0.5,
        borderRadius: 1,
        borderColor: "grey.400",
        p: 2,
      }}
      id="main-box"
    >
      {isError && (
        <ResponseAlert
          isOpen={isError}
          severity="error"
          message={error}
          setIsOpen={closeResponse}
          id="error-alert"
        />
      )}
      {alertOpen && (
        <ResponseAlert
          isOpen={alertOpen}
          severity="success"
          message="Sample Loaded"
          setIsOpen={closeAlert}
          id="success-alert"
        />
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          mb: 1,
        }}
        id="resource-info"
      >
        <ResourceMethodIcon resourceMethod={resource.resourceMethod} />
        <Typography
          sx={{ color: "common.dark", fontSize: 14 }}
          id="resource-path"
        >
          {resource.resourcePath}
        </Typography>
        <Typography
          sx={{
            color: "grey.500",
            fontSize: 14,
            fontWeight: 500,
            mr: "auto",
          }}
          id="resource-description"
        >
          {resource.resourceDescription}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
          id="button-group"
        >
          <CommonButton
            variant="background"
            label="Execute"
            onClick={callBackend}
            id="execute-button"
            aria-label="Execute button"
          />
          <CommonButton
            variant="border"
            label="Reset"
            onClick={handleReset}
            id="reset-button"
            aria-label="Reset button"
          />
        </Box>
      </Box>
      <Divider />
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          id="content-box"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "23%",
              flexGrow: 1,
              mt: 1,
              borderRight: 1,
              borderColor: "grey.400",
              mr: 2,
              pr: 2,
            }}
            id="samples-box"
          >
            <Box sx={{ mt: 1 }}>
              {/* <SamplesModal selectedAPI={selectedAPIName} /> */}
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontStyle: "italic",
                color: "grey.600",
                mt: 2,
              }}
              id="note"
            >
              Note: Created resources will be available for 2 hours
            </Typography>
            {successAlert && (
              <Typography
                variant="h6"
                color="secondary"
                sx={{ fontStyle: "italic", mt: "auto", mb: 2 }}
                id="success-note"
              >
                Resource created! Run the search operation to view the created
                resource
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "76%" }} id="editor-box">
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "calc(100vh - 306px)",
                }}
                id="loading-box"
              >
                <PreLoader setActive={isLoading} />
                <Typography
                  variant="h5"
                  sx={{ mt: 4, color: "primary.dark" }}
                  id="loading-text"
                >
                  Loading ...
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    my: 0.5,
                  }}
                  id="headers-tab-box"
                >
                  <HeadersTab request={request} response={response} />
                </Box>
                <Divider />
                <CodeEditor
                  title="Input"
                  value={postRequest}
                  onChange={handleOnChange}
                  darkMode={darkMode}
                  onClear={handleInputClear}
                  placeholder="Paste data here..."
                  fileType="json"
                  uploadEnabled
                  readFile={readFile}
                  clearEnabled
                  width="100%"
                  height="calc(100vh - 389px)"
                  id="fhir-apis-post-input"
                />
              </Box>
            )}
          </Box>
        </Box>
        {data && (
          <>
            <Divider sx={{ mt: 1 }} />
            <CodeEditor
              title="Output"
              value={JSON.stringify(data, null, 2)}
              readOnly
              darkMode={darkMode}
              placeholder="Output will be displayed here..."
              fileType="json"
              downloadEnabled
              downloadName={selectedAPIName.toLowerCase() + "-create-output"}
              width="100%"
              height="calc(100vh - 389px)"
              id="fhir-apis-post-output"
            />
          </>
        )}
      </>
    </Box>
  );
};
