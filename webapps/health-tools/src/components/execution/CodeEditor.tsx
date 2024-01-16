import { Box, CircularProgress, Typography } from "@mui/material";
import { langs } from "@uiw/codemirror-extensions-langs";
import { aura, xcodeLight } from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";
import FileSaver from "file-saver";
import { ClearIcon } from "./ClearIcon";
import { CopyContent } from "./CopyContent";
import { DownloadIcon } from "./DownloadIcon";
import { ExecuteButton } from "./ExecuteButton";
import { UploadIcon } from "./UploadIcon";

// import { Extension } from '@codemirror/state';

interface CodeEditorProps {
  id?: string;
  title: string;
  value: string;
  onChange?: (value: string) => void;
  onClick?: () => void;
  onExecute?: () => void;
  darkMode?: boolean;
  onClear?: () => void;
  placeholder?: string;
  fileType?: string;
  downloadEnabled?: boolean;
  downloadName?: string;
  uploadEnabled?: boolean;
  clearEnabled?: boolean;
  readFile?(fileInput?: string | ArrayBuffer | null): any;
  readOnly?: boolean;
  width?: string;
  height?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  executeButtonToolTipText?: string;
  acceptFileTypes?: string;
  extensions?: any;
}

export const CodeEditor = ({
  id,
  title,
  value,
  onChange,
  onClick,
  onExecute,
  darkMode,
  onClear,
  placeholder,
  fileType = "jsx",
  downloadEnabled,
  downloadName,
  uploadEnabled,
  clearEnabled,
  readFile,
  readOnly,
  width,
  height,
  isDisabled = false,
  isLoading = false,
  executeButtonToolTipText = "Execute",
  acceptFileTypes = ".txt",
  extensions=[]

}: CodeEditorProps) => {
  const handleDownload = (content: string, filename: string) => {
    if (content != null) {
      const file = new File([content], filename, {
        type: "application/json;charset=utf-8",
      });
      FileSaver.saveAs(file);
    }
  };

  const handleDownloadClick = () => {
    const content = JSON.stringify(value, null, 2);
    handleDownload(JSON.parse(content), `${downloadName}.json`);
  };

  const langExtensions: Record<string, () => any> = langs;

  return (
    <Box
      id={id}
      sx={{
        width,
        display: "flex",
        flexDirection: "column",
        height: 1,
      }}
      aria-label={title}
      color="text.primary"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 1,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography id="txt-code-editor-title" variant="h6">
            {title}
          </Typography>
          {downloadEnabled && isLoading && (
            <CircularProgress
              id="comp-code-editor-circle-progress"
              size={16}
              sx={{ color: "black", ml: 4 }}
            />
          )}
        </Box>
        <Box sx={{ display: "flex" }}>
          {uploadEnabled && (
            <ExecuteButton
              size={23.5}
              toolTipText={executeButtonToolTipText}
              handleExecute={onExecute}
              isDisabled={isDisabled || value.trim() === ""}
            />
          )}
          <CopyContent
            id={uploadEnabled ? "input-editor" : "output-editor"}
            data={JSON.parse(JSON.stringify(value!))}
            size={20}
            isDisabled={isDisabled || value.trim() === ""}
          />
          {downloadEnabled && (
            <DownloadIcon
              handleDownload={handleDownloadClick}
              size={22}
              isDisabled={isDisabled || value.trim() === ""}
            />
          )}
          {uploadEnabled && (
            <UploadIcon
              acceptFileTypes={acceptFileTypes}
              readFile={readFile!}
              size={24}
              isDisabled={isDisabled}
            />
          )}
          {clearEnabled && (
            <ClearIcon
              id={uploadEnabled ? "input-editor" : "output-editor"}
              onClear={onClear!}
              size={22}
              isDisabled={isDisabled || value.trim() === ""}
            />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          border: 1,
          borderColor: "grey.500",
        }}
        onClick={onClick}
      >
        <CodeMirror
          id="comp-code-mirror"
          placeholder={placeholder}
          value={value}
          height={height}
          theme={darkMode ? aura : xcodeLight}
          // extensions={[extensions,langExtensions[fileType]()]}
          extensions={extensions}

          onChange={onChange}
          readOnly={readOnly}
          color="text.primary"
        />
      </Box>
    </Box>
  );
};
