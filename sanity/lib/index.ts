import { sanityFetch } from "./live";
import {
  ALL_BLOG_QUERY,
  BLOG_CATEGORIES,
  BLOG_QUERY,
  BRANDS_QUERY,
  BRAND_QUERY,
  HOT_DEAL_QUERY,
  ORDER_QUERY,
  OTHERS_BLOG_QUERY,
  SINGLE_BLOG_QUERY,
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

const getOrder=async(userId:string)=>{
  try {
    const order=await sanityFetch({
      query:ORDER_QUERY,
      params:{userId},
    })
    return order?.data||null
  } catch (error) {
    console.log(error,"Error fetching order")
    return null
  }
}

const getAllBlogs=async(quantity:number)=>{
  try {
    const blogs=await sanityFetch({
      query:ALL_BLOG_QUERY,
      params:{quantity}
    })
    return blogs?.data||null
  } catch (error) {
    console.log(error,"Error fetching blogs")
    return null
  }
}

const getSingleBlog=async(slug:string)=>{
  try {
    const blog=await sanityFetch({
      query:SINGLE_BLOG_QUERY,
      params:{slug}
    })
    return blog?.data||null
  } catch (error) {
    console.log(error,"Error fetching blog")
    return null
  }
}

const getBlogCategories = async () => {
  try {
    const { data } = await sanityFetch({
      query: BLOG_CATEGORIES,
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getOthersBlog = async (slug: string, quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: OTHERS_BLOG_QUERY,
      params: { slug, quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};
export {
  getCategories,
  getAllBrands,
  getLatestBlogs,
  getHotDeals,
  getSingleProduct,
  getBrands,
  getOrder,
  getAllBlogs,
  getSingleBlog,
  getBlogCategories,
  getOthersBlog,
};
