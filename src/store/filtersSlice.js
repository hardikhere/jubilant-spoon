import { createSlice } from "@reduxjs/toolkit";
import { getPropertyValuesAndCount } from "./helpers";

const initialState = {
  isLoading: false,
  error: null,
  filteredProducts: [],
  allProducts: [],
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

    filterProducts: (state, action) => {
      let { appliedFilter, allProducts } = state;
      if (Object.keys(appliedFilter).length === 0) {
        state.filteredProducts = allProducts;
        return;
      }
      state.filteredProducts = [];
      for (const [key, value] of Object.entries(appliedFilter)) {
        if (Array.isArray(value)) {
          value.forEach((filterName) => {
            state.filteredProducts.push(
              ...allProducts.filter((product) => product[key] === filterName)
            );
          });
        } else {
          state.filteredProducts.push(
            ...allProducts.filter((product) => product[key] === value)
          );
        }
      }
    },

    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
      state.filteredProducts = action.payload;
    },
  },
});

function isMultiSelect(state, filterClass) {
  return state.availableFilters[filterClass]._isMultiSelect;
}

export const {
  setFilter,
  removeFilter,
  setAvailableFilters,
  setAllProducts,
  filterProducts,
} = filtersSlice.actions;
export default filtersSlice.reducer;
