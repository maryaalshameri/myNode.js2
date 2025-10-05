// routes/productsRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts, getSingleProduct } = require('../controllers/productsController');

router.get('/', getAllProducts);             // GET /api/products
router.get('/:id', getSingleProduct);        // GET /api/products/:id

module.exports = router;
