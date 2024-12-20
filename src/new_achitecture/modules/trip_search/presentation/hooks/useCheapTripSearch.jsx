import { useState, useEffect } from 'react';
import locationsData from '../../data/jsons/locations.json'; // Import your local JSON file
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredRoutes } from '../redux/reducers/cheapTripSearch/cheapTripSearchSlice';
import { useMediaQuery } from '@material-ui/core';
import { resultStyle } from '../components/searchResult/style';

const useCheapTripSearch = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromKey, setFromKey] = useState(null);
  const [toKey, setToKey] = useState('');
  const [selectedRoutesKeys, setSelectedRoutesKeys] = useState(null);
  const [locations, setLocations] = useState([]);
  const [locationsKeysSorted, setLocationsKeySorted] = useState([]);
  const { filteredRoutes } = useSelector((state) => state.cheapTripSearch);
  const dispatch = useDispatch();

  const style = useMediaQuery('(max-width:650px)') ? resultStyle.sm : resultStyle.lg;

  // Transform local JSON data into a more usable format
  const transformLocations = (locData) => {
    return Object.keys(locData).map((key) => ({
      name: locData[key]?.name || 'Unnamed Location', // Provide default values if data is missing
      latitude: locData[key]?.latitude || null,
      longitude: locData[key]?.longitude || null,
      country_name: locData[key]?.country_name || 'Unknown',
      id: key,
    }));
  };

  // Initialize locations state with the imported JSON data
  useEffect(() => {
    if (locationsData) {
      const transformedLoc = transformLocations(locationsData);
      setLocations(transformedLoc);
      setLocationsKeySorted(transformedLoc.sort((a, b) => a.name.localeCompare(b.name)));
    }
  }, []); // This will only run once when the component is mounted

  const clearFromField = () => {
    setFrom('');
    setFromKey(null);
  };

  const clearToField = () => {
    setTo('');
    setToKey('');
  };

  const fromOptions = locationsKeysSorted
    ? locationsKeysSorted
        .map((loc) => ({
          label: loc.name,
          key: loc.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
    : [];

  const toOptions = locationsKeysSorted
    ? [
        { label: 'Anywhere', key: '0' },
        ...locationsKeysSorted
          .map((loc) => ({
            label: loc.name,
            key: loc.id,
          }))
          .sort((a, b) => a.label.localeCompare(b.label)),
      ]
    : [];

  // Log locations to ensure they are loaded correctly
  useEffect(() => {
    console.log('Locations:', locations);
    if (locations && locations.length > 0) {
      console.log('From Options:', fromOptions);
      console.log('To Options:', toOptions);
    }
  }, [locations, locationsKeysSorted]);

  const cleanForm = () => {
    setFrom('');
    setTo('');
    setFromKey(null);
    setToKey('');
    setSelectedRoutesKeys(null);
  };

  // Sort routes by price (mocking it here)
  const sortByPrice = (arr) => {
    return arr.sort((route1, route2) => route1['euro_price'] - route2['euro_price']);
  };

  // Submit function to get routes based on the selected "from" and "to"
  const submit = async () => {
    // Default "to" to 'Anywhere' if not set
    if (to === '') {
      setTo('Anywhere');
      setToKey('0');
    }

    // Mock route fetching (replace with actual API call)
    const routes = await getRoutesLocal();
    const sortedRoutes = sortByPrice(routes);
    setSelectedRoutesKeys(sortedRoutes);
  };

  useEffect(() => {
    if (selectedRoutesKeys) {
      dispatch(setFilteredRoutes(selectedRoutesKeys));
    }
  }, [selectedRoutesKeys, dispatch]);

  const getRoutesLocal = async () => {
    // This function should fetch the routes based on "from" and "to"
    // Use your own API logic here
    return [
      { euro_price: 100, route: 'Route 1' },
      { euro_price: 150, route: 'Route 2' },
      { euro_price: 90, route: 'Route 3' },
    ]; // Mock response
  };

  return {
    from,
    selectFrom: (value) => { setFrom(value.label); setFromKey(value.key); },
    selectTo: (value) => { setTo(value.label); setToKey(value.key); },
    checkFromOption: fromOptions,
    checkToOption: toOptions,
    cleanForm,
    filteredRoutes,
    style,
    submit,
  };
};

export default useCheapTripSearch;
