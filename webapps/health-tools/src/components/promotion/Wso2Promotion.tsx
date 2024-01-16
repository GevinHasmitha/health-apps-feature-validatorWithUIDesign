import { Divider, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  BALLERINA_BLADE_DESCRIPTION,
  BALLERINA_BLADE_TITLE,
  WSO2_BLADE_DESCRIPTION,
  WSO2_BLADE_TITLE,
} from "../../configs/TextConstants";

export const Wso2Promotion = () => {
  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        backgroundColor: "grey.300",
        backdropFilter: "blur(5px)",
      }}
      padding={5}
    >
      <Grid
        container
        item
        justifyContent="center"
        maxWidth="xl"
        spacing={10}
        paddingTop={4}
      >
        <Grid item container xs={12} md={6} justifyContent="center" spacing={5}>
          <Grid item container alignItems="flex-start" justifyContent="center">
            <Typography variant="h2" align="center">
              {WSO2_BLADE_TITLE}
            </Typography>
          </Grid>
          <Grid item container alignItems="center" justifyContent="center">
            <Typography
              variant="body1"
              align="justify"
              color="text.secondary"
              maxWidth="lg"
              lineHeight={1.7}
            >
              {WSO2_BLADE_DESCRIPTION}
            </Typography>
          </Grid>
          <Grid item container alignItems="flex-end" justifyContent="center">
            <Link href="https://wso2.com/solutions/healthcare/" target="_blank">
              <Box
                component={"img"}
                src="wso2-related-logo/wso2.svg"
                alt="WSO2 Logo"
                sx={{
                  width: { xs: 191, sm: 240, md: 220, lg: 220 },
                  height: { xs: 75, sm: 94, md: 86, lg: 86 },
                }}
              ></Box>
            </Link>
          </Grid>
        </Grid>
        <Grid item container xs={12} md={6} justifyContent="center" spacing={5}>
          <Grid
            item
            container
            alignItems="flex-start"
            justifyContent="center"
            borderLeft={{ xs: 0, md: 1 }}
          >
            <Divider
              sx={{
                border: { sx: 1, md: 0 },
                width: "100%",
                marginBottom: { xs: 5, md: 0 },
              }}
            />
            <Typography variant="h2" align="center">
              {BALLERINA_BLADE_TITLE}
            </Typography>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            borderLeft={{ xs: 0, md: 1 }}
          >
            <Typography
              variant="body1"
              align="justify"
              color="text.secondary"
              maxWidth="lg"
              lineHeight={1.7}
              paddingTop={3.5}
            >
              {BALLERINA_BLADE_DESCRIPTION}
            </Typography>
          </Grid>

          <Grid
            item
            container
            alignItems="flex-end"
            justifyContent="center"
            borderLeft={{ xs: 0, md: 1 }}
          >
            <Link
              href="https://ballerina.io/usecases/healthcare/"
              target="_blank"
            >
              <Box
                component={"img"}
                src="wso2-related-logo/ballerina.svg"
                alt="Ballerina Logo"
                sx={{
                  height: { xs: 60, sm: 90, md: 76, lg: 97 },
                  width: { xs: 198, sm: 297, md: 250, lg: 320 },
                }}
              ></Box>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Wso2Promotion;
