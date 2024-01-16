import { Box, Grid, Typography } from "@mui/material";
import { POWERED_BY_LABEL } from "../../configs/TextConstants";

export const Header = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          boxShadow: 3,
          mb: 0.2,
          backgroundColor: "background.paper",
          position: "fixed",
          zIndex: 5,
          width: "100%",
          pt: 1,
          pb: 0,
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid
            container
            item
            maxWidth={{ xs: "xs", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
            alignItems="center"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { sm: "row" },
                paddingLeft: 5.3,
                paddingTop: 1.5,
                paddingBottom: 1.5,
              }}
            >
              <Box
                component="img"
                src="fhir-tools.svg"
                width={120}
                height={39}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: 0.8,
                  ml: { xs: 1, md: 2 },
                  mt: { xs: 1, sm: 0 },
                  mb: 1,
                  borderLeft: { xs: 1, md: 1 },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    alignItems: "flex-end",
                    display: "flex",
                    ml: { xs: 1, md: 1.2 },
                  }}
                  id="footer-text"
                >
                  {POWERED_BY_LABEL}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
                  <Box
                    component={"img"}
                    src="wso2-related-logo/choreo.svg"
                    alt="Choreo Logo"
                    sx={{
                      width: { xs: 64, sm: 64, md: 64, lg: 64 },
                      height: { xs: 20, sm: 20, md: 20, lg: 20 },
                      paddingBottom: 0,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      window.open("https://wso2.com/choreo/");
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
