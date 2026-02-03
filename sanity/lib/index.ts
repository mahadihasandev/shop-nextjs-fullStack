import { sanityFetch } from "./live";
import {
  BLOG_QUERY,
  BRANDS_QUERY,
  BRAND_QUERY,
  HOT_DEAL_QUERY,
  SINGLE_PRODUCT_QUERY,
} from "./query";

const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type=='category']| order(name asc) [0...$quantity]{
        ...,
        "productCount":count(*[_type=="product"&& references(^._id)])
        }`
      : `*[_type=='category']| order(name asc) {
        ...,
        "productCount":count(*[_type=="product"&& references(^.id)])
        }`;
    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return data;
  } catch (error) {
    console.log(error, "Error fetching categories");
    return [];
  }
};

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({
      query: BRAND_QUERY,
    });
    return data ?? [];
  } catch (error) {
    console.log(error, "Error fetching all brands");
    return [];
  }
};

const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({
      query: BLOG_QUERY,
    });
    return data ?? [];
  } catch (error) {
    console.log(error, "Error fetching latest blogs");
    return [];
  }
};

const getHotDeals = async () => {
  try {
    const { data } = await sanityFetch({
      query: HOT_DEAL_QUERY,
    });
    return data ?? [];
  } catch (error) {
    console.log(error, "Error fetching hot deals");
    return [];
  }
};

const getSingleProduct = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: SINGLE_PRODUCT_QUERY,
      params: { slug },
    });
    return product?.data || null;
  } catch (error) {
    console.log(error, "Error fetching product");
    return null;
  }
};

const getBrands=async(slug:string)=>{
  try {
    const brands=await sanityFetch({
      query:BRANDS_QUERY,
      params:{slug}
    })
    return brands?.data||null
  } catch (error) {
    console.log(error,"Error fetching brands")
    return null
  }
}

export {
  getCategories,
  getAllBrands,
  getLatestBlogs,
  getHotDeals,
  getSingleProduct,
  getBrands
};
