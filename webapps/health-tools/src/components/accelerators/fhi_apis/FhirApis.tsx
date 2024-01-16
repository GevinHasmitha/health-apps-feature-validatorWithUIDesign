import { Container } from "@mui/material";
import { APIResourceBody } from ".";

export const FhirApis = () => {
  return (
    <Container
      id="fhir-apis-container"
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", height: 1 }}
    >
      <APIResourceBody />
    </Container>
  );
};
