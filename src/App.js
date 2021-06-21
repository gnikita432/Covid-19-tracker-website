import React, { useEffect, useState } from "react";
import "./App.css";
import { MenuItem, FormControl, Select } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //united state , france
            value: country.countryInfo.iso2, // UK , FR, USA
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  return (
    <div className="app">
      {/* header  */}
      <div className="app__header">
        {/* title + select input dropdown field  */}
        <h1>Covid-19 tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="country">
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* infoBoxes  */}
      {/* infoBoxes  */}
      {/* infoBoxes  */}
      {/* infoBoxes  */}

      {/* table  */}
      {/* graph  */}

      {/* map  */}
    </div>
  );
}

export default App;
