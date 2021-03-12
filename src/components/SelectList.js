import React from "react";
import { Select } from "antd";

const SelectList = ({ onCountryChange, countriesList, loading }) => {
  function onChange(value) {
    onCountryChange(value);
  }
  const style = {
    width: 350,
    border: "3px solid black",
    borderRadius: "5px",
    color: "black",
  };
  // List des pays provenant de l'API
  const selectedCountry = countriesList.map((value) => {
    return (
      <option className="optionList" key={value.name} value={value.name}>
        {value.name}
      </option>
    );
  });

  return (
    <div>
      <Select
        showSearch
        style={style}
        placeholder="Choix du pays"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {selectedCountry}
      </Select>
    </div>
  );
};
export default SelectList;
