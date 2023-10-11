import React, { ChangeEvent, useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

type Props = {
  country: string;
  state: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFocus: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CountryDropdown = (props: Props) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("NG"); // Default to Nigeria
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_COUNTRY_API2!);
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    const fetchStates = async (countryCode: any) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STATE_API}/childrenJSON?geonameId=${countryCode}&username=avante_cs`
        );
        setStates(response.data.geonames);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchCountries();
    fetchStates(selectedCountry);
  }, [selectedCountry]);

  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption.value);
  };

  const stateOptions = states.map((state: any) => ({
    value: state.geonameId,
    label: state.name,
  }));

  // Transform the country data into the format required by react-select
  const options = countries.map((country: any) => ({
    value: country.name.common,
    label: (
      <div className="flex items-center">
        <img
          src={`https://flagcdn.com/48x36/${country.cca2.toLowerCase()}.png`}
          alt={`${country.name.common} flag`}
          className="mr-3"
        />
        {country.name.common}
      </div>
    ),
  }));

  const countryOptions = countries.map((country: any) => ({
    value: country.cca2,
    label: (
      <div className="flex items-center">
        <img
          src={`https://flagcdn.com/48x36/${country.cca2.toLowerCase()}.png`}
          alt={`${country.name.common} flag`}
          className="mr-3"
        />
        {country.name.common}
      </div>
    ),
  }));

  const handleChange = (selectedOption: any) => {
    console.log("Selected Option:", selectedOption);
  };

  return (
    <>
      {/* <Select options={options} onChange={handleChange} /> */}
      <div className="w-full sm:w-1/2">
        <div className="relative">
          <label className="inputLabelClass" htmlFor="country">
            Select Country
          </label>
          <Select options={countryOptions} onChange={handleCountryChange} />
        </div>
      </div>
      <div className="w-full sm:w-1/2">
        <div className="relative">
          <label className="inputLabelClass" htmlFor="country">
            Select State
          </label>
          <Select options={stateOptions} />
        </div>
      </div>
    </>
  );
};

export default CountryDropdown;
