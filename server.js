// server.js (Phase 1)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  console.error('Error: DB_URI is not set in .env');
  process.exit(1);
}

// Built-in middlewares
app.use(express.json());      // parses JSON bodies
app.use(morgan('dev'));      // logging middleware (dev format)

// Custom simple middleware: log date/time + method + url
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
// A simple route to check the server quickly
app.get('/', (req, res) => {
  res.send('API service: server running. Database connection initializing...');
});

// Connect to MongoDB and start server after successful connection
mongoose.connect(DB_URI, {
  // options kept minimal — depending on mongoose version these may be optional.
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
