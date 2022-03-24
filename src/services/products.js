import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.jsonbin.io/b/",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `623bc20ca703bb6749332016`, // temporary endpoint for JSON of products

      transformResponse: (response) =>
        response.reduce((acc, curr) => {
          acc[curr.productId] = curr;
          return acc;
        }, {}),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery } = productsApi;
