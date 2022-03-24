import Checkbox from "components/Checkbox";
import useFilters from "hooks/useFilters";
import { useMemo, useState } from "react";

const MAX_TO_SHOW = 8;
export default function FilterBox(props) {
  const { filterName, options, isMultiSelect } = props;
  const { applyFilter, removeFilterFromState, appliedFilter } = useFilters();
  const [shouldShowAll, setShouldShowAll] = useState(false);
  const optionsArr = useMemo(() => getProcessedOptions(options), [options]);
  const [topToShow, setTopToShow] = useState(optionsArr?.slice(0, MAX_TO_SHOW));
  const restToShow = optionsArr?.slice(MAX_TO_SHOW);

  function handleShowMore() {
    setShouldShowAll(true);
    setTopToShow(topToShow.concat(restToShow));
  }

  function handleCheckboxClick(event) {
    if (event.target.checked) applyFilter(filterName, event.target.id);
    else removeFilterFromState(filterName, event.target.id);
  }
  return (
    <div className="m-3 border-t-4 border-slate-200">
      <h1 className="text-lg font-bold mb-3">{filterName}</h1>

      {topToShow?.map((option) => {
        return (
          <div className="flex" key={option.label}>
            <Checkbox
              isMultiSelect={isMultiSelect}
              filterClass={filterName}
              defaultChecked={appliedFilter[filterName]?.includes(option.label)}
              label={option.label}
              id={option.label}
              onClick={handleCheckboxClick}
            />
            <span className="pl-1 text-slate-400 text-sm">
              ({option.count})
            </span>
          </div>
        );
      })}

      {!shouldShowAll && restToShow?.length > 0 && (
        <p className="text-rose-400 cursor-pointer" onClick={handleShowMore}>
          + {restToShow?.length} more
        </p>
      )}
    </div>
  );
}

function getProcessedOptions(options) {
  const processed = [];
  Object.entries(options).forEach(([key, value]) => {
    processed.push({
      label: key,
      count: value,
    });
  });
  return processed;
}
