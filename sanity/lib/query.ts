import { defineQuery } from "next-sanity";

const BRAND_QUERY = defineQuery(`*[_type == "brand"]|order(name asc)`)
export { BRAND_QUERY };