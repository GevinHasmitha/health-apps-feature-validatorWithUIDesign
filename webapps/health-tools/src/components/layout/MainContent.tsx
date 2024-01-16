import { AuthProvider } from "@asgardeo/auth-react";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tool, ToolStatus, tools } from "../../configs/ToolContentConfig";
import ArticleBanner from "../article/ArticleBanner";
import { MainBlade } from "../banner/MainBlade";
import { MaintenancePage } from "../error/MaintenancePage";
import NotFoundError from "../error/NotFoundError";
import { Footer } from "../footer/Footer";
import GithubBanner from "../github_banner/GithubBanner";
import { Header } from "../header/Header";
import LandingPage from "../landing_page/LandingPage";
import Wso2Promotion from "../promotion/Wso2Promotion";
import Routes from "../routes/AppRoutes";

declare global {
  interface Window {
    Config: any;
  }
}

export const MainContent = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return <LandingPage />;
  }

  let currentItem = tools.find(
    (tool: Tool) =>
      tool.status !== ToolStatus.inactive && tool.path === location.pathname
  );

  if (!currentItem) {
    return <NotFoundError />;
  }

  const Config = window.Config;
  const redirectBaseUrl = Config.APP_AUTH_REDIRECT_BASE_URL;
  const config = {
    signInRedirectURL: redirectBaseUrl + location.pathname,
    signOutRedirectURL: redirectBaseUrl + location.pathname,
    clientID: Config.APP_AUTH_CLIENT_ID,
    baseUrl: Config.APP_AUTH_BASE_URL,
    scope: ["openid", "profile"],
    resourceServerURLs: [Config.BFF_BASE_URL, "http://localhost:9090/sampleResource"],
    disableTrySignInSilently: false,
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/hl7v2-to-fhir":
        document.title = "HL7v2 to FHIR";
        break;
      case "/c-cda-to-fhir":
        document.title = "C-CDA to FHIR";
        break;
      default:
        document.title = "FHIR Tools";
    }
  }, []);

  return (
    <AuthProvider config={config}>
      <Box>
        <Header
          title={currentItem.title}
          shortDescription={currentItem.shortDescription}
          url={currentItem.url}
        />
        <Box id="main-container">
          {/* Banner content */}
          <MainBlade
            title={currentItem.title}
            subTitle={currentItem.subTitle}
            description={currentItem.description}
            backgroundImage={currentItem.image}
            status={currentItem.status}
          />

          {/* Tool execution area */}
          {currentItem.status === ToolStatus.active && <Routes items={tools} />}

          {/* Github source display area */}
          {currentItem.status === ToolStatus.active && (
            <GithubBanner
              content={currentItem.githubContent}
              marginTop={0}
              marginBottom={0}
            ></GithubBanner>
          )}

          {/* If the particular page is in maintenance status */}
          {currentItem.status === ToolStatus.maintenance && <MaintenancePage />}

          {/* Other tools display area */}
          {/* temporary removing the tools blade until other tools are ready */}
          {/* <Tools currentTool={currentItem.title}></Tools> */}

          {/* About WSO2 display area */}
          <Wso2Promotion></Wso2Promotion>

          {/* Articles display area */}
          <ArticleBanner></ArticleBanner>

          {/* Footer display area */}
          <Footer />
        </Box>
      </Box>
    </AuthProvider>
  );
};
