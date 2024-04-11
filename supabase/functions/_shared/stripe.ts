// esm.sh is used to compile stripe-node to be compatible with ES modules.
import Stripe from "https://esm.sh/stripe@10.13.0?target=deno&deno-std=0.132.0&no-check";
import supabase from "./supabase.ts";

console.log("sk:", Deno.env.get("STRIPE_SECRET_KEY")!);

export const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  // This is needed to use the Fetch API rather than relying on the Node http
  // package.
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: "2022-08-01",
});

export const createOrRetrieveCustomer = async (authHeader: string) => {
  // Get JWT from auth header
  const jwt = authHeader.replace("Bearer ", "");
  // Get the user object
  const {
    data: { user },
  } = await supabase.auth.getUser(jwt);
  if (!user) throw new Error("No user found for JWT!");

  // Check if the user already has a Stripe customer ID in the Database.
  const { data, error } = await supabase
    .from("customers")
    .select("stripe_customer_id")
    .eq("id", user?.id);
  console.log(data?.length, data, error);
  if (error) throw error;
  if (data?.length === 1) {
    // Exactly one customer found, return it.
    const customer = data[0].stripe_customer_id;
    console.log(`Found customer id: ${customer}`);
    return customer;
  }
  if (data?.length === 0) {
    // Create customer object in Stripe.
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { uid: user.id },
    });
    console.log(`New customer "${customer.id}" created for user "${user.id}"`);
    // Insert new customer into DB
    await supabase
      .from("customers")
      .insert({ id: user.id, stripe_customer_id: customer.id })
      .throwOnError();
    return customer.id;
  } else throw new Error(`Unexpected count of customer rows: ${data?.length}`);
};
