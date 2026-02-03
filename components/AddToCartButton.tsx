"use client";
import { Product, HOT_DEAL_QUERY_RESULT } from "@/sanity.types";
import { HiShoppingBag } from "react-icons/hi2";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
interface Props {
  product: Product | HOT_DEAL_QUERY_RESULT[number] | null | undefined;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const handleAddToCart = () => {
    alert("button");
  };

  const outOfStock = product?.stock == 0;
  return (
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
  );
};

export default AddToCartButton;
