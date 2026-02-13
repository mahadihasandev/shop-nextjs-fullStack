import { type SchemaTypeDefinition } from "sanity";
import { CategoryType } from "./CategoryType";
import { AddressType } from "./AddressType";
import { AuthorType } from "./AuthorType";
import { BlockContentType } from "./BlockContentType";
import { BlogCategoryType } from "./BlogCategoryType";
import { BlogType } from "./BlogType";
import { ProductType } from "./ProductType";

import { OrderType } from "./OrderType";
import { BrandType } from "./BrandTypes";
import { BannerType } from "./Bannertype";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    CategoryType,
    AddressType,
    AuthorType,
    BlockContentType,
    BlogCategoryType,
    BlogType,
    BrandType,
    ProductType,
    BannerType,
    OrderType,
  ],
};
