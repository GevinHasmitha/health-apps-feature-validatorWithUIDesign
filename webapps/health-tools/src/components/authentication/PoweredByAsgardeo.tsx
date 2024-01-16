import { Box, Link, Typography } from "@mui/material";
import { POWERED_BY_LABEL } from "../../configs/TextConstants";

function PoweredByAsgardeo() {
  return (
    <Box
      id="box-powered-by-asgardeo"
      alignItems="center"
      display="flex"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        id="txt-powered-by-asgardeo"
        variant="body2"
        color="text.secondary"
        fontSize="0.8rem"
      >
        {POWERED_BY_LABEL}{" "}
      </Typography>
      <Link
        id="link-powered-by-asgardeo"
        href="https://wso2.com/asgardeo/"
        target="_blank"
        paddingTop={1}
      >
        <Box
          id="box-powered-by-asgardeo-image"
          component="img"
          height={22}
          width={90}
          margin={1.5}
          src="wso2-related-logo/asgardeo.svg"
        />
      </Link>
    </Box>
  );
}

export default PoweredByAsgardeo;
