import { useContext, useEffect } from "react";
import { Store } from "context/StoreProvider";
import { actionTypes } from "utils/consts";
import { useSearchParams } from "react-router-dom";
import getAllProducts from "services/getAllProducts";

export default function useFilteredProducts() {
  const [store, dispatch] = useContext(Store);
  const { allProducts, appliedFilter, isLoading } = store;
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!store.isProductsLoaded) {
      dispatch({ type: actionTypes.GET_ALL_PRODUCTS });
      getAllProducts().then((res) => {
        console.log(
          "\n\n🚀 ~ file: useFilteredProducts.js ~ line 16 ~ getAllProducts ~ res",
          res
        );
        const { data, err } = res;
        dispatch({ type: actionTypes.SET_ALL_PRODUCTS, payload: data });
      });
    }
  }, []);

  useEffect(() => {
    updateURL();
  }, [store.appliedFilter]);

  function updateURL() {
    console.log(searchParams[0].toString());
  }

  const applyFilter = (filterName, value) => {
    dispatch({
      type: actionTypes.SET_FILTER,
      payload: { filter: filterName, value },
    });
  };

  return {
    allProducts,
    appliedFilter,
    applyFilter,
    isLoading
  };
}
