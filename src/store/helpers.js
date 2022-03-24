const FILTER_KEYS = ["brand", "gender", "category"];
const SINGLE_SELECTABLE = ["gender"];

export function getPropertyValuesAndCount(arr) {
  const map = {};
  arr.forEach((ob) => {
    Object.entries(ob).forEach(([key, value]) => {
      if (!FILTER_KEYS.includes(key)) return;
      // variable name starts from _ indicates private property and will not be rendered
      const _isMultiSelect = !SINGLE_SELECTABLE.includes(key);
      if (map.hasOwnProperty(key)) {
        map[key] = {
          ...map[key],
          [value]: (map[key][value] || 0) + 1,
          _isMultiSelect,
        };
      } else {
        map[key] = { [value]: 1, _isMultiSelect };
      }
    });
  });
  return map;
}

export function removePrivateProperties(obj) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (key[0] === "_") delete newObj[key];
  });
  return newObj;
}
