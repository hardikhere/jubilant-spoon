import { useSelector } from "react-redux";
import FilterBox from "./FilterBox";

export default function Filters() {
  const filters = useSelector((state) => state?.filters);
  const { availableFilters } = filters;
  return (
    <div>
      {Object.entries(availableFilters).map(([key, value]) => {
        const { _isMultiSelect, ...rest } = value;
        return (
          <FilterBox
            isMultiSelect={_isMultiSelect}
            filterName={key}
            options={rest}
          />
        );
      })}
    </div>
  );
}
