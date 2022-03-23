import { produce } from "immer";
import React, { useReducer } from "react";
import { actionTypes } from "utils/consts";

export const Store = React.createContext();
Store.displayName = "Store";

export const StoreProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer(
    immutableFilterReducer,
    initialState
  );

  return (
    <Store.Provider value={[globalState, dispatch]}>{children}</Store.Provider>
  );
};

function filtersReducer(draftState = initialState, action) {
  const isMultiSelect =
    draftState.availableFilters[action.payload.filter].isMultiSelect;
  let filterApplied = draftState.appliedFilter[action.payload.filter];
  switch (action.type) {
    case actionTypes.SET_FILTER: {
      if (isMultiSelect) {
        filterApplied.push(action.payload.value);
      } else filterApplied = action.payload.value;
      break;
    }

    case actionTypes.REMOVE_FILTER: {
      if (isMultiSelect) {
        filterApplied = filterApplied.filter((val) => {
          return val.productId !== action.payload.value;
        });
      } else filterApplied = null;
      break;
    }

    default:
      return draftState;
  }
}

const immutableFilterReducer = produce((draftState, action) => {
  filtersReducer(draftState, action);
});

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
