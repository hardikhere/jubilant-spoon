import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filtersReducer from "store/filtersSlice";
import { productsApi } from "services/products";

export const store = configureStore({
  reducer: combineReducers({
    [productsApi.reducerPath]: productsApi.reducer,
    filters: filtersReducer,
  }),
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
