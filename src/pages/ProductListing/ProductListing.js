import { useMemo } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import ProductTile from "components/ProductTile";
import { useGetAllProductsQuery } from "services/products";

export default function ProductListing() {
  const { isLoading, data: allProducts } = useGetAllProductsQuery();
  const productsArr = useMemo(
    () => Object.values(allProducts || {}),
    [allProducts]
  );
  if (isLoading) return <LoadingIndicator />;
  return (
    <div className="flex m-6">
      {/* filters area */}
      <div className="w-1/5 h-20 bg-blue-300"></div>

      {/* Products Listing area */}
      <div className="w-4/5 h-20 bg-red-300 flex flex-wrap justify-center">
        {productsArr?.map((product) => (
          <ProductTile key={product.productId} {...product} />
        ))}
      </div>
    </div>
  );
}
