"use client"

import Container from "@/components/Container"
import NoAccess from "@/components/NoAccess"
import { Address } from "@/sanity.types"
import useStore from "@/store"
import { useAuth, useUser } from "@clerk/nextjs"

import { useState } from "react"

const CartPage = () => {
    const {deleteCartProduct,getTotalPrice,getItemCount,getSubtotalPrice,resetCart}=useStore()
    const [isClient,setIsClient]=useState(false)
    const [loading,setLoading]=useState(false)
    const {isSignedIn}=useAuth()
    const {user}=useUser()
    const [selectedAddress,setSelectedAddress]=useState<Address | null>(null)

 
  return ( 
    <div className="bg-gray-50 pb-52 md:pb-10">
        {isSignedIn?(
          <Container>
            <p className=" text-red-500">cartPage</p>
            </Container>           
        ):(
          <Container>
          <NoAccess/>
          </Container>
        )}
    </div>
   
  )
}

export default CartPage