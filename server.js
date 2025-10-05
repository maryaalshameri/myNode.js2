// server.js
const express = require('express');
const productsRouter = require('./routes/productsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/products', productsRouter);

// 404 handler for unknown API endpoints
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
