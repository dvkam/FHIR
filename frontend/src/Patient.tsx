import { useEffect, useState } from "react";
import { Patient, Encounter, Entry } from "./interface/Config";
import Modal from "./Modal";

const calculateAge = (birthdate: string) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  } else {
    return "no data";
  }

  return age;
};

const FhirData = () => {
  const [patientData, setPatientData] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [encounterData, setEncounterData] = useState<Encounter | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5246/patient");
        const data = await response.json();

        if (data && data.entry) {
          const patients = data.entry.map((entry: Entry) => {
            const patient = entry.resource;
            return {
              id: patient.id,
              givenName:
                patient.name && patient.name[0] && patient.name[0].given
                  ? patient.name[0].given.join(" ")
                  : "",
              familyName:
                patient.name && patient.name[0] && patient.name[0].family
                  ? patient.name[0].family
                  : "",
              birthDate: patient.birthDate || "",
              gender: patient.gender,
              phone:
                patient.telecom &&
                patient.telecom[0] &&
                patient.telecom[0].value
                  ? patient.telecom[0].value
                  : "",
              identifier:
                patient.identifier &&
                patient.identifier[0] &&
                patient.identifier[0].value
                  ? patient.identifier[0].value
                  : "",
            };
          });

          setPatientData(patients);
        }
      } catch (error) {
        console.error("Error fetching FHIR data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchEncounterData = async (identifier: string) => {
    try {
      const response = await fetch(
        `http://localhost:5246/encounter/${identifier}`
      );
      const data = await response.json();
      setEncounterData(data);
    } catch (error) {
      console.error("Error fetching encounter data:", error);
    }
  };

  const handlePatientClick = (identifier: string) => {
    setSelectedPatient(identifier);
    fetchEncounterData(identifier);
    setOpen(true);
  };

  return (
    <div className="container mx-auto mb-10">
      <h1 className="text-center text-xl my-4">FHIR Patient Data</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Birthdate
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
              <th scope="col" className="px-6 py-3">
                Identifier
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">View Details</span>
              </th>
            </tr>
          </thead>
          {patientData.map((patient) => (
            <tbody key={patient.id}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {patient.id}
                </th>
                <td className="px-6 py-4">
                  {`${patient.givenName} ${patient.familyName}`}
                </td>
                <td className="px-6 py-4">{patient.birthDate}</td>
                <td className="px-6 py-4">{calculateAge(patient.birthDate)}</td>
                <td className="px-6 py-4">{patient.identifier}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handlePatientClick(patient.identifier)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        {selectedPatient && (
          <div>
            <h1 className="text-center text-xl my-4">
              Encounter Data for {selectedPatient}
            </h1>

            {encounterData ? (
              <div className="text-center">
                <strong>ID:</strong> {encounterData.id}
                <br />
                <strong>Text:</strong> {encounterData.text}
                <br />
                <strong>Status:</strong> {encounterData.status}
                <br />
              </div>
            ) : (
              <p>Loading encounter data...</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FhirData;
