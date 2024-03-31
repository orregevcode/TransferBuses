import React, { useEffect, useState } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {
  colorOnFocus,
  colorOnBlur,
  sxForTextField,
  sxForAutocomplete,
  clearIconStyles,
} from './../searchFormStyles';
import ClearIcon from '@material-ui/icons/Clear';

const AutocompleteEl = ({
  value,
  handleChange,
  options,
  textFieldLabel,
  inputStyle,
  handleClearInput,
  handleClearInputValue,
}) => {
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
  });

  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  useEffect(() => {
    setIsOpen(inputValue.length >= 2 ? true : false);
  }, [inputValue]);

  return (
    <>
      <Autocomplete
        value={value || null}
        onChange={(e, newValue) => {
          handleChange(newValue ? newValue : '');
          setTimeout(() => setIsOpen(false), 1);
        }}
        disablePortal
        freeSolo
        blurOnSelect
        disableClearable
        inputValue={inputValue}
        filterOptions={filterOptions}
        onInputChange={(e, newValue) => handleInputChange(newValue)}
        options={options}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={sxForAutocomplete}
        onFocus={() => (inputStyle = colorOnFocus)}
        onBlur={() => (inputStyle = colorOnBlur)}
        ListboxProps={{ style: { maxHeight: 140 } }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={textFieldLabel}
            variant='standard'
            value={inputValue}
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
            setInputValue((prevVal) => (prevVal = ''));
            handleClearInput(handleClearInputValue);
          }}
        />
      ) : null}
    </>
  );
};

export default AutocompleteEl;
