import React, { useEffect, useState } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import { colorOnFocus, colorOnBlur, sxForTextField, sxForAutocomplete, clearIconStyles } from './../searchFormStyles';

const AutocompleteEl = ({
  value,
  handleChange,
  options,
  textFieldLabel,
  inputStyle,
  handleClearInput,
  handleClearInputValue,
  isClean,
  handleSetIsClean,
}) => {
  const filterOptions = createFilterOptions({
    matchFrom: 'start', // Match input from the start of the option text
  });

  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  useEffect(() => {
    setIsOpen(inputValue.length >= 1 ? true : false); // Open dropdown after 2 characters
  }, [inputValue]);

  useEffect(() => {
    if (isClean && isClean === true) {
      setInputValue('');
      handleSetIsClean(false);
    }
  }, [isClean]);

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
        filterOptions={(options, state) => 
          filterOptions(options, state).filter(option =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
          )
        }
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
            setInputValue('');
            handleClearInput(handleClearInputValue);
          }}
        />
      ) : null}
    </>
  );
};

export default AutocompleteEl;
