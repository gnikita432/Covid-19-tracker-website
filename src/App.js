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
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  //shows world wide data
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //united state , france
            value: country.countryInfo.iso2, // UK , FR, USA
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);

          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
    countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

     fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });

    console.log(countryInfo);
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
          <InfoBox title="Coronavirus Cases" total={countryInfo.cases} cases={countryInfo.todayCases} />
          <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered} />
          <InfoBox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
        </div>
        {/* map  */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          {/* table  */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>

          {/* graph  */}
          <h3>WorldWide new Cases</h3>
          <LineGraph/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
