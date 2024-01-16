import { Box } from "@mui/system";
import Banner from "./Banner";
import Tools from "./Tools";
import { Footer } from "../footer/Footer";
import { Header } from "./Header";

function LandingPage() {
  return (
    <Box color="text.primary">
      <Header></Header>
      <Banner></Banner>
      <Tools></Tools>
      <Footer></Footer>
    </Box>
  );
}

export default LandingPage;
