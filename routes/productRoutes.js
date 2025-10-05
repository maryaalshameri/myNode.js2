// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const productCtrl = require('../controllers/productController');
const validateRequest = require('../middleware/validateRequest');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// GET public
router.get('/', productCtrl.getProducts);
router.get('/:id', productCtrl.getProductById);

// Protected routes
router.post(
  '/',
  protect,   // must be logged in
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('price').notEmpty().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  ],
  validateRequest,
  productCtrl.createProduct
);

router.put(
  '/:id',
  protect,   // must be logged in
  [
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  ],
  validateRequest,
  productCtrl.updateProduct
);

// delete -> only admin
router.delete('/:id', protect, authorizeRoles('admin'), productCtrl.deleteProduct);

module.exports = router;
