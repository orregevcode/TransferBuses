import React, { useState, useEffect, useCallback, useMemo } from 'react';
import common_routes from '../../data/jsons/cheapTripData/routes.json';
import fixed_routes from '../../data/jsons/cheapTripData/fixed_routes.json';
import flying_routes from '../../data/jsons/cheapTripData/flying_routes.json';
import locations from '../../data/jsons/cheapTripData/locations.json';
import { asyncAutocomplete } from '../../domain/entites/CheapTripSearch/asyncAutocomplete';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilteredRoutes,
} from '../redux/reducers/cheapTripSearch/cheapTripSearchSlice';
import { useMediaQuery } from '@material-ui/core';
import { resultStyle } from '../components/searchResult/style';

const useCheapTripSearch = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromKey, setFromKey] = useState('');
  const [toKey, setToKey] = useState('');
  const [asyncFromOptions, setAsyncFromOptions] = useState([]);
  const [asyncToOptions, setAsyncToOptions] = useState([]);
  const [geoLocation, setGeoLocation] = useState({ latitude: 0, longitude: 0 });
  const [selectedRoutesKeys, setSelectedRoutesKeys] = useState(null);
  const [routesForRender, setRoutesForRender] = useState({});
  const { filterBy, filteredRoutes } = useSelector((state) => {
    return state.cheapTripSearch;
  });
  const dispatch = useDispatch();

  const style = useMediaQuery('(max-width:650px)')
    ? resultStyle.sm
    : resultStyle.lg;

  const PAGINATION_LIMIT = 10;
  const routes = { ...flying_routes, ...fixed_routes, ...common_routes };

  // Here the routes with a common key will merge into an array like: 89091: [{...}, {...}]
  useEffect(() => {
    const processedRoutes = {};
    for (const key in flying_routes) {
      processedRoutes[key] = [flying_routes[key]];
    }

    for (const key in fixed_routes) {
      processedRoutes[key] = processedRoutes[key] || [];
      processedRoutes[key].push(fixed_routes[key]);
    }
    for (const key in common_routes) {
      processedRoutes[key] = processedRoutes[key] || [];
      processedRoutes[key].push(common_routes[key]);
    }
    setRoutesForRender(processedRoutes);
  }, [flying_routes, common_routes, fixed_routes]);

  const locationsKeysSorted = (function () {
    if (!locations) return;
    let temp = { ...locations };
    return Object.keys(temp).sort((a, b) => {
      return temp[a].name > temp[b].name ? 1 : -1;
    });
  })();

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
  };
  const submit = () => {
    if (from === '') return;
    let routesKeys = Object.keys(routes);
    const filteredByFrom = routesKeys.filter(
      (key) => routes[key].from === +fromKey
    );
    if (to === '') {
      setTo('Anywhere');
      setToKey('0');
    } else if (to === 'Anywhere') {
      setSelectedRoutesKeys(filteredByFrom);
    } else {
      const filteredByTo = filteredByFrom.filter(
        (key) => routes[key].to === +toKey
      );
      const sortedByPrice = sortByPrice([...filteredByTo]);
      setSelectedRoutesKeys(sortedByPrice);
    }
  };

  useEffect(() => {
    if (selectedRoutesKeys) {
      dispatch(setFilteredRoutes(selectedRoutesKeys));
    }
  }, [selectedRoutesKeys]);

  // const startAsyncAutocomplete = (e, setState, options) => {
  //   // get geolocation
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     setGeoLocation({
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     });
  //   });
  //   asyncAutocomplete(e, setState, options, geoLocation);
  // };

  const checkFromOption =
    asyncFromOptions.length !== 0 ? asyncFromOptions : fromOptions;
  const checkToOption =
    asyncToOptions.length !== 0 ? asyncToOptions : toOptions;

  const selectFrom = (value) => {
    setFrom(value.label);
    setFromKey(value.key);
  };

  const selectTo = (value) => {
    setTo(value.label);
    setToKey(value.key);
  };

  const sortByPrice = (arr) => {
    const allRoutes = [].concat(...arr.map((key) => routesForRender[key]));
    return allRoutes.sort((route1, route2) => route1.price - route2.price);
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
    routes,
    filteredRoutes,
    PAGINATION_LIMIT,
    sortByPrice,
    filterBy,
    clearFromField,
    clearToField,
    style,
  };
};

export default useCheapTripSearch;
