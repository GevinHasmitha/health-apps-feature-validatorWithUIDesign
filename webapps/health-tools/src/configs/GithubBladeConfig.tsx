import { Box, Link, Typography } from "@mui/material";
import { ReactElement } from "react";

export const HL7V2GITHUBCONTENT: ReactElement = (
  <Typography
    variant="body1"
    align="justify"
    maxWidth="lg"
    color="text.secondary"
    lineHeight={{ xs: 1.7, md: 1.9 }}
  >
    This tool transforms HL7v2 messages to FHIR resources. Data transformation
    conditions are taken from the{" "}
    <Link
      href="https://build.fhir.org/ig/HL7/v2-to-fhir/"
      target="_blank"
      color="secondary.main"
      sx={{ textDecoration: "none" }}
    >
      official HL7v2 to FHIR mappings guide
    </Link>{" "}
    and based on the feedback received from the users. The service is written in{" "}
    <Link
      href="https://ballerina.io/usecases/healthcare/"
      target="_blank"
      color="secondary.main"
      sx={{ textDecoration: "none" }}
    >
      Ballerina
    </Link>{" "}
    and hosted in{" "}
    <Link
      href="https://console.choreo.dev/"
      target="_blank"
      color="secondary.main"
      sx={{ textDecoration: "none" }}
    >
      Choreo
    </Link>
    .{" "}
    <Box component="span" fontWeight="bold">
      This tool should not be used in a production environment.
    </Box>{" "}
    We do not store any of the data you pasted/uploaded to the tool. If you want
    to use these services in a production setting, please contact us. For more
    information, checkout our{" "}
    <Link
      href="https://github.com/wso2/open-healthcare-prebuilt-services/tree/main/transformation/v2-to-fhirr4-service"
      target="_blank"
      color="secondary.main"
      sx={{ textDecoration: "none" }}
    >
      Git repository
    </Link>
    .
  </Typography>
);

export const CCDAGITHUBCONTENT: ReactElement = (
  <Typography
    variant="body1"
    align="justify"
    maxWidth="lg"
    color="text.secondary"
    lineHeight={{ xs: 1.7, md: 1.9 }}
  >
    This tool transforms C-CDA messages to FHIR resources. Data transformation
    conditions are taken from the{" "}
    <Link
      href="https://build.fhir.org/ig/HL7/ccda-on-fhir/"
      target="_blank"
      color="secondary.main"
      sx={{ textDecoration: "none" }}
    >
      official C-CDA to FHIR mappings guide
    </Link>{" "}
    and based on the feedback received from the users. The service is written in{" "}
    <Link
      href="https://ballerina.io/usecases/healthcare/"
      target="_blank"
      color="secondary.main"
      sx={{ textDecoration: "none" }}
    >
      Ballerina
    </Link>{" "}
    and hosted in{" "}
    <Link
      href="https://console.choreo.dev/"
      target="_blank"
      color="secondary.main"
      sx={{ textDecoration: "none" }}
    >
      Choreo
    </Link>
    .{" "}
    <Box component="span" fontWeight="bold">
      This tool should not be used in a production environment.
    </Box>{" "}
    We do not store any of the data you pasted/uploaded to the tool. If you want
    to use these services in a production setting, please contact us. For more
    information, checkout our{" "}
    <Link
      href="https://github.com/wso2/open-healthcare-prebuilt-services/tree/main/transformation/ccda-to-fhirr4-service"
      target="_blank"
      color="secondary.main"
      sx={{ textDecoration: "none" }}
    >
      Git repository
    </Link>
    .
  </Typography>
);
