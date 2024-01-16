import ErrorIcon from "@mui/icons-material/Error";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";

interface Props {
  statusCode?: string;
  message?: string;
  width?: string;
}

export default function ErrorDisplay({
  statusCode = "500",
  message = "Something went wrong! Please contact the administartion.",
  width = "48.5%",
}: Props) {
  const [visible, setVisible] = React.useState<boolean>(true);
  return (
    <Box
      sx={{
        position: "absolute",
        bgcolor: "rgba(0, 0, 0, 0.40)",
        height: "calc(100vh - 197px)",
        width: { xs: "80%", sm: "88%", md: "46.8%", lg: "47.5%", xl: "48.3%" },
        zIndex: 1,
        display: visible ? "block" : "none",
        marginTop: { xs: 4.8, sm: 5, md: 5.06 },
      }}
      alignItems="center"
      justifyContent="center"
      onClick={() => {
        setVisible(false);
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        height="calc(100vh - 197px)"
      >
        <Box
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          display="flex"
          bgcolor="#e6e6e6"
          width="98%"
          paddingBottom={5}
          borderRadius={1}
        >
          <Box
            padding={1}
            sx={{ justifyContent: "flex-end", alignItems: "flex-start" }}
            display="flex"
            width="100%"
          >
            <IconButton
              onClick={() => {
                setVisible(false);
              }}
            >
              <HighlightOffIcon sx={{ color: "success.main", fontSize: 30 }} />
            </IconButton>
          </Box>
          <Box
            padding={1}
            justifyContent="center"
            alignItems="center"
            width="80%"
          >
            <Grid item container alignContent="center" justifyContent="center">
              <ErrorIcon sx={{ color: "red", fontSize: { xs: 30, sm: 50 } }} />
            </Grid>
            <Grid item container alignContent="center" justifyContent="center">
              <Typography
                variant="h5"
                textAlign="center"
                padding={{ xs: 1, sm: 2 }}
              >
                {statusCode == "400" && "Invalid Input Detected"}
                {statusCode == "429" && "Message throttled out!"}
                {statusCode == "500" && "Oops! Something went wrong."}
              </Typography>
            </Grid>
            <Grid item container alignContent="center" justifyContent="center">
              <Typography
                variant="body1"
                textAlign="center"
                padding={{ xs: 1, sm: 2 }}
              >
                {message}
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
