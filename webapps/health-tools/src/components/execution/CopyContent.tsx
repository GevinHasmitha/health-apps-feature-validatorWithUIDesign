import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Alert, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { COPIED_INFO_MESSAGE } from "../../configs/TextConstants";

interface Props {
  data: string;
  size?: number;
  isDisabled?: boolean;
  id: string;
}

export const CopyContent = ({
  data,
  size = 30,
  isDisabled = false,
  id,
}: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }, [isCopied]);

  return (
    <Tooltip
      key="copy-icon"
      title="Copy Content"
      placement="bottom"
      id={`comp-copy-content-tooltip-${id}`}
    >
      <Box
        id={`box-copy-content-alert-${id}`}
        style={{ display: "flex" }}
        color="text.primary"
      >
        <Typography id={`txt-copy-content-alert-${id}`} component="span">
          {isCopied && (
            <Alert
              severity="success"
              icon={<TaskAltIcon sx={{ fontSize: 15 }} />}
              sx={{ fontSize: 10, py: 0.3 }}
              id={`comp-copy-content-alert-${id}`}
            >
              {COPIED_INFO_MESSAGE}
            </Alert>
          )}
        </Typography>
        <IconButton
          id={`btn-copy-content-${id}`}
          aria-label="Copy Content"
          aria-labelledby="copy-button"
          sx={{
            color: "text.primary",
          }}
          onClick={() => {
            navigator.clipboard.writeText(data!);
            setIsCopied(true);
          }}
          disabled={isDisabled}
        >
          <ContentCopyIcon
            id={`icon-copy-content-${id}`}
            sx={{ fontSize: size }}
            aria-hidden="true"
          />
        </IconButton>
      </Box>
    </Tooltip>
  );
};
