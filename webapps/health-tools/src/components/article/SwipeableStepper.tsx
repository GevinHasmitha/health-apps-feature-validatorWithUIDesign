import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Button, Grid, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { articles } from "../../configs/ArticleConfig";
import ArticleTile from "./ArticleTile";

function SwipeableStepper() {
  const [screenWidth, setScreenWidth] = React.useState<number>(
    window.innerWidth
  );
  const handleResize = (): void => setScreenWidth(window.innerWidth);
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = articles.length;

  const isBackButtonDisabled = activeStep == 0;
  const isNextButtonDisabled =
    activeStep ==
    (screenWidth > 1536
      ? maxSteps - 3
      : screenWidth > 900
      ? maxSteps - 2
      : maxSteps - 1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box width="100%" alignItems="center" justifyContent="center">
      <Grid container alignItems="center" justifyContent="center">
        <Grid container item alignItems="center" justifyContent="center">
          <Grid
            container
            item
            xs={1}
            md={1}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              disabled={isBackButtonDisabled}
              onClick={() => handleBack()}
              sx={{ display: { xs: "block", md: "block" } }}
            >
              <ArrowBackIosOutlinedIcon
                fontSize="large"
                sx={{
                  strokeWidth: 2,
                  color: isBackButtonDisabled
                    ? "text.secondary"
                    : "secondary.main",
                  width: { sm: 20, md: 30, lg: 40 },
                }}
              />
            </IconButton>
          </Grid>
          <Grid
            container
            item
            xs={10}
            md={10}
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid
              item
              container
              md={6}
              xl={4}
              alignItems="center"
              justifyContent="center"
            >
              <ArticleTile
                title={articles[activeStep].title}
                type={articles[activeStep].type}
                link={articles[activeStep].link}
              />
            </Grid>
            {screenWidth > 900 && (
              <Grid
                item
                container
                md={6}
                xl={4}
                alignItems="center"
                justifyContent="center"
              >
                <ArticleTile
                  title={articles[activeStep + 1].title}
                  type={articles[activeStep + 1].type}
                  link={articles[activeStep + 1].link}
                />
              </Grid>
            )}
            {screenWidth > 1536 && (
              <Grid
                container
                item
                md={6}
                xl={4}
                alignItems="center"
                justifyContent="center"
              >
                <ArticleTile
                  title={articles[activeStep + 2].title}
                  type={articles[activeStep + 2].type}
                  link={articles[activeStep + 2].link}
                />
              </Grid>
            )}
          </Grid>
          <Grid
            container
            item
            xs={1}
            md={1}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              disabled={isNextButtonDisabled}
              onClick={() => handleNext()}
              sx={{ display: { xs: "block", md: "block" } }}
            >
              <ArrowForwardIosOutlinedIcon
                fontSize="large"
                sx={{
                  strokeWidth: 2,
                  color: isNextButtonDisabled
                    ? "text.secondary"
                    : "secondary.main",
                  width: { sm: 20, md: 30, lg: 40 },
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          paddingTop={5}
          alignItems="center"
          justifyContent="center"
          columnSpacing={5}
        >
          {articles.map((step, index) => (
            <Button
              onClick={() => {
                handleStepChange(index);
              }}
              sx={{
                display: { xs: "block", md: "none" },
                padding: 0,
                minHeight: 0,
                minWidth: 0,
              }}
            >
              <Box
                height={7}
                bgcolor={
                  index == activeStep ? "secondary.main" : "text.primary"
                }
                marginRight={1}
                borderRadius={1}
                sx={{
                  width: { xs: 20, md: 25, lg: 30 },
                  height: { xs: 6, md: 7, lg: 7 },
                }}
              ></Box>
            </Button>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default SwipeableStepper;
