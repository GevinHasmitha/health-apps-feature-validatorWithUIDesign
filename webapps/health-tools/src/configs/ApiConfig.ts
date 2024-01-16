import {
  BFF_BASE_URL,
  FHIR_ENCOUNTER_URL,
  FHIR_OBSERVATION_URL,
  FHIR_ORGANIZATION_URL,
  FHIR_PATIENT_URL,
  FHIR_PRACTITIONER_URL,
} from "./Constants";

export enum OperationTypes {
  CREATE,
  SEARCH,
  READ,
  DELETE,
}

export interface ResourceConfig {
  resourceName: string;
  resourceMethod: string;
  resourcePath: string;
  resourceDescription: string;
  resourceParameters?: SearchParam[];
  resourceOperation: OperationTypes;
}

export interface ApiConfig {
  name: string;
  apiUrl: string;
  resources: ResourceConfig[];
  searchParams: SearchParam[];
}

export interface SearchParam {
  paramName: string;
  paramValue: string;
  paramDescription: string;
  paramType: string;
  paramExample: string;
  isRequired: boolean;
}

export const apiList: ApiConfig[] = [
  // {
  //   name: "Metadata",
  //   baseUrl: BFF_BASE_URL + "/fhir/r4/metadata",
  //   searchParams: [],
  //   resources: [
  //     {
  //       resourceName: "Search",
  //       resourceMethod: "GET",
  //       resourcePath: "/Metadata",
  //       resourceDescription: "Get metadata resources",
  //       resourceOperation: OperationTypes.SEARCH,
  //     },
  //   ],
  // },
  {
    name: "Patient",
    apiUrl: BFF_BASE_URL + FHIR_PATIENT_URL,
    searchParams: [
      {
        paramName: "ID",
        paramValue: "_id",
        paramDescription: "ID of the patient",
        isRequired: true,
        paramType: "string",
        paramExample: "25285",
      },
      {
        paramName: "Gender",
        paramDescription: "Gender of the person",
        paramValue: "gender",
        isRequired: true,
        paramType: "code",
        paramExample: "male | female | other | unknown",
      },
      {
        paramName: "Active",
        paramDescription: "Whether the patient record is active",
        paramValue: "active",
        isRequired: true,
        paramType: "boolean",
        paramExample: "true | false",
      },
      {
        paramName: "Offset",
        paramDescription: "The offset of the payload",
        paramValue: "_offset",
        isRequired: true,
        paramType: "integer",
        paramExample: "5",
      },
      {
        paramName: "Count",
        paramDescription: "The count of the payload",
        paramValue: "_count",
        isRequired: true,
        paramType: "integer",
        paramExample: "10",
      },
      // {
      //   paramName: "Birthdate",
      //   paramDescription: "The patients birthdate (NOT IMPLEMENTED YET)",
      //   paramValue: "birthDate",
      //   isRequired: false,
      //   paramType: "date",
      //   paramExample: "2023-07-31",
      // },
    ],
    resources: [
      {
        resourceName: "Search",
        resourceMethod: "GET",
        resourcePath: "/Patient",
        resourceDescription: "Search patient resources",
        resourceOperation: OperationTypes.SEARCH,
      },
      {
        resourceName: "Read",
        resourceMethod: "GET",
        resourcePath: "/Patient/{id}",
        resourceDescription: "Read patient resource by Id",
        resourceOperation: OperationTypes.READ,
      },
      {
        resourceName: "Create",
        resourceMethod: "POST",
        resourcePath: "/Patient",
        resourceDescription: "Create patient resource",
        resourceOperation: OperationTypes.CREATE,
      },
      // {
      //   resourceMethod: "DELETE",
      //   resourcePath: "/Patient/{id}",
      //   resourceDescription: "Delete patient resource",
      //   resourceOperation: OpearionTypes.DELETE,
      // },
    ],
  },
  {
    name: "Encounter",
    apiUrl: BFF_BASE_URL + FHIR_ENCOUNTER_URL,
    searchParams: [
      {
        paramName: "ID",
        paramValue: "_id",
        paramDescription: "ID of the encounter",
        isRequired: true,
        paramType: "string",
        paramExample: "25285",
      },
      {
        paramName: "Status",
        paramDescription: "Status of the encounter",
        paramValue: "status",
        isRequired: true,
        paramType: "code",
        paramExample: "planned | arrived | triaged | in-progress +",
      },
      {
        paramName: "Class",
        paramDescription: "Classification of patient encounter",
        paramValue: "class",
        isRequired: true,
        paramType: "CodeableConcept",
        paramExample: "inpatient | outpatient",
      },
      {
        paramName: "Offset",
        paramDescription: "The offset of the payload",
        paramValue: "_offset",
        isRequired: true,
        paramType: "integer",
        paramExample: "5",
      },
      {
        paramName: "Count",
        paramDescription: "The count of the payload",
        paramValue: "_count",
        isRequired: true,
        paramType: "integer",
        paramExample: "10",
      },
    ],
    resources: [
      {
        resourceName: "Search",
        resourceMethod: "GET",
        resourcePath: "/Encounter",
        resourceDescription: "Search Encounter resources",
        resourceOperation: OperationTypes.SEARCH,
      },
      {
        resourceName: "Read",
        resourceMethod: "GET",
        resourcePath: "/Encounter/{id}",
        resourceDescription: "Read Encounter resource by id",
        resourceOperation: OperationTypes.READ,
      },
      {
        resourceName: "Create",
        resourceMethod: "POST",
        resourcePath: "/Encounter",
        resourceDescription: "Create Encounter resource",
        resourceOperation: OperationTypes.CREATE,
      },
    ],
  },
  {
    name: "Practitioner",
    apiUrl: BFF_BASE_URL + FHIR_PRACTITIONER_URL,
    searchParams: [
      {
        paramName: "ID",
        paramValue: "_id",
        paramDescription: "ID of the practitioner",
        isRequired: true,
        paramType: "string",
        paramExample: "25285",
      },
      {
        paramName: "Active",
        paramDescription: "Whether the practitioner is active",
        paramValue: "active",
        isRequired: true,
        paramType: "boolean",
        paramExample: "true | false",
      },
      {
        paramName: "Offset",
        paramDescription: "The offset of the payload",
        paramValue: "_offset",
        isRequired: true,
        paramType: "integer",
        paramExample: "5",
      },
      {
        paramName: "Count",
        paramDescription: "The count of the payload",
        paramValue: "_count",
        isRequired: true,
        paramType: "integer",
        paramExample: "10",
      },
    ],
    resources: [
      {
        resourceName: "Search",
        resourceMethod: "GET",
        resourcePath: "/Practitioner",
        resourceDescription: "Search Practitioner resources",
        resourceOperation: OperationTypes.SEARCH,
      },
      {
        resourceName: "Read",
        resourceMethod: "GET",
        resourcePath: "/Practitioner/{id}",
        resourceDescription: "Read Practitioner resource by id",
        resourceOperation: OperationTypes.READ,
      },
      {
        resourceName: "Create",
        resourceMethod: "POST",
        resourcePath: "/Practitioner",
        resourceDescription: "Create Practitioner resource",
        resourceOperation: OperationTypes.CREATE,
      },
    ],
  },
  {
    name: "Organization",
    apiUrl: BFF_BASE_URL + FHIR_ORGANIZATION_URL,
    searchParams: [
      {
        paramName: "ID",
        paramValue: "_id",
        paramDescription: "ID of the organization",
        isRequired: true,
        paramType: "string",
        paramExample: "25285",
      },
      {
        paramName: "Name",
        paramDescription: "The organization name",
        paramValue: "name",
        isRequired: true,
        paramType: "string",
        paramExample: "Hospital Krel Tarron",
      },
      {
        paramName: "Address-City",
        paramDescription: "Address-City of the organization",
        paramValue: "class",
        isRequired: true,
        paramType: "Address",
        paramExample: "Ann Arbor",
      },
      {
        paramName: "Offset",
        paramDescription: "The offset of the payload",
        paramValue: "_offset",
        isRequired: true,
        paramType: "integer",
        paramExample: "5",
      },
      {
        paramName: "Count",
        paramDescription: "The count of the payload",
        paramValue: "_count",
        isRequired: true,
        paramType: "integer",
        paramExample: "10",
      },
    ],
    resources: [
      {
        resourceName: "Search",
        resourceMethod: "GET",
        resourcePath: "/Organization",
        resourceDescription: "Search Organization resources",
        resourceOperation: OperationTypes.SEARCH,
      },
      {
        resourceName: "Read",
        resourceMethod: "GET",
        resourcePath: "/Organization/{id}",
        resourceDescription: "Read Organization resource by id",
        resourceOperation: OperationTypes.READ,
      },
      {
        resourceName: "Create",
        resourceMethod: "POST",
        resourcePath: "/Organization",
        resourceDescription: "Create Organization resource",
        resourceOperation: OperationTypes.CREATE,
      },
    ],
  },
  {
    name: "Observation",
    apiUrl: BFF_BASE_URL + FHIR_OBSERVATION_URL,
    searchParams: [
      {
        paramName: "ID",
        paramValue: "_id",
        paramDescription: "ID of the observation",
        isRequired: true,
        paramType: "string",
        paramExample: "25285",
      },
      {
        paramName: "Status",
        paramDescription: "The status of the result value.",
        paramValue: "status",
        isRequired: true,
        paramType: "code",
        paramExample: "registered | preliminary | final | amended +",
      },
      {
        paramName: "Subject",
        paramDescription: "The subject of the observation",
        paramValue: "class",
        isRequired: true,
        paramType: "Reference",
        paramExample: "Patient/10552508",
      },
      {
        paramName: "Offset",
        paramDescription: "The offset of the payload",
        paramValue: "_offset",
        isRequired: true,
        paramType: "integer",
        paramExample: "5",
      },
      {
        paramName: "Count",
        paramDescription: "The count of the payload",
        paramValue: "_count",
        isRequired: true,
        paramType: "integer",
        paramExample: "10",
      },
    ],
    resources: [
      {
        resourceName: "Search",
        resourceMethod: "GET",
        resourcePath: "/Observation",
        resourceDescription: "Search Observation resources",
        resourceOperation: OperationTypes.SEARCH,
      },
      {
        resourceName: "Read",
        resourceMethod: "GET",
        resourcePath: "/Observation/{id}",
        resourceDescription: "Read Observation resources by id",
        resourceOperation: OperationTypes.READ,
      },
      {
        resourceName: "Create",
        resourceMethod: "POST",
        resourcePath: "/Observation",
        resourceDescription: "Create Observation resource",
        resourceOperation: OperationTypes.CREATE,
      },
    ],
  },
];
