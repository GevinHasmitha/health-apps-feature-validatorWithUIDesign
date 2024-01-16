import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import {
  MAINTENANCE_PAGE_SUB_TITLE,
  MAINTENANCE_PAGE_TITLE,
} from "../../configs/TextConstants";
import { PreLoader } from "../common/PreLoader";

export const MaintenancePage = () => {
  const [active] = useState(true);
  return (
    <Box
      minHeight={300}
      padding={5}
      bgcolor="background.paper"
      borderTop={2}
      borderColor="common.white"
    >
      <Grid container alignItems="center" justifyContent="center" spacing={5}>
        <Grid item container alignItems="center" justifyContent="center">
          <Typography variant="h2" textAlign="center">
            {MAINTENANCE_PAGE_TITLE}
          </Typography>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center">
          <Typography variant="h6" textAlign="center">
            {MAINTENANCE_PAGE_SUB_TITLE}
          </Typography>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center">
          <PreLoader setActive={active} />
        </Grid>
      </Grid>
    </Box>
  );
};
