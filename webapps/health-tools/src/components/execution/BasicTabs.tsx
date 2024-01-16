import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { THROTTLED_OUT_PAGE_TITLE } from "../../configs/TextConstants";
import ErrorDisplay from "../error/ErrorDisplay";
import LoginOverlaySmall from "../authentication/LoginOverlaySmall";

interface Props {
  inputEditor: React.ReactNode;
  outputEditor: React.ReactNode;
  isInterectable: boolean;
  statusCode: string;
  isError?: boolean;
  errorMessage?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: "100%" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  inputEditor,
  outputEditor,
  isInterectable,
  statusCode,
  isError = false,
  errorMessage = "",
}: Props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box id="box-basic-tabs" sx={{ width: "100%" }}>
      <Box
        id="box-basic-tabs-inner"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          id="comp-basic-tabs"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Input" {...a11yProps(0)} />
          <Tab label="Output" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {!isInterectable && <LoginOverlaySmall />}
        {inputEditor}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {isError && (
          <ErrorDisplay
            statusCode={statusCode == "500" ? "400" : statusCode}
            message={
              statusCode == "429" ? THROTTLED_OUT_PAGE_TITLE : errorMessage
            }
          />
        )}
        {outputEditor}
      </CustomTabPanel>
    </Box>
  );
}
