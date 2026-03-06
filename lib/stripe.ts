import Stripe from "stripe";

// Ensure the Stripe secret key is securely available
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "Please provide a Stripe secret key in the environment variables.",
  );
}

// Global instance of the Stripe SDK
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-01-28.clover", // Target specific API version
});

export default stripe;
