import { useDispatch, useSelector } from "react-redux";
import { setFilter, removeFilter } from "store/filtersSlice";

export default function useFilters() {
  const { filteredProducts, appliedFilter, availableFilters } = useSelector(
    (state) => state?.filters
  );
  const dispatch = useDispatch();
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

  return {
    applyFilter,
    filteredProducts,
    appliedFilter,
    availableFilters,
    removeFilterFromState,
  };
}
