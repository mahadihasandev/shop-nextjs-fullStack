"use client"

import Container from "@/components/Container"
import { Address } from "@/sanity.types"
import useStore from "@/store"
import { ClerkLoaded, SignIn, SignedIn, UserButton, useAuth, useUser } from "@clerk/nextjs"

import { useState } from "react"

const CartPage = () => {
    const {deleteCartProduct,getTotalPrice,getItemCount,getSubtotalPrice,resetCart}=useStore()
    const [isClient,setIsClient]=useState(false)
    const [loading,setLoading]=useState(false)
    const {isSignedIn}=useAuth()
    const {user}=useUser()
    const [selectedAddress,setSelectedAddress]=useState<Address | null>(null)

   

    
  return (
    <Container>
    <div className="bg-gray-50 pb-52 md:pb-10">
        {isSignedIn?(
          <Container>
            <p>cartPage</p>
            </Container>           
        ):(
           <div className="flex items-center justify-center h-[calc(100vh-100px)]">
            <ClerkLoaded>              
                {!user&&<SignIn forceRedirectUrl="/cart"/>}              
              </ClerkLoaded>
            </div>
        )}
    </div>
    </Container>
  )
}

export default CartPage