import { Product } from "@/sanity.types";
import { PortableText } from "next-sanity";

interface Props {
  product: Product | null | undefined;
}

const ProductDescription = ({ product }: Props) => {
  console.log(product);
  return (
    <div className="space-y-2 border-t border-b border-gray-200 py-5">
      <h3 className="text-xl font-bold font-poppins text-black">
        Product Description
      </h3>
      <div className="text-base text-gray-600 font-poppins tracking-wide leading-relaxed">
        {product?.description ? (
          <PortableText value={product.description} />
        ) : (
          <p className="text-gray-400 italic">No description available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
