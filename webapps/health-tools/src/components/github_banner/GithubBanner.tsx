import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { ReactElement } from "react";
import {
  GITHUB_TITLE,
  LANDING_PAGE_BUTTON_LABEL,
} from "../../configs/TextConstants";

interface Props {
  content: ReactElement;
  marginTop?: number;
  marginBottom?: number;
}

function GithubBanner({ content, marginTop = 3, marginBottom = 2 }: Props) {
  return (
    <Box
      bgcolor="background.paper"
      alignItems="center"
      justifyContent="center"
      padding={7}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      <Grid container alignItems="center" justifyContent="center" padding={1}>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          maxWidth="xl"
        >
          <Grid item container alignItems="center" justifyContent="center">
            <Stack spacing={5} paddingBottom={2}>
              <Typography
                variant="h2"
                align="center"
                color="text.primary"
                maxWidth="lg"
              >
                {GITHUB_TITLE}
              </Typography>
              {content}
            </Stack>
          </Grid>
          <Grid item container alignItems="center" justifyContent="center">
            <Button
              variant="contained"
              color="info"
              href="https://wso2.com/contact/?ref=Healthcare"
              target="_blank"
              size="large"
              sx={{
                padding: { xs: "5px 28px", sm: "6px, 32px", md: "8px 36px" },
                color: "#fff",
                fontWeight: { xs: 550, sm: 600 },
                fontSize: { xs: "1rem", small: "1.1rem", md: "1.2rem" },
                alignSelf: "center",
              }}
            >
              {LANDING_PAGE_BUTTON_LABEL}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GithubBanner;
