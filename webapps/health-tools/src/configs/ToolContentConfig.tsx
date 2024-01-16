import CableOutlinedIcon from "@mui/icons-material/CableOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import TransformOutlinedIcon from "@mui/icons-material/TransformOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { ReactElement } from "react";
import {
  CcdaToFhir,
  ConnectToEmr,
  FhirApis,
  FhirPath,
  FhirValidation,
  Hl7v2ToFhir,
  SmartOnFhir,
} from "../components/accelerators";
import { CCDAGITHUBCONTENT, HL7V2GITHUBCONTENT } from "./GithubBladeConfig";

export enum ToolStatus {
  active,
  inactive,
  maintenance,
}

export interface Tool {
  title: string;
  subTitle: string;
  shortDescription: string;
  description: string;
  url: string;
  path: string;
  image: string;
  icon: ReactElement;
  component: ReactElement;
  githubContent: ReactElement;
  status?: ToolStatus;
}

export interface Sample {
  name: string;
  apiName?: string;
  data: string;
}

export const tools: Tool[] = [
  {
    title: "HL7v2 To FHIR",
    subTitle: "Transform",
    shortDescription: "Convert HL7v2 messages to FHIR resources",
    description:
      "Introducing our API for health IT developers, enabling seamless conversion of HL7v2 data to FHIR standards. Simplify integration and data exchange processes, experiencing reduced development complexity and accelerated time-to-market as you effortlessly transition to FHIR standards.",
    path: "/hl7v2-to-fhir",
    image: "tools-logo/without-background/hl7v2.png",
    icon: <TransformOutlinedIcon sx={{ width: 23, height: 23 }} />,
    component: <Hl7v2ToFhir />,
    url: "https://wso2.com/solutions/healthcare/",
    githubContent: HL7V2GITHUBCONTENT,
    status: ToolStatus.active,
  },
  {
    title: "C-CDA To FHIR",
    subTitle: "Transform",
    shortDescription: "Convert C-CDA messages to FHIR resources",
    description:
      "This API provides health IT developers with a powerful tool to seamlessly convert C-CDA documents to FHIR, facilitating the transition of clinical data from older systems to modern standards.",
    path: "/c-cda-to-fhir",
    image: "tools-logo/without-background/c-cda.png",
    icon: <TransformOutlinedIcon sx={{ width: 23, height: 23 }} />,
    component: <CcdaToFhir />,
    url: "https://wso2.com/solutions/healthcare/",
    githubContent: CCDAGITHUBCONTENT,
    status: ToolStatus.active,
  },
  {
    title: "FHIR APIs",
    subTitle: "Transform",
    shortDescription: "Hands on experience with FHIR APIs",
    description:
      "Hands on experience with FHIR APIs. Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    path: "/fhir-apis",
    image: "health-intro.png",
    icon: <TransformOutlinedIcon sx={{ width: 23, height: 23 }} />,
    component: <FhirApis />,
    url: "https://wso2.com/solutions/healthcare/",
    githubContent: HL7V2GITHUBCONTENT,
    status: ToolStatus.active,
  },
  {
    title: "FHIR Validation",
    subTitle: "Validate",
    shortDescription: "Validate FHIR resources",
    description:
      // "Validate the FHIR Resource that complies with the FHIR standards",
      "The FHIR Validator is a versatile tool ensuring compliance of Fast Healthcare Interoperability Resources (FHIR) with industry standards. Key features include comprehensive standards adherence, thorough structure validation, data type verification, and code system validation. This API-integrated tool facilitates seamless validation of FHIR Resources.",
    path: "/fhir-validation",
    image: "tools-logo/without-background/fhir-validator.png",
    icon: <CheckCircleOutlineOutlinedIcon sx={{ width: 23, height: 23 }} />,
    component: <FhirValidation />,
    url: "https://wso2.com/solutions/healthcare/",
    githubContent: HL7V2GITHUBCONTENT,
    status: ToolStatus.active,
  },
  {
    title: "SMART on FHIR",
    subTitle: "Transform",
    shortDescription: "Convert HL7 V2 data to FHIR",
    description: "Try out a standalone end user FHIR application",
    path: "/smart-on-fhir",
    image: "health-intro.png",
    icon: <VpnKeyOutlinedIcon sx={{ width: 23, height: 23 }} />,
    component: <SmartOnFhir />,
    url: "https://wso2.com/solutions/healthcare/",
    githubContent: HL7V2GITHUBCONTENT,
    status: ToolStatus.active,
  },
  {
    title: "FHIR Path",
    subTitle: "Transform",
    shortDescription: "Convert HL7 V2 data to FHIR",
    description:
      "Easily convert, transform and extract healthcare data to meet FHIR standards.",
    path: "/fhir-path",
    image: "health-intro.png",
    icon: <FilterAltOutlinedIcon sx={{ width: 23, height: 23 }} />,
    component: <FhirPath />,
    url: "https://wso2.com/solutions/healthcare/",
    githubContent: HL7V2GITHUBCONTENT,
    status: ToolStatus.maintenance,
  },
  {
    title: "Connect To EMR",
    subTitle: "Transform",
    shortDescription: "Convert HL7 V2 data to FHIR",
    description: "Connect FHIR resource to EMR",
    path: "/connect-to-emr",
    image: "health-intro.png",
    icon: <CableOutlinedIcon sx={{ width: 23, height: 23 }} />,
    component: <ConnectToEmr />,
    url: "https://wso2.com/solutions/healthcare/",
    githubContent: HL7V2GITHUBCONTENT,
    status: ToolStatus.inactive,
  },
  {
    title: "Terminology Service",
    subTitle: "Resolve and validate",
    shortDescription: "Query terminology service",
    description: "Query terminology service",
    path: "/terminology-service",
    image: "health-intro.png",
    icon: <CableOutlinedIcon sx={{ width: 23, height: 23 }} />,
    component: <ConnectToEmr />,
    url: "https://wso2.com/solutions/healthcare/",
    githubContent: HL7V2GITHUBCONTENT,
    status: ToolStatus.maintenance,
  },
];
