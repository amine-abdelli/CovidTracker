import React from "react";
import { Select } from "antd";
import { NativeSelect, FormControl } from "@material-ui/core";

const SelectList = ({ onCountryChange, countriesList, loading }) => {
  function onChange(value) {
    console.log(`selected in children ${value}`);
    onCountryChange(value);
  }

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
        style={{ width: 210 }}
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
