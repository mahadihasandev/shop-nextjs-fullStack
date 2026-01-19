import { defineField, defineType } from "sanity";
import {TagIcon} from '@sanity/icons'

export const BannerType=defineType({
    name:"banner",
    title:"banner",
    type:"document",
    icon:TagIcon,
    fields:[
        defineField({
            name:"title",
            type:"string",
            validation:(Rule)=>Rule.required(),
        }),
            defineField({
            name:"description",
            type:"text",
            
        }),
            defineField({
            name:"image",
            title:"Banner Image",
            type:"image",
            options:{
                hotspot:true,
            }
            
        }),

    ],
        preview:{
        select:{
            title:"title",
            subtitle:"description",
            media:"image",
        }
    }
})