
import { Metadata } from "@/Actions/CreateCheckOutSessions";
import stripe from "@/lib/stripe";
import { BackendClient } from "@/sanity/lib/BackendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST(req: NextRequest) {
    const body=await req.text()
    const headersList=await headers()
    const sig=headersList.get("stripe-signature")

    if(!sig){
        return NextResponse.json({error:"Missing Stripe signature"}, {status:400})
    }

    const webhookSecret=process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
   
    return NextResponse.json(
      {
        error: "Stripe webhook secret is not set",
      },
      { status: 400 }
    )}
let event:Stripe.Event
    try {
        event=stripe.webhooks.constructEvent(body,sig,webhookSecret as string)
    } catch (error) {
        return NextResponse.json({error:`Failed to verify webhook signature${error}`},{status:400})
    }

    if(event.type==="checkout.session.completed"){
        const session=event.data.object as Stripe.Checkout.Session
        const invoice=session.invoice ? await stripe.invoices.retrieve(session.invoice as string):null
        try {
            await createOrderInSanity(session,invoice)
        } catch (error) {
            return NextResponse.json({error:`Failed to create order in stripe ${error}`},{status:400})
        }
        
    }
   return NextResponse.json({ received: true });
}
 async function createOrderInSanity(
        session:Stripe.Checkout.Session,
        invoice:Stripe.Invoice | null){
            const {id,amount_total,currency,payment_intent,metadata,total_details}=session
            const {customerEmail,customerName,orderNumber,addresses,clerkUserId}=metadata as unknown as Metadata & {addresses:string}
            const lineItemWithProduct=await stripe.checkout.sessions.listLineItems(id,{expand:["data.price.product"]})
            const parsedAddress = addresses ? JSON.parse(addresses) : null;
            const sanityProducts=[]
            const stockUpdates=[]

            for(const item of lineItemWithProduct.data){
                const productId=(item?.price?.product as Stripe.Product)?.metadata?.id
                const quantity=item.quantity||0
                if(!productId) continue;
                sanityProducts.push({
                    _key:crypto.randomUUID(),
                    product:{
                        _type:"reference",
                        _ref:productId
                    },
                    quantity,
                    
                })

                stockUpdates.push({
                    productId,
                    quantity,
                })
            }
           


const order=await BackendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customerEmail,
    clerkUserId: clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,

    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
    invoice: invoice
      ? {
          id: invoice.id,
          number: invoice.number,
          hosted_invoice_url: invoice.hosted_invoice_url,
        }
      : null,
    address: parsedAddress
      ? {
          state: parsedAddress.state,
          zip: parsedAddress.zip,
          city: parsedAddress.city,
          address: parsedAddress.address,
          name: parsedAddress.name,
        }
      : null,

}) 

 await updateStockLevels(stockUpdates);
  return order;
}

async function updateStockLevels(
  stockUpdates: { productId: string; quantity: number }[]
) {
  for (const { productId, quantity } of stockUpdates) {
    try {
      
      const product = await BackendClient.getDocument(productId);

      if (!product || typeof product.stock !== "number") {
        console.warn(
          `Product with ID ${productId} not found or stock is invalid.`
        );
        continue;
      }

      const newStock = Math.max(product.stock - quantity, 0); 

      
      await BackendClient.patch(productId).set({ stock: newStock }).commit();
    } catch (error) {
      console.error(`Failed to update stock for product ${productId}:`, error);
    }
  }
}