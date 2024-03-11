# Introduction

FHIR (Fast Healthcare Interoperability Resources) is an international standard for the modular maintenance,processing and retrieval of medical data. The use of IT standards for data representation, e.g. JSON or XML, ensures ahuman-readable form and enables simple integration into existing infrastructures. By using FHIR resources, patients and their diagnoses as well as prescribed medication, encounter or surgeries can be recorded. Besides, an encounter is a hospital stay that can be e.g. ambulatory, emergency or inpatient.
All tasks in this document are based on communication and data access with FHIR. A FHIR store is therefore required for development. The fastest way to implement and test software products with FHIR is to use the public community server. Test resources can be created and queried on this server as required via REST operations. Further informationcan be found here:

- [HAPI FHIR Test/Demo Server R4 Endpoint (Swagger UI)](https://hapi.fhir.org/baseR4) 
- [Resource Index](https://hl7.org/fhir/resourcelist.html) 
- [Patient Resource](https://hl7.org/fhir/patient.html) 
- [Encounter Resource](https://hl7.org/fhir/encounter.html) 

## 1.Task: Accessing FHIR resources via REST

Try to fetch some patient resources from the public server preferably with via a ASP.NET Core application in C#. Display the received data with the help of your application without any further formating in the browser as plaintext.The patient resource's REST calls are shown below:

- https://hapi.fhir.org/baseR4/Patient?_format=xml
- https://hapi.fhir.org/baseR4/Patient?_format=json

For FHIR resource data representation you can choose between XML or JSON. 
By default JSON is active, if you aremore familiar with XML on C#, you can use this as well by adding the query parameter _format=xml.

Additionally we want to display the encounter for a patient that is available in the public FHIR store. To fetch apatient's encounter from the public FHIR endpoint, use the following REST GET call:

- https://hapi.fhir.org/baseR4/Encounter?patient.identifier=[IDENTIFIER]

The query parameter [IDENTIFIER] should be replaced with the identifier.value
that is part of the result of thepatient REST call as shown below:

```
...
"identifier": [ {

"system": "1.3.6.1.4.1.21367.13.20.1000.1",

"value": "john.doe"

} ]
...
```

Hints:

- Try to find and use a tool for accessing the patient FHIR resource from the URL
https://hapi.fhir.org/baseR4/Patient
before implementation to get more familiar with the data representation.
- The next task is about the implemententation of a frontend for a patient overview, so keep in mind to create aproject that can also deliver and work with a frontend framework. Do not use too much effort for prettyformatting in this task.

## 2.Task: Implement a frontend for patient overview with encounter navigation

Display the fetched data via your ASP.NET Core application and provide a frontend for a patient overview, that shows the following information as a table:

- ID
- Given and Family Name
- Birthdate
- Age
- Identifier value (identifier.value in JSON)

If the user clicks on patient row, the following encounter data should be displayed on the same or a separate page:

- ID
- Text e.g. "Jul 4th 2021 for sore throat"
- Status e.g. finished

Please use React or Angular for the frontend implementation and data representation. Third party components andlibraries are allowed.

## 3.Task: Patient search

Finally, we want to search for a certain patient by entering the identifier.value into a textfield. After the user confirms the idenfitier.value, the patient with all the available encounter data should be displayed.

Hint:

- The patient "John Doe", with the identifier "john.doe", has many encounters, so you can use this patient to testyour application.
- Try to write reuseable code as possible so you can use the patients encounter view for the search too.