// routes/productRoutes.js (تعديل)
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const productCtrl = require('../controllers/productController');
const validateRequest = require('../middleware/validateRequest');

// GET /api/products
router.get('/', productCtrl.getProducts);

// POST /api/products  ---> أضفنا فحص عند الإنشاء
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('price').notEmpty().withMessage('Price is required').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
  ],
  validateRequest,
  productCtrl.createProduct
);

// GET/:id
router.get('/:id', productCtrl.getProductById);

// PUT /:id  ---> فحص مخصص للتحديث
router.put(
  '/:id',
  [
    body('name').optional().trim().notEmpty().withMessage('Name must not be empty'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
  ],
  validateRequest,
  productCtrl.updateProduct
);

router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;
