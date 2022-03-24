import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  allProducts: [],
  filteredProducts: [],
  appliedFilter: {},
  availableFilters: {
    category: {
      isMultiSelect: true,
      value: [],
    },
    gender: {
      isMultiSelect: false,
      value: null,
    },
    brands: {
      isMultiSelect: true,
      value: [],
    },
  },
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
  },
});

function isMultiSelect(state, filterName) {
  return state.availableFilters[filterName].isMultiSelect;
}

export const { setFilter, removeFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
