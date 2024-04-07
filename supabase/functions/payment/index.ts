import { createOrRetrieveCustomer, stripe } from "../_shared/stripe.ts";

Deno.serve(async (req) => {
  try {
    // Get the authorization header from the request.
    // When you invoke the function via the client library it will automatically pass the authenticated user's JWT.
    const authHeader = req.headers.get("Authorization")!;

    // Retrieve the logged in user's Stripe customer ID or create a new customer object for them.
    // See ../_utils/supabase.ts for the implementation.
    const customer = await createOrRetrieveCustomer(authHeader);

    // Create an ephermeralKey so that the Stripe SDK can fetch the customer's stored payment methods.
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer },
      { apiVersion: "2020-08-27" },
    );

    const paymentIntent = await stripe.paymentIntents.create({
      // centavos!!
      amount: 51200,
      currency: "MXN",
      customer: customer,
    });

    // Return the customer details as well as teh Stripe publishable key which we have set in our secrets.
    const res = {
      stripe_pk: Deno.env.get("STRIPE_PUBLISHABLE_KEY"),
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer,
    };
    return new Response(JSON.stringify(res), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/payment' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
