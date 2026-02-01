import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import { getSingleProduct } from "@/sanity/lib";
import NotFoundPage from "../../Not-found";
import { HiMiniStar } from "react-icons/hi2";
import PriceView from "@/components/PriceView";
import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";

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
  
  console.log(product);
  return (
    <Container className="flex flex-col md:flex-row gap-10 pb-10">
      <div className="w-full md:w-1/2 pt-10">
        {product?.images && (
          <ImageView images={product?.images} isStock={product?.stock} />
        )}
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        <div className="space-y-1 pt-10">
          <h2 className="text-2xl font-bold font-poppins">
            {product?.name}
          </h2>
          <p className="text-normal text-gray-600 font-poppins tracking-wide font-normal">{product?.description}</p>
            <div className='flex items-center gap-0.5'>
              {
                [...Array(5)].map((_,index)=>(
                    <HiMiniStar 
                    key={index}
                    size={15}
                    className={index<4?"text-shop_light_blue":"text-shop_light_text"}
                    fill={index<4?"#53aaff":"#ababab"}
                    />
                ))
              }
              <p className="text-sm text-gray-600 font-poppins tracking-wide font-bold">{`(45 reviews)`} </p>
            </div>
        </div>
        <div className="space-y-2 border-t border-b border-gray-200 py-5">
          <PriceView price={product?.price} discount={product?.discount} className='text-lg font-bold'/>
          <p className={`inline-block px-4 py-1.5 text-sm text-center font-poppins rounded-lg 
          tracking-wide font-semibold 
          ${product?.stock==0?"bg-red-100 text-red-600":"bg-green-100 text-green-600"}`}>
            {`${product?.stock as number>0?"In Stock":"Out of Stock"}`}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2.5 lg:gap-5 px-5">
          <AddToCartButton className="w-full" product={product}/>
          <FavoriteButton product={product} showProduct={true}/>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
