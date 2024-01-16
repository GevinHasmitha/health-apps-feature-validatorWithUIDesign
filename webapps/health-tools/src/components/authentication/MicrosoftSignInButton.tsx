import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";
import { MICROSOFT_SIGN_IN_BUTTON_LABEL } from "../../configs/TextConstants";

interface Props {
  handleLogin: (fidp: string) => void;
}

function MicrosoftIcon() {
  return (
    <Box
      id="box-microsoft-icon"
      component="img"
      src="third-party-app-logo/microsoft.png"
      width={{ xs: 17, md: 27 }}
      height={{ xs: 17, md: 27 }}
    />
  );
}

function MicrosoftSignInButton({ handleLogin }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  return (
    <Button
      id="btn-microsoft-sign-in"
      component="label"
      variant="contained"
      startIcon={<MicrosoftIcon />}
      endIcon={
        isLoading && (
          <CircularProgress
            id="comp-microsoft-sign-in-circular-progress"
            size={16}
            sx={{ color: "black", ml: 0.1 }}
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
        handleLogin("microsoft");
      }}
    >
      {MICROSOFT_SIGN_IN_BUTTON_LABEL}
    </Button>
  );
}

export default MicrosoftSignInButton;
