import { useEffect, useMemo } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import ProductTile from "components/ProductTile";
import { useGetAllProductsQuery } from "services/products";
import { getPropertyValuesAndCount } from "store/helpers";
import { useDispatch } from "react-redux";
import { setAvailableFilters } from "store/filtersSlice";
import Filters from "./Filters";

export default function ProductListing() {
  const dispatch = useDispatch();
  const { isLoading, data: allProducts } = useGetAllProductsQuery();
  const productsArr = useMemo(
    () => Object.values(allProducts || {}),
    [allProducts]
  );

  useEffect(() => {
    if (productsArr.length > 0) dispatch(setAvailableFilters(productsArr));
  }, [productsArr, dispatch]);

  console.log(getPropertyValuesAndCount(productsArr));
  if (isLoading) return <LoadingIndicator />;
  return (
    <div className="flex m-6">
      {/* filters area */}
      <div className="w-1/5 h-20">
        <Filters />
      </div>

      {/* Products Listing area */}
      <div className="w-4/5 h-20  flex flex-wrap justify-center">
        {productsArr?.map((product) => (
          <ProductTile key={product.productId} {...product} />
        ))}
      </div>
    </div>
  );
}
