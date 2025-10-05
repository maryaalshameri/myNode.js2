// routes/productsRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productsController');

router.get('/', getAllProducts);            // GET /api/products
router.get('/:id', getSingleProduct);       // GET /api/products/:id
router.post('/', createProduct);            // POST /api/products
router.put('/:id', updateProduct);          // PUT /api/products/:id
router.delete('/:id', deleteProduct);       // DELETE /api/products/:id

module.exports = router;
