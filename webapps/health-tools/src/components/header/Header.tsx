import { useAuthContext } from "@asgardeo/auth-react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { BALLERINA_DISCORD_LINK } from "../../configs/Constants";
import {
  DISCORD_HELP_LABEL,
  POWERED_BY_LABEL,
  SIGN_OUT_BUTTON_LABEL,
} from "../../configs/TextConstants";
import { ComponentTitle } from "./ComponentTitle";

interface Props {
  title: string;
  shortDescription: string;
  url: string;
}

export const Header = ({ title, shortDescription }: Props) => {
  const Config = window.Config;
  const redirectBaseUrl = Config.APP_AUTH_REDIRECT_BASE_URL;

  const { signOut, signIn, state } = useAuthContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { isAuthenticated } = state;

  const handleLogout = () => {
    if (isAuthenticated) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          boxShadow: 3,
          mb: 0.2,
          backgroundColor: "background.paper",
          position: "fixed",
          zIndex: 5,
          width: "100%",
          flexDirection: { xs: "column", sm: "row" },
          paddingTop: { xs: 0, sm: 1.5 },
        }}
        id="header-container"
      >
        <Grid container paddingBottom={{ xs: 1, md: 0 }} paddingLeft={2}>
          <Grid item container sm={7}>
            <Grid item container md={4} lg={3} xl={2.5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  marginLeft: 1,
                  marginBottom: 1,
                }}
              >
                <Box
                  component="img"
                  src="fhir-tools.svg"
                  width={{ xs: 89, md: 89 }}
                  height={{ xs: 29, md: 29 }}
                  marginLeft={{ xs: 1.8, md: 2 }}
                  marginRight={3}
                  marginTop={{ xs: 3, md: 1 }}
                  onClick={() => {
                    window.open(redirectBaseUrl);
                  }}
                  sx={{ cursor: "pointer" }}
                />

                <Box
                  sx={{
                    display: "flex",
                    gap: 0.8,
                    ml: { xs: 2.5, md: 2 },
                    mt: { xs: 0, md: 0.8 },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      alignItems: "flex-end",
                      display: "flex",
                    }}
                    id="footer-text"
                  >
                    {POWERED_BY_LABEL}
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column-reverse" }}
                  >
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
            <Grid item container md={8} lg={6} xl={6}>
              <ComponentTitle
                heading={title}
                description={shortDescription}
              ></ComponentTitle>
            </Grid>
          </Grid>
          <Grid
            item
            container
            sm={5}
            justifyContent={{ xs: "flex-start", sm: "flex-end" }}
            marginLeft={{ xs: 1, sm: 0 }}
            alignItems="center"
          >
            <Box
              sx={{
                display: "flex",
                pr: 2,
                ml: { xs: 2, md: 0 },
                mt: { xs: 1.5, md: 0 },
              }}
            >
              <Box sx={{ display: "flex", pr: 2, mt: 1 }}>
                <Link href={BALLERINA_DISCORD_LINK} target="_blank">
                  {/* https://icons8.com/icons/set/discord */}
                  <Box
                    component="img"
                    src="third-party-app-logo/discord.png"
                    sx={{
                      width: { xs: "25px", sm: "30px" },
                      height: { xs: "25px", sm: "30px" },
                    }}
                  />
                </Link>
                <Link
                  href={BALLERINA_DISCORD_LINK}
                  target="_blank"
                  underline="none"
                  sx={{ paddingLeft: 1, paddingTop: 0.5 }}
                >
                  <Typography
                    variant="body2"
                    color="common.black"
                    display={{ xs: "none", sm: "block" }}
                    fontSize="1.0rem"
                  >
                    {DISCORD_HELP_LABEL}
                  </Typography>
                </Link>
              </Box>

              {isAuthenticated && (
                <Button
                  href=""
                  target="_blank"
                  variant="contained"
                  size="medium"
                  color="info"
                  sx={{
                    padding: { xs: "5px", sm: "8px", md: "5px", lg: "8px" },
                    width: { xs: 110, sm: 120, md: 110, lg: 110, xl: 120 },
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "1.0rem",
                    textTransform: "none",
                    alignSelf: "center",
                    "&:hover": {
                      backgroundColor: "secondary.main",
                    },
                  }}
                  onClick={() => {
                    setIsLoading(true);
                    handleLogout();
                  }}
                  endIcon={
                    isLoading && (
                      <CircularProgress
                        size={16}
                        sx={{ color: "white", ml: 0.1 }}
                      />
                    )
                  }
                >
                  {SIGN_OUT_BUTTON_LABEL}
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
