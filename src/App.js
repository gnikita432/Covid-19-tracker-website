import React, { useEffect, useState } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WorldWide");

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

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        {/* header  */}
        <div className="app__header">
          {/* title + select input dropdown field  */}
          <h1>Covid-19 tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="WorldWide">worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* infoBoxes  */}
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" total={11} cases={12} />
          <InfoBox title="Recovered" total={12} cases={12} />
          <InfoBox title="Deaths" total={1} cases={12} />
        </div>
        {/* map  */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          {/* table  */}
          <h3>Live Cases by Country</h3>
          {/* graph  */}
          <h3>WorldWide new Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
