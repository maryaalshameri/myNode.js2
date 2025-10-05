// controllers/productController.js
const Product = require('../models/productModel');

/**
 * @desc   Get all products
 * @route  GET /api/products
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    console.error('❌ getProducts error:', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * @desc   Get single product by ID
 * @route  GET /api/products/:id
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error('❌ getProductById error:', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * @desc   Create new product
 * @route  POST /api/products
 */
exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, price, quantity, tags } = req.body;

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      quantity,
      tags
    });

    const saved = await newProduct.save();

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error('❌ createProduct error:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @desc   Update product
 * @route  PUT /api/products/:id
 */
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated)
      return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error('❌ updateProduct error:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @desc   Delete product
 * @route  DELETE /api/products/:id
 */
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    console.error('❌ deleteProduct error:', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
