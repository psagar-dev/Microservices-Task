const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3003;
const NODE_ENV = process.env.NODE_ENV || 'development';
const USER_API_URL = process.env.USER_API_URL || 'http://user-service:3000';
const PRODUCT_API_URL = process.env.PRODUCT_API_URL || 'http://product-service:3001';
const ORDER_API_URL = process.env.ORDER_API_URL || 'http://order-service:3002';

app.get('/health', (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.json({ status: `${NODE_ENV} - Gateway Service is healthy` });
});

app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get(`${USER_API_URL}/users`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(`${PRODUCT_API_URL}/products`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const response = await axios.get(`${ORDER_API_URL}/orders`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const response = await axios.post(`${ORDER_API_URL}/orders`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
});

app.listen(port, () => {
  console.log(`Gateway service running on port ${port}`);
});