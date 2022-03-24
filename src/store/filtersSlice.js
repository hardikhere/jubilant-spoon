import { createSlice } from "@reduxjs/toolkit";
import { getPropertyValuesAndCount } from "./helpers";

const initialState = {
  isLoading: false,
  error: null,
  allProducts: [],
  filteredProducts: [],
  appliedFilter: {},
  availableFilters: {},
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const filterName = action.payload.filterName;
      let filterApplied = state.appliedFilter[filterName];
      if (isMultiSelect(state, filterName)) {
        filterApplied.push(action.payload.value);
      } else filterApplied = action.payload.value;
    },

    removeFilter: (state, action) => {
      const filterName = action.payload.filterName;
      let filterApplied = state.appliedFilter[filterName];
      if (isMultiSelect(state, filterName)) {
        state.appliedFilter[filterName] = filterApplied.filter(
          (filter) => filter !== action.payload.value
        );
      } else {
        delete state.appliedFilter[filterName];
      }
    },

    setAvailableFilters: (state, action) => {
      const processed = getPropertyValuesAndCount(action.payload);
      state.availableFilters = processed;
    },
  },
});

function isMultiSelect(state, filterName) {
  return state.availableFilters[filterName]._isMultiSelect;
}

export const { setFilter, removeFilter, setAvailableFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
