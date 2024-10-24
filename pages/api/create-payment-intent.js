// pages/api/create-payment-intent.js

import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { order_id, order_amount, customer_email } = req.body;
    let stripeAmount = parseFloat((order_amount * 100).toFixed(2));
    console.log(stripeAmount);
    try {
      // Create a PaymentIntent with the order details
      const paymentIntent = await stripe.paymentIntents.create({
        amount: stripeAmount * 100, // Amount in cents
        currency: 'usd', // Set the currency
        metadata: { order_id },
        receipt_email: customer_email, // Customer email for receipt
      });

      // Return the client secret to complete the payment
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
