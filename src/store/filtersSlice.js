import { createSlice } from "@reduxjs/toolkit";
import { getPropertyValuesAndCount } from "./helpers";

const initialState = {
  isLoading: false,
  error: null,
  filteredProducts: [],
  appliedFilter: {},
  availableFilters: {},
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { filterClass, filterName } = action.payload;
      let filterApplied = state.appliedFilter[filterClass];
      if (!filterApplied) {
        if (isMultiSelect(state, filterClass)) {
          state.appliedFilter[filterClass] = [filterName];
        } else state.appliedFilter[filterClass] = filterName;
      } else {
        if (isMultiSelect(state, filterClass)) {
          state.appliedFilter[filterClass] = [...filterApplied, filterName];
        } else state.appliedFilter[filterClass] = filterName;
      }
    },

    removeFilter: (state, action) => {
      const { filterName, filterClass } = action.payload;
      let filterApplied = state.appliedFilter[filterClass];
      if (filterApplied && isMultiSelect(state, filterClass)) {
        state.appliedFilter[filterClass] = filterApplied.filter(
          (filter) => filter !== filterName
        );
        if (state.appliedFilter[filterClass].length === 0)
          delete state.appliedFilter[filterClass];
      } else {
        delete state.appliedFilter[filterClass];
      }
    },

    setAvailableFilters: (state, action) => {
      const processed = getPropertyValuesAndCount(action.payload);
      state.availableFilters = processed;
    },
  },
});

function isMultiSelect(state, filterClass) {
  return state.availableFilters[filterClass]._isMultiSelect;
}

export const { setFilter, removeFilter, setAvailableFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
