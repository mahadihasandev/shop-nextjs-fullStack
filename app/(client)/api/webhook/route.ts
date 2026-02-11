import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body=await req.text()
    const headersList=await headers()
    const sig=headersList.get("stripe-signature")

    if(!sig){
        return NextResponse.json({error:"Missing Stripe signature"}, {status:400})
    }

    const webhookSecret=process.env.STRIPE_WEBHOOK_SECRET
   
}