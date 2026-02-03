import { Product } from '@/sanity.types'
import { getBrands } from '@/sanity/lib'
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

const ProductCharacteristics =async ({product}:{product:Product|null|undefined}) => {
    const brand=await getBrands(product?.slug?.current as string)
    console.log(brand?.[0].brandName)
  return (
    <Accordion type="single" collapsible className='w-full'>
        <AccordionItem value='item-1'>
            <AccordionTrigger>
                {product?.name}:Characteristics
            </AccordionTrigger>
            <AccordionContent className='space-y-2'>
                <p className='flex items-center justify-between'>
                    Brand:{brand&&<span className='font-semibold tracking-wide'>
                        {brand[0].brandName}</span>}
                </p>
                <p className='flex items-center justify-between'>
                    Collection:{' '}
                    <span className='font-semibold tracking-wide'>2026</span>
                </p>
                <p className='flex items-center justify-between'>
                    Type:{' '}
                    <span className='font-semibold tracking-wide'>{product?.variant}</span>
                </p>
                <p className='flex items-center justify-between'>
                    Stock:{' '}
                    <span className='font-semibold tracking-wide'>{product?.stock as number>0?"In Stock":"Out of Stock"}</span>
                </p>
            </AccordionContent>          
        </AccordionItem>
    </Accordion>
  )
}

export default ProductCharacteristics