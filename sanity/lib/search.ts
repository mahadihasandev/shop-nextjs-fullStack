import { client } from "./client";
import { PRODUCT_SEARCH_QUERY } from "./query";

export const searchProducts = async (searchParam: string) => {
  try {
    const data = await client.fetch(PRODUCT_SEARCH_QUERY, {
      searchParam: `${searchParam}*`,
    });
    return data ?? [];
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};
