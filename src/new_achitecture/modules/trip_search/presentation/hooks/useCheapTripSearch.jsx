import { useState, useEffect } from 'react';
import locationsData from '../../data/jsons/locations.json';
import directRoutes from '../../data/jsons/direct_routes.json';
import flyingRoutes from '../../data/jsons/flying_routes.json';
import fixedRoutes from '../../data/jsons/fixed_routes.json';
import transportTypes from '../../data/jsons/transport.json';
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

  // Initialize locations state with the imported JSON data
  useEffect(() => {
    const transformedLoc = Object.entries(locationsData).map(([key, value]) => ({
      id: key,
      ...value
    }));
    setLocations(transformedLoc);
    setLocationsKeySorted(transformedLoc.sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  const clearFromField = () => {
    setFrom('');
    setFromKey(null);
  };

  const clearToField = () => {
    setTo('');
    setToKey('');
  };

  const fromOptions = locationsKeysSorted.map((loc) => ({
    label: `${loc.name}, ${loc.country_name}`,
    key: loc.id,
  }));

  const toOptions = [
    { label: 'Anywhere', key: '0' },
    ...locationsKeysSorted.map((loc) => ({
      label: `${loc.name}, ${loc.country_name}`,
      key: loc.id,
    }))
  ];

  const cleanForm = () => {
    setFrom('');
    setTo('');
    setFromKey(null);
    setToKey('');
    setSelectedRoutesKeys(null);
    dispatch(setFilteredRoutes([]));
  };

  // Helper function to normalize city name for comparison
  const normalizeCityName = (name) => {
    return name.toLowerCase().trim();
  };

  // Find location by name (partial match)
  const findLocationByName = (searchName) => {
    const normalizedSearch = normalizeCityName(searchName);
    return Object.entries(locationsData).find(([key, location]) => 
      normalizeCityName(location.name).includes(normalizedSearch)
    );
  };

  // Helper function to parse route segments with better error handling
  const parseDirectRoutes = (routeString) => {
    if (!routeString) return [];
    try {
      return routeString.split(',').map(routeId => {
        const directRoute = directRoutes[routeId];
        if (!directRoute) return null;
        return {
          ...directRoute,
          transportation_type: transportTypes[directRoute.transport || 1] || { name: 'Unknown' }
        };
      }).filter(route => route !== null);
    } catch (error) {
      console.error('Error parsing direct routes:', error);
      return [];
    }
  };

  // Updated findRoutes function to handle all route types
  const findRoutes = (fromId, toId) => {
    console.log('Searching routes from:', fromId, 'to:', toId);
    const matchingRoutes = [];

    // Helper function to process routes
    const processRoute = (route, paths) => {
      const segments = paths.map(path => ({
        from: locationsData[path.from],
        to: locationsData[path.to],
        duration_minutes: path.duration,
        euro_price: path.price,
        transportation_type: transportTypes[path.transport || 1]
      }));

      // Calculate total duration and price
      const totalDuration = segments.reduce((sum, seg) => sum + seg.duration_minutes, 0);
      const totalPrice = segments.reduce((sum, seg) => sum + seg.euro_price, 0);

      return {
        ...route,
        trip_duration: totalDuration,
        euro_price: totalPrice,
        direct_paths: segments
      };
    };

    // Process direct routes
    Object.entries(directRoutes).forEach(([key, route]) => {
      if (route.from.toString() === fromId && route.to.toString() === toId) {
        matchingRoutes.push(processRoute(route, [{...route}]));
      }
    });

    // Process flying routes
    Object.entries(flyingRoutes).forEach(([key, route]) => {
      if (route.from.toString() === fromId && route.to.toString() === toId) {
        const paths = parseDirectRoutes(route.direct_routes);
        if (paths.length > 0) {
          matchingRoutes.push(processRoute(route, paths));
        }
      }
    });

    // Process fixed routes
    Object.entries(fixedRoutes).forEach(([key, route]) => {
      if (route.from.toString() === fromId && route.to.toString() === toId) {
        const paths = parseDirectRoutes(route.direct_routes);
        if (paths.length > 0) {
          matchingRoutes.push(processRoute(route, paths));
        }
      }
    });

    console.log('Found routes:', matchingRoutes);
    return matchingRoutes.sort((a, b) => a.euro_price - b.euro_price);
  };

  const submit = () => {
    if (!from) return;

    try {
      // Find location ID by name
      const fromLocation = findLocationByName(from);
      if (!fromLocation) {
        console.error('Location not found:', from);
        dispatch(setFilteredRoutes([]));
        return;
      }

      const [fromId] = fromLocation;
      const targetToKey = toKey || '0';
      
      console.log('Searching with IDs:', fromId, targetToKey);
      const routes = findRoutes(fromId, targetToKey);
      console.log('Found routes:', routes);
      
      setSelectedRoutesKeys(routes);
      dispatch(setFilteredRoutes(routes));
    } catch (error) {
      console.error('Error finding routes:', error);
      dispatch(setFilteredRoutes([]));
    }
  };

  return {
    from,
    selectFrom: (value) => {
      console.log('Selected from:', value);
      setFrom(value.label.split(',')[0]); // Take only city name
      setFromKey(value.key);
    },
    selectTo: (value) => {
      console.log('Selected to:', value);
      setTo(value.label.split(',')[0]); // Take only city name
      setToKey(value.key);
    },
    checkFromOption: fromOptions,
    checkToOption: toOptions,
    cleanForm,
    filteredRoutes,
    style,
    submit,
    clearFromField,
    clearToField,
  };
};

export default useCheapTripSearch;
