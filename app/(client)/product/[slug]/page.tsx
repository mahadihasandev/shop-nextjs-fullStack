import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import { getSingleProduct } from "@/sanity/lib";
import NotFoundPage from "../../Not-found";
import { HiMiniStar } from "react-icons/hi2";
import PriceView from "@/components/PriceView";
import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import { BsTruck } from "react-icons/bs";
import ProductDescription from "@/components/ProductDescription";
import { CornerDownLeft } from "lucide-react";

import { PortableText } from "next-sanity";
import AddToWishListButton from "@/components/AddToWishListButton";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getSingleProduct(slug);
  if (!product) {
    return NotFoundPage();
  }

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-10 pb-10">
        <div className="w-full md:w-1/2 pt-10">
          {product?.images && (
            <ImageView images={product?.images} isStock={product?.stock} />
          )}
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="space-y-1 pt-10">
            <h2 className="text-2xl font-bold font-poppins">{product?.name}</h2>
            <div className="text-normal text-gray-600 font-poppins tracking-wide font-normal">
              {product?.keyfeature && (
                <PortableText value={product.keyfeature} />
              )}
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <HiMiniStar
                  key={index}
                  size={15}
                  className={
                    index < 4 ? "text-shop_light_blue" : "text-shop_light_text"
                  }
                  fill={index < 4 ? "#53aaff" : "#ababab"}
                />
              ))}
              <p className="text-sm text-gray-600 font-poppins tracking-wide font-bold">
                {`(45 reviews)`}{" "}
              </p>
            </div>
          </div>
          <div className="space-y-2 border-t border-b border-gray-200 py-5">
            <PriceView
              price={product?.price}
              discount={product?.discount}
              className="text-lg font-bold"
            />
            <p
              className={`inline-block px-4 py-1.5 text-sm text-center font-poppins rounded-lg 
          tracking-wide font-semibold 
          ${product?.stock == 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
            >
              {`${(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}`}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2.5 lg:gap-3 px-5">
            <AddToCartButton className="" product={product} />
            <AddToWishListButton product={product} className="" />
          </div>

          <ProductCharacteristics product={product} />
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
            <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
              <RxBorderSplit className="text-lg" />
              <p>Compare color</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
              <FaRegQuestionCircle className="text-lg" />
              <p>Ask a question</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
              <TbTruckDelivery className="text-lg" />
              <p>Delivery & Return</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
              <FiShare2 className="text-lg" />
              <p>Share</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border border-lightColor/25 border-b-0 p-3 flex items-center gap-2.5">
              <BsTruck size={30} className="text-shop_orange" />
              <div>
                <p className="text-base font-semibold text-black">
                  Free Delivery
                </p>
                <p className="text-sm text-gray-500 underline underline-offset-2">
                  Enter your Postal code for Delivey Availability.
                </p>
              </div>
            </div>
            <div className="border border-lightColor/25 p-3 flex items-center gap-2.5">
              <CornerDownLeft size={30} className="text-shop_orange" />
              <div>
                <p className="text-base font-semibold text-black">
                  Return Delivery
                </p>
                <p className="text-sm text-gray-500 ">
                  Free 30days Delivery Returns.{" "}
                  <span className="underline underline-offset-2">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductDescription product={product} />
    </Container>
  );
};

export default SingleProductPage;
