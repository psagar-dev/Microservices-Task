const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3002;
const NODE_ENV = process.env.NODE_ENV || 'development';

const orders = [];

app.get('/health', (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.json({ status: `${NODE_ENV} - Order Service is healthy` });
});

app.get('/orders', (req, res) => {
  res.json(orders);
});

app.post('/orders', async (req, res) => {
  const order = {
    id: orders.length + 1,
    userId: req.body.userId,
    productId: req.body.productId,
    timestamp: new Date()
  };
  orders.push(order);
  res.json(order);
});

app.listen(port, () => {
  console.log(`Order service running on port ${port}`);
});
