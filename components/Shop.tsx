"use client";
import { Brand, Category, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Title } from "./ui/text";
import CategoryList from "./Shop/CategoryList";
import BrandList from "./Shop/BrandList";
import PriceList from "./Shop/PriceList";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import ProductCard from "./ProductCard";
import { TbLoader3 } from "react-icons/tb";
import { AnimatePresence, motion } from "motion/react";
import NoProductAvailable from "./NoProductAvailable";

interface Props {
  categories: Category[];
  brands: Brand[];
}
const Shop = ({ categories, brands }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const brandParams = searchParams.get('brand');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(brandParams||null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  
  const fetchProduct = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 100000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        console.log(min, max, "min max");

        minPrice = min;
        maxPrice = max;
      }
      const query = `*[_type=='product'&&(!defined($selectedCategory)||references(*[_type==
      'category'&&slug.current==$selectedCategory][0]._id))&&(!defined($selectedBrand)||references(*[_type==
      'brand'&&slug.current==$selectedBrand][0]._id))&&price >= $minPrice&&price <= $maxPrice]|order(name asc){
      ...,"categories":categories[]->title
      }`;
      const result = await client.fetch(
        query,
        {
          selectedCategory,
          selectedBrand,
          minPrice,
          maxPrice,
        },
        { next: { revalidate: 0 } },
      );
      setProducts(result);
    } catch (error) {
      console.log(error, "Fetching product error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [selectedCategory, selectedBrand, selectedPrice]);
  return (
    <div className="">
      <Container>
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between my-1 ">
            <Title
              className="text-base! text-shop_dark_blue/80 uppercase tracking-wide font-sans
         rounded-md px-3 py-2 shadow shadow-shop_light_blue/40"
            >
              Select any thing you want
            </Title>

            {(selectedCategory !== null ||
              selectedBrand !== null ||
              selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-shop_dark_blue/80 text-sm 
        font-semibold border border-shop_light_blue/30 hover:scale-105 
        hover:text-red-600 shadow hoverEffect shadow-shop_light_blue/40 
        hover:shadow-red-600/40 hover:border-red-600/40 rounded-md px-10 py-3"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row rounded-md gap-2 shadow-[0px_0px_6px_-2px_#1E90FF]">
          <div
            className="md:sticky md:top-20 md:self-start shadow-[3px_1px_6px_-4px_#1E90FF] rounded-md
          md:h-[calc(100vh-160px)] md:overflow-y-scroll scrollbar-hide md:min-w-64 pb-5"
          >
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </div>

          <div className="py-5 flex-1 ">
            <div className="h-calc(100vh-160px) ">
            {loading ? (
              <div className="flex flex-col items-center justify-center 
            py-10 min-h-120 space-y-4 text-center bg-gray-100 w-full
            rounded-lg"
              >
                <div className="space-x-2 flex items-center text-blue-600 ">
                  <TbLoader3 className="w-20 h-9 animate-spin text-shop_light_blue" />
                  <span>Product is Loading...</span>
                </div>
              </div>
            ) : (
              products?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {products?.map((item: Product) => (
                    <AnimatePresence key={item?._id}>
                      <motion.div
                        layout
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                      >
                        <div>
                          <ProductCard className="scale-100 hover:scale-103" product={item} />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  ))}
                </div>
              )
            )}
          </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
