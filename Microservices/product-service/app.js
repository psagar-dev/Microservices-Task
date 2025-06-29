const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.get('/health', (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.json({ status: `${NODE_ENV} - Product Service is healthy` });
});

app.get('/products', (req, res) => {
  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 }
  ];
  res.json(products);
});

app.listen(port, () => {
  console.log(`Product service running on port ${port}`);
});