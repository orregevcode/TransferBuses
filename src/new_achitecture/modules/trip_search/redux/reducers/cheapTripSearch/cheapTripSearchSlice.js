import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredRoutes: [],
};

const cheapTripSearchSlice = createSlice({
  name: 'cheapTripSearch',
  initialState,
  reducers: {
    setFilteredRoutes: (state, action) => {
      state.filteredRoutes = action.payload || [];
    },
  },
});

export const { setFilteredRoutes } = cheapTripSearchSlice.actions;
export default cheapTripSearchSlice.reducer; 