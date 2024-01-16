import CopyrightIcon from "@mui/icons-material/Copyright";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {
  ABOUT_LINK_LABEL,
  CONTACT_LINK_LABEL,
  FOOTER_BUTTON_LABEL,
  FOOTER_COPYRIGHT,
  FOOTER_DESCRIPTION,
  FOOTER_TITLE,
  POLICY_LINK_LABEL,
  TERMS_LINK_LABEL,
} from "../../configs/TextConstants";

export const Footer = () => {
  return (
    <Grid>
      <Grid>
        <Box
          bgcolor="background.paper"
          alignItems="center"
          justifyContent="center"
          padding={2}
        >
          <Grid container alignItems="center" justifyContent="center">
            <Grid
              container
              justifyContent={{ xs: "center", md: "center" }}
              paddingTop={2}
            >
              <Box
                component={"img"}
                src="wso2-related-logo/choreo.svg"
                alt="Choreo Logo"
                sx={{
                  height: { xs: 31, sm: 37, md: 40, lg: 43 },
                  width: { xs: 100, sm: 120, md: 130, lg: 140 },
                }}
              ></Box>
            </Grid>
            <Grid
              item
              alignItems="center"
              sx={{
                paddingRight: 5,
                paddingLeft: 2,
                paddingTop: 3,
                paddingBottom: 1,
              }}
            >
              <Typography
                variant="h4"
                align="center"
                color="text.primary"
                maxWidth="md"
              >
                {FOOTER_TITLE}
              </Typography>
            </Grid>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              padding={1}
            >
              <Grid item>
                <Stack spacing={2}>
                  <Typography
                    variant="body1"
                    align="center"
                    color="text.primary"
                    maxWidth="md"
                    marginBottom={1}
                  >
                    {FOOTER_DESCRIPTION}
                  </Typography>
                  <Link
                    href="https://console.choreo.dev/"
                    target="_blank"
                    sx={{
                      alignSelf: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        padding: "7px 12px",
                        borderRadius: "8px",
                        fontWeight: 500,
                        fontSize: "1rem",
                        textTransform: "none",
                        maxWidth: "300px",
                        alignSelf: "center",
                        "&:hover": {
                          backgroundColor: "secondary.main",
                        },
                      }}
                    >
                      {FOOTER_BUTTON_LABEL}
                    </Button>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Divider />
      <Grid
        container
        spacing={1}
        paddingLeft={2}
        paddingRight={2}
        sx={{
          backgroundColor: "background.paper",
          justifyContent: "right",
        }}
      >
        <Grid
          item
          container
          xs={12}
          md={6}
          direction="row"
          justifyContent={{ xs: "center", md: "flex-start" }}
          alignItems="center"
        >
          <Stack direction="row">
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "row",
                padding: 1,
              }}
            >
              <Link
                href="https://wso2.com/solutions/healthcare/"
                target="_blank"
                sx={{ ml: 1, mr: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  {ABOUT_LINK_LABEL}
                </Typography>
              </Link>
              <Link
                href="https://wso2.com/contact/?ref=Healthcare"
                target="_blank"
                sx={{ ml: 1, mr: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  {CONTACT_LINK_LABEL}
                </Typography>
              </Link>
              <Link
                href="https://wso2.com/privacy-policy/"
                target="_blank"
                sx={{ ml: 1, mr: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  {POLICY_LINK_LABEL}
                </Typography>
              </Link>
              <Link
                // href="https://wso2.com/terms-of-use/"
                href="https://wso2.com/terms-of-use/open-healthcare-sandbox/"
                target="_blank"
                sx={{ ml: 1, mr: 6 }}
              >
                <Typography variant="body2" color="text.secondary">
                  {TERMS_LINK_LABEL}
                </Typography>
              </Link>
            </Box>
          </Stack>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          direction="row"
          justifyContent={{ xs: "center", md: "flex-end" }}
          alignItems="center"
        >
          <Stack direction="row">
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                flexDirection: "row",
                padding: 1,
              }}
            >
              <CopyrightIcon
                sx={{
                  color: "text.secondary",
                  mr: { sm: 0.5 },
                  fontSize: "10",
                }}
                aria-hidden="true"
              />
              <Link href="https://wso2.com/" target="_blank" underline="hover">
                <Typography
                  variant="body2"
                  sx={{ color: "grey.500" }}
                  id="footer-text"
                  color="text.secondary"
                >
                  {new Date().getFullYear()} {FOOTER_COPYRIGHT}
                </Typography>
              </Link>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};
