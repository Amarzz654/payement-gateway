const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51QBtuC05haCqmbwj2NLDMf3SeqtNe5G1ccGtdSLBAepeQ9ZLFccZoAsOR1JCClTrpJjSOjMkI1aZAPqNd9as7GfY00wKU4sUX0'); // Replace with your Stripe secret key

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files (your index.html and other files)

// Payment route
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: currency,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
