import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  LANDING_PAGE_BUTTON_LABEL,
  LANDING_PAGE_DESCRIPTION,
  LANDING_PAGE_SUB_TITLE,
  LANDING_PAGE_TITLE,
} from "../../configs/TextConstants";

function Banner() {
  return (
    <Box
      bgcolor="background.paper"
      minHeight={200}
      alignItems="center"
      justifyContent="center"
      paddingTop={15}
      paddingBottom={3}
      marginTop={2}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Grid
          container
          item
          maxWidth={{ xs: "xs", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
          alignItems="center"
          justifyContent="center"
          rowSpacing={5}
          columnSpacing={5}
        >
          <Grid
            container
            item
            alignItems="center"
            justifyContent="center"
            rowSpacing={5}
            xs={12}
            md={6}
            xl={7}
          >
            <Grid container alignItems="center" padding={3}>
              <Typography variant="h1" align="left" sx={{ textAlign: "left" }}>
                {LANDING_PAGE_TITLE}
              </Typography>
            </Grid>
            <Grid
              container
              alignItems="center"
              paddingLeft={3}
              paddingRight={3}
            >
              <Typography
                variant="body1"
                align="justify"
                color="text.secondary"
                lineHeight={{ xs: 1.4, sm: 1.8 }}
              >
                {LANDING_PAGE_DESCRIPTION}
              </Typography>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              paddingLeft={3}
              paddingBottom={3}
              paddingRight={3}
            >
              <Box>
                <Typography
                  variant="body1"
                  align="left"
                  color="text.secondary"
                  sx={{ textAlign: "left" }}
                  marginBottom={2}
                >
                  {LANDING_PAGE_SUB_TITLE}
                </Typography>
                <Button
                  variant="contained"
                  color="info"
                  href="https://wso2.com/contact/?ref=Healthcare"
                  target="_blank"
                  size="large"
                  sx={{
                    padding: "8px 36px",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "1.2rem",
                    alignSelf: "center",
                  }}
                >
                  {LANDING_PAGE_BUTTON_LABEL}
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            md={6}
            xl={5}
            alignItems="center"
            justifyContent="center"
            sx={{ display: { xs: "none", sm: "inline" } }}
          >
            <Box
              component="img"
              sx={{
                width: { sm: 500, md: 500, lg: 600, xl: 700 },
                height: { sm: 250, md: 250, lg: 300, xl: 350 },
                backgroundBlendMode: "lighten",
              }}
              src="banner-img.png"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Banner;
