"use client";
import { Category, Product } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import NoProductAvailable from "./NoProductAvailable";
import { TbLoader3 } from "react-icons/tb";
interface Props {
  categories: Category[];
  slugs: string;
}

const CategoryProduct = ({ categories, slugs }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slugs);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchProducts = async (categorySlug:string) => {
    try {
      const quarry = `*[_type == "product" && references(*[_type=="category" && slug.current==$categorySlug]._id)]| order(name asc){
  ...,"categories":categories[]->title
}`;
      setLoading(true);
      const response = await client.fetch(quarry, { categorySlug });
      setProducts(response);
    } catch (error) {
      console.error(error, "Error Fetching Products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug == currentSlug) return;

    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };

  useEffect(()=>{
    fetchProducts(currentSlug);
  },[router])

  return (
    <div className="py-5 flex flex-col gap-5 items-start md:flex-row">
      <div className="flex flex-col md:min-w-40 border hoverEffect rounded-md">
        {categories.map((category) => (
          <Button
            key={category?._id}
            onClick={() =>
              handleCategoryChange(category?.slug?.current as string)
            }
            className={`bg-transparent border-0 p-0 text-darkColor 
         hover:bg-shop_light_blue shadow-md rounded-md hover:text-white hover:scale-110 hover:rounded-md font-semibold 
        hoverEffect border-b last:border-b-0 capitalize ${category?.slug?.current == currentSlug && "bg-shop_light_blue text-white"}`}
          >
            <p className="w-full text-left px-2">{category.title}</p>
          </Button>
        ))}
      </div>
     
        <div className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center 
            py-10 min-h-120 space-y-4 text-center bg-gray-100 w-full 
            rounded-lg">
              <div className="space-x-2 flex items-center text-blue-600">
                 <TbLoader3 className='w-20 h-9 animate-spin text-shop_light_blue'/>
                <span>Product is Loading...</span>
              </div>
            </div>
          ) : products?.length>0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {products?.map((item:Product) => (
                <AnimatePresence key={item?._id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <div>
                      <ProductCard product={item} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          ) : (
            <>
              <NoProductAvailable selectedTab={currentSlug} className="mt-0 w-full min-h-120" />
            </>
          )}
        </div>
      
    </div>
  );
};

export default CategoryProduct;
