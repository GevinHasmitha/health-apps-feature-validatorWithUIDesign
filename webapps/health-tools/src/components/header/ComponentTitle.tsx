import { Box, Typography } from "@mui/material";

interface Props {
  heading: string;
  description: string;
}

export const ComponentTitle = ({ heading, description }: Props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          mt: { sm: 1, md: 2 },
          mb: 1.2,
          ml: { xs: 0.4, sm: 1 },
          alignItems: "flex-end",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderLeft: { xs: 0, md: 1 },
              borderTop: { xs: 1, md: 0 },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
              }}
              id="component-heading"
              aria-label="Component heading"
              color="text.primary"
              paddingLeft={1.5}
              paddingTop={{ xs: 1, md: 0 }}
            >
              {heading}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5, borderLeft: { xs: 0, md: 1 } }}>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ fontWeight: 400 }}
              id="component-description"
              aria-label="Component description"
              paddingLeft={1.5}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
