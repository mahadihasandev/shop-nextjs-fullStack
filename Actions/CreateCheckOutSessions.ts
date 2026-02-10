"use server";

import stripe from "@/lib/stripe";
import { Address } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string;
  addresses: Address | null;
}
export interface GroupedItems {
  product: CartItem["product"];
  quantity: number;
}

export async function CreateCheckOutSessions(
  items: GroupedItems[],
  metadata: Metadata,
) {
  try {
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
    });
    const customerId = customers?.data?.length > 0 ? customers?.data[0].id : "";
    const sessionsPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId!,
        addresses: JSON.stringify(metadata.addresses),
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "BDT",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item?.product?.name || "Unknown Product",
            description: item?.product?.description
              ? Array.isArray(item?.product?.description)
                ? item?.product?.description
                    .map((blocks) =>
                      blocks._type === "block"
                        ? blocks.children?.map((child) => child.text).join("")
                        : "",
                    )
                    .join(" ")
                : String(item?.product?.description)
              : undefined,
            metadata: { id: item?.product?._id },
            images:
              item?.product?.images && item?.product?.images?.length > 0
                ? [urlFor(item?.product?.images[0]).url()]
                : undefined,
          },
        },
        quantity: item?.quantity,
      })),
    };
    if (customerId) {
      sessionsPayload.customer = customerId;
    } else {
      sessionsPayload.customer_email = metadata.customerEmail;
    }
    const session = await stripe.checkout.sessions.create(sessionsPayload);
    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
