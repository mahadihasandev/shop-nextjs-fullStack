import { Product } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { GiFlame } from "react-icons/gi";
import AddToWishListButton from './AddToWishListButton';
import { Title } from './ui/text';


const ProductCard = ({product}:{product:Product}) => {

  return (
    <div className='border border-shop_dark_blue/20 group bg-white rounded-md shadow-[2px_2px_5px_-2px_#29b8ff] hover:scale-105 hoverEffect'>
        <div className='relative bg-shop_light_bg rounded-md overflow-hidden'>
            {product?.images&&<Image 
            height={700} 
            width={700}  
            alt='ProductImage' 
            className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop_light_bg duration-500 ease ${product?.stock!==0?"group-hover:scale-105":"opacity-50"}`}
            src={urlFor(product?.images[0]).url()} loading='lazy'/>}
            <AddToWishListButton product={product} className=""/> 
            {product?.status=="sale" && <p className='absolute left-2 top-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-shop_light_blue group-hover:text-darkColor hoverEffect group-hover:bg-shop_light_blue/20 '>Sale!</p>}
            {product?.status=="new" && <p className='absolute left-2 top-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-shop_light_blue group-hover:text-darkColor hoverEffect group-hover:bg-shop_light_blue/20'>New!</p>}
            {product?.status=="hot" && <Link href={'/deal'} 
        className='absolute top-2 left-2 z-10 border hover:scale-105 border-shop_orange/50 p-1 rounded-full group-hover:border-shop_orange hover:text-shop_dark_green hoverEffect'
        >
          <GiFlame
              size={18}
              fill="#fb6c08"
              className="text-shop_orange/50 group-hover:text-shop_orange  hoverEffect"
          />
          </Link>}
        </div>
        <div className='p-3'>
          {product?.categories&&(<p className='uppercase line-clamp-1 text-xs font-sans text-shop_light_text'>{ product?.categories?.map((cat)=>cat).join(",")}</p>)}
          <Title className='text-sm! line-clamp-1'>{product?.name}</Title>
          <div>
            <div>
              
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProductCard