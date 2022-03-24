import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, removeFilter, filterProducts } from "store/filtersSlice";

export default function useFilters() {
  const { filteredProducts, appliedFilter, availableFilters } = useSelector(
    (state) => state?.filters
  );
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const applyFilter = (filterClass, filterLabel) => {
    dispatch(
      setFilter({
        filterClass,
        filterName: filterLabel,
      })
    );
  };

  const removeFilterFromState = (filterClass, filterLabel) => {
    dispatch(
      removeFilter({
        filterClass,
        filterName: filterLabel,
      })
    );
  };

  function updateSearchParams() {
    setSearchParams({ ...appliedFilter });
  }

  useEffect(() => {
   if(Object.keys(appliedFilter).length > 0){
     updateSearchParams();
     dispatch(filterProducts());
    }
  }, [appliedFilter]);

  return {
    applyFilter,
    filteredProducts,
    appliedFilter,
    availableFilters,
    removeFilterFromState,
  };
}
