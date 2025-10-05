// scripts/seedProduct.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/productModel');

async function run() {
  await mongoose.connect(process.env.DB_URI);
  console.log('connected for seeding');

  const p = await Product.create({
    name: 'Sample T-Shirt',
    description: 'A comfortable cotton T-shirt',
    category: 'clothing',
    price: 19.99,
    quantity: 50,
    tags: ['clothes','summer']
  });

  console.log('Created product ->', p);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
