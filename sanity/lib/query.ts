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
      ...,product->
    }
  }`);

  const ALL_BLOG_QUERY=defineQuery(`*[_type == "blog"]| order(name asc)[0...$quantity]{
  ...,blogcategories[]->{title}
}`);

const SINGLE_BLOG_QUERY=defineQuery(`*[_type == "blog" && slug.current==$slug]| order(name asc) [0]{
  ...,
  author->{
    title,
    name,
    image,
  },
  blogcategories[]->{
   
    title,
    "slug":slug.current,
  },
  
  
}`)

const BLOG_CATEGORIES = defineQuery(
  `*[_type == "blog"]{
     blogcategories[]->{
    ...
    }
  }`
);

const OTHERS_BLOG_QUERY = defineQuery(`*[
  _type == "blog"
  && defined(slug.current)
  && slug.current != $slug
]|order(publishedAt desc)[0...$quantity]{
...
  publishedAt,
  title,
  mainImage,
  slug,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
  }`);




export {
  BLOG_QUERY,
  BRAND_QUERY,
  HOT_DEAL_QUERY,
  SINGLE_PRODUCT_QUERY,
  BRANDS_QUERY,
  ORDER_QUERY,
  ALL_BLOG_QUERY,
  SINGLE_BLOG_QUERY,
  BLOG_CATEGORIES,
  OTHERS_BLOG_QUERY,
};
