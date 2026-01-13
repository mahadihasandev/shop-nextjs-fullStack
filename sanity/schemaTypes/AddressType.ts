import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const AddressType=defineType({
    name:"address",
    title:"address",
    type:"document",
    icon:HomeIcon,
    fields:[
        defineField({
            name:"name",
            title:"Address Name",
            type:"string",
            description:"Select a address type (e.g. Home or Work)",
            validation:(Rule)=>Rule.required().max(50),
        }),
        defineField({
            name:"email",
            title:"email",
            type:"string",
            
        }),
        defineField({
            name:"address",
            title:"Street Address",
            type:"string",
            description:"Select a valid address including Street name & number ",
            validation:(Rule)=>Rule.required().min(5).max(100),
        }),
            defineField({
                name: "city",
                title: "City",
                type: "string",
                validation: (Rule) => Rule.required(),
            }),
            defineField({
                name: "District",
                title: "District",
                type: "string",
                description: "District name (e.g. Dhaka, Gazipur)",
                validation: (Rule) => Rule.required().min(5).max(50),
            }),

    defineField({
      name: "zip",
      title: "ZIP Code",
      type: "string",
      description: "Format: 12345 or 12345-6789",
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d{4}(-\d{4})?$/, {
            name: "zipCode",
            invert: false,
          })
          .custom((zip: string | undefined) => {
            if (!zip) {
              return "ZIP code is required";
            }
            if (!zip.match(/^\d{4}(-\d{4})?$/)) {
              return "Please enter a valid ZIP code (e.g. 12345 or 12345-6789)";
            }
            return true;
          }),
    }),

        defineField({
      name: "default",
      title: "Default Address",
      type: "boolean",
      description: "Is this the default shipping address?",
      initialValue: false,
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    ],
    preview:{
        select:{
        title:"name",
        subtitle: "address",
        city: "city",
        state: "state",
        isDefault: "default",
        },
        prepare({title,subtitle,city,state,isDefault}){
        return {
        title: `${title} ${isDefault ? "(Default)" : ""}`,
        subtitle: `${subtitle}, ${city}, ${state}`,
      };
    }
    }
})