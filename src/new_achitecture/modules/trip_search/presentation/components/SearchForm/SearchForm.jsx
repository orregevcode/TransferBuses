import React, { memo, useState } from 'react';
import { Button } from '@material-ui/core';
import useCheapTripSearch from '../../hooks/useCheapTripSearch';
import s from './../../../domain/entites/CheapTripSearch/cheaptrip.module.css';
import classes from './../../../presentation/components/searchResult/SearchComponent.module.css';
import i18n from './../../../domain/entites/utils/language/i18n';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import AutocompleteEl from './AutocompleteEl/AutocompleteEl';
import { inputFromStyle, inputToStyle } from './searchFormStyles';

const SearchForm = memo(() => {
  const {
    from,
    selectFrom,
    selectTo,
    checkFromOption,
    to,
    checkToOption,
    cleanForm,
    submit,
    clearFromField,
    clearToField,
  } = useCheapTripSearch();

  const [isClean, setIsClean] = useState(false);

  const handleSelectFrom = (value) => {
    selectFrom(value);
  };
  const handleSelectTo = (value) => {
    selectTo(value);
  };

  const handleClearInput = (value) => {
    value === 'from' ? clearFromField() : clearToField();
  };

  const handleCleanForm = () => {
    cleanForm();
    handleSetIsClean(true);
    handleSetIsClean(true);
  };
  const handleSubmit = () => {
    submit();
  };

  const handleSetIsClean = (value) => {
    setIsClean(value);
  };

  return (
    <>
      <form action='' className={s.autocomplete}>
        <div className={classes.city_box}>
          <AutocompleteEl
            value={from || null}
            handleChange={handleSelectFrom}
            options={checkFromOption}
            textFieldLabel={'From'}
            inputStyle={inputFromStyle}
            handleClearInput={handleClearInput}
            handleClearInputValue={'from'}
            isClean={isClean}
            handleSetIsClean={handleSetIsClean}
            isClean={isClean}
            handleSetIsClean={handleSetIsClean}
          />
        </div>
        <DoubleArrowIcon className={classes.media_icon} />
        <div className={classes.city_box}>
          <AutocompleteEl
            value={to || null}
            handleChange={handleSelectTo}
            options={checkToOption}
            textFieldLabel={'To'}
            inputStyle={inputToStyle}
            handleClearInput={handleClearInput}
            handleClearInputValue={'to'}
            isClean={isClean}
            handleSetIsClean={handleSetIsClean}
            isClean={isClean}
            handleSetIsClean={handleSetIsClean}
          />
        </div>
      </form>
      <div className={classes.filter_buttons}>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleCleanForm}
          type='reset'
          disableElevation // disable shade
          style={{ width: '110px', textTransform: 'none' }}
        >
          {/* {i18n.t('Clear form')} */}
          Clear form
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          style={{ width: '110px', textTransform: 'none', color: '#fff' }}
          type='button'
          disableElevation
          disabled={to === '' || from === ''}
        >
          {/* {i18n.t("Let's go")} */}
          Let's go
        </Button>
      </div>
    </>
  );
});

export default SearchForm;
