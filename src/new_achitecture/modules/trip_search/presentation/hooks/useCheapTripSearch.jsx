import React, { useState, useEffect } from 'react';
import locations from '../../data/jsons/cheapTripData/locations.json';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredRoutes } from '../redux/reducers/cheapTripSearch/cheapTripSearchSlice';
import { useMediaQuery } from '@material-ui/core';
import { resultStyle } from '../components/searchResult/style';

const useCheapTripSearch = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromKey, setFromKey] = useState(null);
  const [toKey, setToKey] = useState('');
  const [asyncFromOptions, setAsyncFromOptions] = useState([]);
  const [asyncToOptions, setAsyncToOptions] = useState([]);
  const [selectedRoutesKeys, setSelectedRoutesKeys] = useState(null);
  const [isClean, setIsClean] = useState(false);
  const [locationsKeysSorted, setLocationsKeySorted] = useState([]);
  const { filterBy, filteredRoutes } = useSelector((state) => {
    return state.cheapTripSearch;
  });
  const dispatch = useDispatch();

  const style = useMediaQuery('(max-width:650px)')
    ? resultStyle.sm
    : resultStyle.lg;

  const PAGINATION_LIMIT = 10;

  useEffect(() => {
    setLocationsKeySorted((prevState) => {
      if (!locations) return prevState;
      let temp = { ...locations };
      return Object.keys(temp).sort((a, b) => {
        return temp[a].name > temp[b].name ? 1 : -1;
      });
    });
  }, [locations]);

  const clearFromField = () => {
    setFrom('');
    setFromKey('');
  };
  const clearToField = () => {
    setTo('');
    setToKey('');
  };

  const fromOptions = locationsKeysSorted
    ? locationsKeysSorted
        .map((key) => ({
          label: locations[key].name,
          key: key,
        }))
        .sort((a, b) => {
          const aName = a.label.toUpperCase();
          const bName = b.label.toUpperCase();
          if (aName < bName) {
            return -1;
          }
          if (aName > bName) {
            return 1;
          }
          return 0;
        })
    : [];

  const toOptions = locationsKeysSorted
    ? [
        { label: 'Anywhere', key: '0' },
        ...locationsKeysSorted
          .map((key) => ({
            label: key !== '0' ? locations[key].name : '',
            key: key,
          }))
          .sort((a, b) => {
            const aName = a.label.toUpperCase();
            const bName = b.label.toUpperCase();
            if (aName < bName) {
              return -1;
            }
            if (aName > bName) {
              return 1;
            }
            return 0;
          }),
      ]
    : [];

  const cleanForm = () => {
    setFrom('');
    setTo('');
    setFromKey('');
    setToKey('');
    setSelectedRoutesKeys(null);
    setIsClean(true);
    setIsClean(true);
  };

  const getRoutes = async () => {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
    };

    return fetch(`http://localhost:3010/${fromKey}/${toKey}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => console.error(error));
  };

  const submit = async () => {
    if (to === '') {
      setTo('Anywhere');
      setToKey('0');
    }
    console.log(fromKey + ' ' + toKey);
    const routes = await getRoutes();
    const sortedRoutes = sortByPrice(routes['route_data']);
    setSelectedRoutesKeys(sortedRoutes);
  };

  useEffect(() => {
    if (selectedRoutesKeys) {
      dispatch(setFilteredRoutes(selectedRoutesKeys));
    }
  }, [selectedRoutesKeys]);


  const checkFromOption =
    asyncFromOptions.length !== 0 ? asyncFromOptions : fromOptions;
  const checkToOption =
    asyncToOptions.length !== 0 ? asyncToOptions : toOptions;

  const selectFrom = (value) => {
    setFrom(value.label);
    setFromKey(value.key);
    console.log(value);
  };

  const selectTo = (value) => {
    setTo(value.label);
    setToKey(value.key);
    console.log(value);
  };

  const sortByPrice = (arr) => {
    const allRoutes = [...arr];
    return allRoutes.sort(
      (route1, route2) => route1['euro_price'] - route2['euro_price']
    );
  };
  const cleanSearchForm = (value) => {
    console.log(`in cleanSearchForm: ${value}`);
    setIsClean(false);
  };

  return {
    from,
    selectFrom,
    selectTo,
    checkFromOption,
    to,
    checkToOption,
    cleanForm,
    submit,
    // routes,
    filteredRoutes,
    PAGINATION_LIMIT,
    sortByPrice,
    filterBy,
    clearFromField,
    clearToField,
    style,
    isClean,
    cleanSearchForm,
  };
};

export default useCheapTripSearch;
