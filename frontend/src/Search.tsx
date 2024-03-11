import { useState } from "react";
import { Encounter } from "./interface/Config";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [encounterData, setEncounterData] = useState<Encounter | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5246/patientsearch/${searchValue}`
      );
      const data = await response.json();
      setEncounterData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>FHIR Patient Search</h1>
      <div>
        <label>
          Enter Patient Identifier:
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
      {encounterData && (
        <div>
          <h2>Search Result</h2>
          <p>{encounterData.id}</p>
          <pre>{JSON.stringify(encounterData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Search;
