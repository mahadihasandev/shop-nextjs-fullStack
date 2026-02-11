import { defineQuery } from "next-sanity";

const BRAND_QUERY = defineQuery(`*[_type == "brand"]|order(name asc)`);

const BLOG_QUERY =
  defineQuery(`*[_type == "blog"&& isLatest==true]| order(name asc){
  ...,blogcategories[]->{title}
}`);

const HOT_DEAL_QUERY =
  defineQuery(`*[_type == "product"&& status=="hot"]| order(name asc){
  ...,"categories":categories[]->title
}`);

const SINGLE_PRODUCT_QUERY = defineQuery(
  `*[_type == "product" && slug.current==$slug]| order(name asc) [0]`,
);

const BRANDS_QUERY = defineQuery(`*[_type=='product' && slug.current==$slug]{
  "brandName":brand->title
}`);

const ORDER_QUERY =
  defineQuery(`*[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
    ...,products[]{
      ...,product->{
        name,price,images
      }
    }
  }`);

export {
  BLOG_QUERY,
  BRAND_QUERY,
  HOT_DEAL_QUERY,
  SINGLE_PRODUCT_QUERY,
  BRANDS_QUERY,
  ORDER_QUERY,
};
