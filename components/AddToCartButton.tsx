"use client";
import { Product, HOT_DEAL_QUERY_RESULT } from "@/sanity.types";
import { HiShoppingBag } from "react-icons/hi2";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import PriceFormatter from "./PriceFormatter";
import QuantityButton from "./QuantityButton";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {

  const{getItemCount,addItem}=useStore()
  const itemCount=getItemCount(product._id)

  const handleAddToCart = () => {
    if((product.stock as number)>itemCount){
      addItem(product)
      toast.success(`${product.name?.substring(0,15)} added to cart`)     
    }else{
      toast.error(`${product.name?.substring(0,15)} cant't add more then stock`)
    }
  };

  const outOfStock = product?.stock == 0;
  return (
    <>
    {itemCount?(
     <div className="text-sm w-full">
      <div className='flex items-center justify-between'>
        <span className="text-xs font-semibold text-darkColor/80">Quantity</span>
        <QuantityButton product={product} className=''/>
      </div>
      <div className="flex items-center justify-between border-t border-shop_light_blue/30 pt-1">
        <span className="text-xs font-semibold">Subtotal</span>
        <PriceFormatter className="" amount={product.price?product.price*itemCount:0}/>
      </div>
     </div>
    ):(
      <Button
      onClick={handleAddToCart}
      disabled={outOfStock}
      className={cn(
        "w-full bg-shop_dark_blue/80 text-shop_light_bg shadow-none border-shop_dark_blue/80 font-semibold tracking-wide hover:text-white hover:bg-shop_dark_blue hover:border-shop_dark_blue",
        className,
      )}
    >
      <HiShoppingBag />
      {outOfStock ? "Out of Stock" : "Add to Cart"}
    </Button>
    )}
    </>
  );
};

export default AddToCartButton;
