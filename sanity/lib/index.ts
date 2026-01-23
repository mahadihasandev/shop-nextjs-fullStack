
import { sanityFetch } from "./live";

const getCategories=async(quantity?:number)=>{
    try {
        const query=quantity
        ?`*[_type=='category']| order(name asc) [0...$quantity]{
        ...,
        "productCount":count(*[_type=="product"&& references(^.id)])
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

export {getCategories}