import { useState, SyntheticEvent, ChangeEvent } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { CreateOperationContent, GetResourceContent } from ".";
import { ApiConfig, OperationTypes, apiList } from "../../../configs/ApiConfig";

const tabStyles = {
  fontSize: 13,
  fontWeight: 500,
  textTransform: "none",
  transition: "0.2s",
  my: 1,
  mx: 0.5,
  borderRadius: 1,
  "&.Mui-selected": {
    backgroundColor: "primary.main",
    color: "background.default",
  },
  height: "40px",
  minHeight: "40px",
};

const tabsContainerStyles = {
  bgcolor: "common.white",
  border: 0.5,
  borderRadius: 1,
  borderColor: "grey.400",
  px: 1,
};

export const APIResourceBody = () => {
  const [selectedAPI, setSelectedAPI] = useState<number>(0);
  const [selectedResource, setSelectedResource] = useState<number>(0);
  const [key, setKey] = useState<number>(0);

  const handleChangeAPI = (_event: SyntheticEvent, newTab: number) => {
    setSelectedAPI(newTab);
    setSelectedResource(0);
    setKey((prevKey) => prevKey + 1);
  };

  const handleChangeResource = (_event: ChangeEvent<{}>, newTab: number) => {
    setSelectedResource(newTab);
  };

  const renderAPIs = () =>
    apiList.map((api: ApiConfig, index: number) => (
      <Tab
        key={index}
        label={api.name}
        id={`tab-${index}`}
        aria-controls={`tabpanel-${index}`}
        sx={tabStyles}
      />
    ));

  const renderResources = () =>
    apiList[selectedAPI].resources.map((resource, index) => (
      <Tab
        key={index}
        label={resource.resourceName}
        id={`resource-tab-${selectedAPI}-${index}`}
        aria-controls={`resource-tabpanel-${selectedAPI}-${index}`}
        sx={tabStyles}
      />
    ));

  const renderResourceContent = ({}: ApiConfig) =>
    apiList[selectedAPI].resources.map((resource, index) => (
      <Box
        key={index}
        role="tabpanel"
        hidden={selectedResource !== index}
        id={`resource-tabpanel-${selectedAPI}-${index}`}
        aria-labelledby={`resource-tab-${selectedAPI}-${index}`}
      >
        {selectedResource === index && (
          <>
            {(resource.resourceMethod === "POST" ||
              resource.resourceMethod === "PUT") && (
              <CreateOperationContent
                backendUrl={apiList[selectedAPI].apiUrl}
                resource={resource}
              />
            )}
            {resource.resourceMethod === "GET" && (
              <GetResourceContent
                resource={resource}
                isSearchOperation={
                  resource.resourceOperation === OperationTypes.SEARCH
                }
                backendUrl={apiList[selectedAPI].apiUrl}
                searchParams={apiList[selectedAPI].searchParams}
              />
            )}
          </>
        )}
      </Box>
    ));

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: 1 }}
      id="main-box"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 1,
          gap: 1,
          flexWrap: "wrap",
        }}
        id="tabs-container"
      >
        <Box sx={{ mr: 4 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, color: "primary.dark" }}
            id="select-api-heading"
          >
            Select API
          </Typography>
          <Tabs
            value={selectedAPI}
            TabIndicatorProps={{ style: { display: "none" } }}
            onChange={handleChangeAPI}
            sx={tabsContainerStyles}
            aria-label="API tabs"
            id="api-tabs"
          >
            {renderAPIs()}
          </Tabs>
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, color: "primary.dark" }}
            id="select-resource-heading"
          >
            Select Resource
          </Typography>
          <Tabs
            value={selectedResource}
            onChange={handleChangeResource}
            aria-label="Resource tabs"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={tabsContainerStyles}
            id="resource-tabs"
          >
            {renderResources()}
          </Tabs>
        </Box>
      </Box>
      <Box
        key={key}
        sx={{
          gap: 1,
          display: "flex",
          flexDirection: "column",
          my: 2,
        }}
        id="resource-content"
      >
        {renderResourceContent(apiList[selectedAPI])}
      </Box>
    </Box>
  );
};
