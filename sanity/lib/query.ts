import { defineQuery } from "next-sanity";

const BRAND_QUERY = defineQuery(`*[_type == "brand"]|order(name asc)`)
export { BRAND_QUERY };

const BLOG_QUERY=defineQuery(`*[_type == "blog"&& isLatest==true]| order(name asc){
  ...,blogcategories[]->{title}
}`)
export {BLOG_QUERY}