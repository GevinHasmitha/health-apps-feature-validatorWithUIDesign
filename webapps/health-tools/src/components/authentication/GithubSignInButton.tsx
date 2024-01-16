import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";
import { GITHUB_SIGN_IN_BUTTON_LABEL } from "../../configs/TextConstants";

interface Props {
  handleLogin: (fidp: string) => void;
}

function GithubIcon() {
  return (
    <Box
      id="box-github-icon"
      component="img"
      src="third-party-app-logo/github.png"
      width={{ xs: 20, md: 30 }}
      height={{ xs: 19, md: 29 }}
    />
  );
}

function GithubSignInButton({ handleLogin }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  return (
    <Button
      id="btn-github-sign-in"
      component="label"
      variant="contained"
      startIcon={<GithubIcon />}
      endIcon={
        isLoading && (
          <CircularProgress
            id="comp-github-sign-in-circular-progress"
            size={16}
            sx={{ color: "black", ml: 0.46 }}
          />
        )
      }
      size="large"
      sx={{
        margin: 1,
        justifyContent: "flex-start",
        width: { xs: 240, md: 250 },
        backgroundColor: "common.white",
        color: "common.black",
        "&:hover": {
          backgroundColor: "#dadce0",
        },
      }}
      onClick={() => {
        setIsLoading(true);
        handleLogin("github");
      }}
    >
      {GITHUB_SIGN_IN_BUTTON_LABEL}
    </Button>
  );
}

export default GithubSignInButton;
