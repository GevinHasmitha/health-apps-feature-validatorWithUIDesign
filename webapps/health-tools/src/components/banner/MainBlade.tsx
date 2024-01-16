import { Box, Grid, Typography } from "@mui/material";
import { ToolStatus } from "../../configs/ToolContentConfig";

interface MainBladeProps {
  title: string;
  subTitle: string;
  description: string;
  backgroundImage: string;
  status?: ToolStatus;
}

export const MainBlade = ({
  title,
  subTitle,
  description,
  backgroundImage,
  status = ToolStatus.active,
}: MainBladeProps) => {
  return (
    <>
      <Box bgcolor="background.paper">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          paddingTop={{ xs: 25, sm: 22, md: 12, xl: 5 }}
        >
          <Grid
            container
            item
            alignItems="center"
            justifyContent="center"
            maxWidth={{ xl: "xl", lg: "lg", md: "md", sm: "md", xs: "xs" }}
            sx={{ padding: { xs: 3, sm: 4, md: 2, lg: 2 } }}
            spacing={10}
          >
            <Grid
              container
              item
              md={6}
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                container
                item
                alignItems="center"
                justifyContent="flexStart"
              >
                <Typography
                  variant="h1"
                  sx={{
                    mt: 3,
                    mb: 6,
                  }}
                  alignItems="center"
                  color="text.primary"
                >
                  {title}
                </Typography>
              </Grid>

              <Grid container item alignItems="center" justifyContent="center">
                <Typography
                  variant="body1"
                  color="text.secondary"
                  marginTop={1}
                  align="justify"
                  lineHeight={1.7}
                >
                  {description}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              md={6}
              alignItems={{ lg: "center", xl: "left" }}
              justifyContent="center"
            >
              <Box
                component="img"
                sx={{
                  width: { xs: 0, md: 450, lg: 550, xl: 690 },
                  height: { xs: 0, md: 236, lg: 289, xl: 362 },
                  marginLeft: 10,
                }}
                alt="HL7v2 Logo"
                src={backgroundImage}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant="h2" align="center" paddingTop={5}>
          {status === ToolStatus.active && subTitle}
        </Typography>
      </Box>
    </>
  );
};
