import { useSelector } from "react-redux";
import FilterBox from "./FilterBox";

export default function Filters() {
  const filters = useSelector((state) => state?.filters);
  console.log(
    "\n\n🚀 ~ file: Filters.js ~ line 6 ~ Filters ~ filters",
    filters
  );
  const { availableFilters } = filters;
  return (
    <div>
      {Object.entries(availableFilters).map(([key, value]) => {
        const { _isMultiSelect, ...rest } = value;
        return <FilterBox _isMultiSelect filterName={key} options={rest} />;
      })}
    </div>
  );
}
