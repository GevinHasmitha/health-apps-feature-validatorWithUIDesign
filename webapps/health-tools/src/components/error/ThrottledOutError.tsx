import ErrorIcon from "@mui/icons-material/Error";
import { Box, Grid, Typography } from "@mui/material";
import { THROTTLED_OUT_PAGE_TITLE } from "../../configs/TextConstants";

function ThrottledOutError() {
  return (
    <Box
      bgcolor="background.paper"
      height="95%"
      alignContent="center"
      justifyContent="center"
      marginTop={11}
    >
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        spacing={5}
        minHeight="100%"
        padding={{ xs: 2, md: 4 }}
        minWidth="100%"
      >
        <Box border={1} padding={1} justifyContent="center" alignItems="center">
          <Grid item container alignContent="center" justifyContent="center">
            <ErrorIcon sx={{ color: "red", fontSize: 80 }} />
          </Grid>
          <Grid item container alignContent="center" justifyContent="center">
            <Typography variant="h4" textAlign="center" padding={2}>
              {THROTTLED_OUT_PAGE_TITLE}
            </Typography>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

export default ThrottledOutError;
