import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import {
  sxForAutocomplete,
  sxForTextField,
  colorOnFocus,
  colorOnBlur,
  clearIconStyles,
} from './../searchFormStyles';
import kiwi_city_id from '../../../../../../modules/trip_search/data/jsons/kiwi_city_id.json';

const cityOptions = Object.entries(kiwi_city_id[0] || {})
  .map(([key, value]) => {
    let cityName = value[0].split('_')[0];
    cityName = cityName
      .replace(/-/g, '- ') // Keep hyphen formatting
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize every word
    return {
      id: key,
      label: cityName.trim(),
    };
  })
  .reduce((acc, current) => {
    if (!acc.find((item) => item.label === current.label)) {
      acc.push(current);
    }
    return acc;
  }, [])
  .sort((a, b) => a.label.localeCompare(b.label)); // Alphabetical sorting

const AutocompleteEl = ({
  value,
  handleChange,
  textFieldLabel,
  inputStyle,
  handleClearInput,
  handleClearInputValue,
  isClean,
  handleSetIsClean,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    setIsOpen(newValue.length > 0); // Open dropdown if input is not empty
  };

  // Custom filter logic to match substrings
  const filteredOptions = cityOptions.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    if (isClean) {
      setInputValue('');
      handleSetIsClean(false);
    }
  }, [isClean, handleSetIsClean]);

  return (
    <>
      <Autocomplete
        value={value || null}
        onChange={(e, newValue) => {
          handleChange(newValue || '');
          setTimeout(() => setIsOpen(false), 1);
        }}
        freeSolo
        blurOnSelect
        disableClearable
        inputValue={inputValue}
        onInputChange={(e, newValue) => handleInputChange(newValue)}
        options={filteredOptions}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={sxForAutocomplete}
        ListboxProps={{ style: { maxHeight: 140 } }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={textFieldLabel}
            variant="standard"
            InputLabelProps={{
              style: inputStyle,
            }}
            sx={sxForTextField}
          />
        )}
        isOptionEqualToValue={(option, value) => option.label === value}
      />
      {inputValue ? (
        <ClearIcon
          style={clearIconStyles}
          onClick={() => {
            setInputValue('');
            handleClearInput(handleClearInputValue);
          }}
        />
      ) : null}
    </>
  );
};

export default AutocompleteEl;
