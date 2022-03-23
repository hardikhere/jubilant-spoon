import { useContext, useEffect } from "react";
import { Store } from "context/StoreProvider";
import { actionTypes } from "utils/consts";
import { useSearchParams } from "react-router-dom";

export default function useFilteredProducts() {
  const [store, dispatch] = useContext(Store);
  const { allProducts, appliedFilter } = store;
  const searchParams = useSearchParams();

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
  };
}
