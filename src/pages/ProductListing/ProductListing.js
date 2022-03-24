import { useEffect, useMemo } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import ProductTile from "components/ProductTile";
import { useGetAllProductsQuery } from "services/products";
import { getPropertyValuesAndCount } from "store/helpers";
import { useDispatch } from "react-redux";
import {
  setAllProducts,
  setAvailableFilters,
  setFilter,
} from "store/filtersSlice";
import Filters from "./Filters";
import { useSearchParams } from "react-router-dom";
import useFilters from "hooks/useFilters";

export default function ProductListing() {
  const dispatch = useDispatch();
  const { availableFilters, filteredProducts } = useFilters();
  const [searchParams] = useSearchParams();
  const { isLoading, data: allProducts } = useGetAllProductsQuery();
  const productsArr = useMemo(
    () => Object.values(allProducts || {}),
    [allProducts]
  );

  function getStateFromURL() {
    searchParams.forEach((value, key) => {
      dispatch(setFilter({ filterClass: key, filterName: value }));
    });
  }

  useEffect(() => {
    if (productsArr.length > 0) {
      dispatch(setAvailableFilters(productsArr));
      dispatch(setAllProducts(productsArr));
    }
  }, [productsArr, dispatch]);

  useEffect(() => {
    if (Object.keys(availableFilters).length > 0) getStateFromURL();
  }, [availableFilters]);

  if (isLoading)
    return (
      <div className="absolute bg-white-500  flex items-center inset-0 justify-center">
        <LoadingIndicator />
      </div>
    );

  return (
    <div className="flex m-6">
      {/* filters area */}
      <div className="w-1/5 h-20">
        <Filters />
      </div>

      {/* Products Listing area */}
      <div className="w-4/5 h-20  flex flex-wrap justify-center">
        {filteredProducts?.map((product) => (
          <ProductTile key={product.productId} {...product} />
        ))}
      </div>
    </div>
  );
}
