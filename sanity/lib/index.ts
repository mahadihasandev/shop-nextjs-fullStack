
import { sanityFetch } from "./live";
import { BLOG_QUERY, BRAND_QUERY, HOT_DEAL_QUERY } from "./query";

const getCategories=async(quantity?:number)=>{
    try {
        const query=quantity
        ?`*[_type=='category']| order(name asc) [0...$quantity]{
        ...,
        "productCount":count(*[_type=="product"&& references(^._id)])
        }`
        :`*[_type=='category']| order(name asc) {
        ...,
        "productCount":count(*[_type=="product"&& references(^.id)])
        }`;
        const {data}=await sanityFetch({
            query,
            params:quantity?{quantity}:{},
        })
        return data;
    } catch (error) {
        console.log(error,"Error fetching categories");
        return []
        
    }

}

const getAllBrands=async()=>{
    try {
        const {data}=await sanityFetch({
            query:BRAND_QUERY
        })
        return data ?? [];
        
    } catch (error) {
       console.log(error,"Error fetching categories");
        return [] 
    }
}

const getLatestBlogs=async()=>{
    try {
        const {data}=await sanityFetch({
            query:BLOG_QUERY
        })
        return data ?? [];
        
    } catch (error) {
       console.log(error,"Error fetching categories");
        return [] 
    }
}

const getHotDeals=async()=>{
    try {
        const {data}=await sanityFetch({
            query:HOT_DEAL_QUERY
        })
        return data ?? [];
        
    } catch (error) {
       console.log(error,"Error fetching categories");
        return [] 
    }
}

export {getCategories,getAllBrands,getLatestBlogs,getHotDeals}