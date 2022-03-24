export default function Checkbox({
  filterClass,
  label,
  id,
  isMultiSelect,
  ...rest
}) {
  return (
    <div className="flex relative cursor-pointer">
      <input
        id={id}
        name={!isMultiSelect ? filterClass : undefined}
        type={isMultiSelect ? "checkbox" : "radio"}
        className="absolute inset-0 w-100 form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        {...rest}
      />
      <label
        className="pl-8 form-check-label inline-block text-gray-800"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
