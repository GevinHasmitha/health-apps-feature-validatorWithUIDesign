import ballerina/http;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string v2tofhirAPIUrl = ?;
configurable string ccdatofhirAPIUrl = ?;

http:ClientConfiguration config = {
    auth: {
        tokenUrl: tokenUrl,
        clientId: clientId,
        clientSecret: clientSecret
    }
};

final http:Client v2tofhirClient = check new (v2tofhirAPIUrl, config);
final http:Client ccdatofhirClient = check new (ccdatofhirAPIUrl, config);

// Represents the subtype of http:Ok status code record.
type BffResponse record {|
    *http:Ok;
    string mediaType;
    json body;
|};

const FHIR_MIME_TYPE_JSON = "application/fhir+json";

service / on new http:Listener(9080) {

    # + return - a json
    resource function post v2tofhir/transform(@http:Payload string hl7msg) returns BffResponse|error {
        // Invoke the v2tofhir service
        json result = check v2tofhirClient->/transform.post(hl7msg);
        return {body: result, mediaType: FHIR_MIME_TYPE_JSON};
    }
    resource function post ccdatofhir/transform(@http:Payload xml clinicalDocument) returns BffResponse|error {
        // Invoke the c-cda service: must have a xml payload
        json result = check ccdatofhirClient->/transform.post(clinicalDocument);
        return {body: result, mediaType: FHIR_MIME_TYPE_JSON};
    }
}
