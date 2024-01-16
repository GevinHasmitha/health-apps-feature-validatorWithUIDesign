import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import {
  OTHER_TOOLS_SECTION_DESCRIPTION,
  OTHER_TOOLS_SECTION_TITLE,
} from "../../configs/TextConstants";
import { ToolStatus, tools } from "../../configs/ToolContentConfig";
import Toolcard from "./ToolCard";

interface Props {
  currentTool: string;
}

function Tools({ currentTool }: Props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const activeTools = tools.filter(
    (tool) => tool.status !== ToolStatus.inactive && tool.title !== currentTool
  );
  const maxSteps = activeTools.length - 3;
  const [screenWidth, setScreenWidth] = React.useState<number>(
    window.innerWidth
  );

  const handleResize = (): void => setScreenWidth(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Grid container rowSpacing={5} color="text.primary" marginBottom={6}>
        <Grid
          container
          item
          xs={12}
          marginTop={7}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2" align="center" maxWidth="lg">
            {OTHER_TOOLS_SECTION_TITLE}
          </Typography>
        </Grid>

        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
          maxWidth="lg"
          padding={5}
        >
          <Typography
            variant="body1"
            align="justify"
            color="text.secondary"
            maxWidth="lg"
          >
            {OTHER_TOOLS_SECTION_DESCRIPTION}
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
          maxWidth="lg"
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid
                container
                item
                xs={2}
                sm={3}
                md={2}
                lg={1}
                xl={2}
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  disabled={activeStep == 0}
                  onClick={() => handleBack()}
                  sx={{ color: "grey.300", borderRadius: 20 }}
                >
                  <ArrowBackIosOutlinedIcon
                    fontSize="large"
                    sx={{
                      stroke: "primary.main",
                      strokeWidth: 5,
                      color: "primary.main",
                    }}
                  />
                </Button>
              </Grid>
              <Grid
                item
                xs={8}
                sm={6}
                md={8}
                lg={10}
                xl={8}
                alignItems="center"
                justifyContent="center"
              >
                <SwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  enableMouseEvents
                >
                  <Grid
                    container
                    flexDirection={"row"}
                    columnSpacing={{ md: 5, lg: 10 }}
                    rowSpacing={2}
                    marginTop={2}
                    marginBottom={4}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid
                      item
                      alignItems="center"
                      justifyContent="center"
                      md={6}
                      lg={4}
                    >
                      <Toolcard
                        title={activeTools[activeStep].title}
                        description={activeTools[activeStep].description}
                        image={activeTools[activeStep].image}
                        link={activeTools[activeStep].url}
                      ></Toolcard>
                    </Grid>
                    {screenWidth >= 900 && (
                      <Grid
                        item
                        md={6}
                        lg={4}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Toolcard
                          title={activeTools[activeStep + 1].title}
                          description={activeTools[activeStep + 1].description}
                          image={activeTools[activeStep + 1].image}
                          link={activeTools[activeStep + 1].url}
                        ></Toolcard>
                      </Grid>
                    )}
                    {screenWidth >= 1200 && (
                      <Grid
                        item
                        lg={4}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Toolcard
                          title={activeTools[activeStep + 2].title}
                          description={activeTools[activeStep + 2].description}
                          image={activeTools[activeStep + 2].image}
                          link={activeTools[activeStep + 2].url}
                        ></Toolcard>
                      </Grid>
                    )}
                  </Grid>
                  {/* // ))} */}
                </SwipeableViews>
              </Grid>
              <Grid
                container
                item
                xs={2}
                sm={3}
                md={2}
                lg={1}
                xl={2}
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  disabled={activeStep == maxSteps - 1}
                  onClick={() => handleNext()}
                  sx={{ borderRadius: 200, stroke: "grey.300" }}
                >
                  <ArrowForwardIosOutlinedIcon
                    fontSize="large"
                    sx={{
                      stroke: "primary.main",
                      strokeWidth: 5,
                      color: "primary.main",
                    }}
                  />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Tools;
