import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import { Box, IconButton, Tooltip } from "@mui/material";

interface Props {
  toolTipText: string;
  size?: number;
  handleExecute?: () => void;
  isDisabled?: boolean;
}

export const ExecuteButton = ({
  toolTipText,
  size = 20,
  handleExecute,
  isDisabled = false,
}: Props) => {
  return (
    <>
      <Tooltip
        key="execute-icon"
        title={toolTipText}
        placement="bottom"
        id="comp-execute-tool-tooltip"
      >
        <Box>
          <IconButton
            id="btn-execute-tool"
            aria-label="Execute Tool"
            sx={{
              color: "secondary.main",
            }}
            onClick={handleExecute}
            disabled={isDisabled}
          >
            <PlayCircleFilledOutlinedIcon
              id="icon-execute-tool"
              sx={{ fontSize: size }}
              aria-hidden="true"
            />
          </IconButton>
        </Box>
      </Tooltip>
    </>
  );
};
