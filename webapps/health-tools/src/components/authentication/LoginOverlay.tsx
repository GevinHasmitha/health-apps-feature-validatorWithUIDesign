import { useAuthContext } from "@asgardeo/auth-react";
import { Box, Grid, Typography } from "@mui/material";
import {
  AUTHORIZATION_LOADER_TEXT,
  UNAUTHORIZED_LOGIN_LABEL,
} from "../../configs/TextConstants";
import { PreLoader } from "../common/PreLoader";
import GithubSignInButton from "./GithubSignInButton";
import GmailSignInButton from "./GmailSignInButton";
import MicrosoftSignInButton from "./MicrosoftSignInButton";
import PoweredByAsgardeo from "./PoweredByAsgardeo";

export default function LoginOverlay() {
  const { signOut, signIn, state } = useAuthContext();
  const { isAuthenticated, isLoading } = state;

  const handleLogin = (fidp: string) => {
    if (isAuthenticated) {
      signOut();
    } else {
      signIn({
        fidp: fidp,
      });
    }
  };
  return (
    <Box
      id="box-login-overlay"
      sx={{
        position: "absolute",
        bgcolor: "rgba(0, 0, 0, 0.50)",
        height: "calc(100vh - 195px)",
        width: "calc(100% - 48px)",
        zIndex: 1,
      }}
      marginTop={{ md: 4.9 }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        id="grid-login-overlay"
        container
        alignItems="center"
        justifyContent="center"
        height="calc(100vh - 197px)"
      >
        <Box
          id="box-login-overlay-inner"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          display="flex"
          bgcolor="background.paper"
          width="100%"
          padding={3}
          borderRadius={1}
          margin={5}
        >
          {isLoading && (
            <>
              <PreLoader setActive={true} size={70} />
              <Typography id="txt-login-loader" variant="h5" sx={{ mt: 2 }}>
                {AUTHORIZATION_LOADER_TEXT}
              </Typography>
            </>
          )}
          {!isLoading && !isAuthenticated && (
            <>
              <Typography
                id="txt-social-login-display"
                variant="h4"
                marginBottom={2}
                color="common.black"
                textAlign="center"
              >
                {UNAUTHORIZED_LOGIN_LABEL}
              </Typography>
              <Box
                id="box-social-login-display"
                alignItems="center"
                flexDirection="column"
                display="flex"
                sx={{ justifyContent: "space-between" }}
              >
                <GmailSignInButton handleLogin={handleLogin} />
                <MicrosoftSignInButton handleLogin={handleLogin} />
                <GithubSignInButton handleLogin={handleLogin} />
              </Box>
              <PoweredByAsgardeo />
            </>
          )}
        </Box>
      </Grid>
    </Box>
  );
}
