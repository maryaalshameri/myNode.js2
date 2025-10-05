// controllers/productController.js
import Product from "../models/productModel.js";
import { getIO } from "../socket/socket.js";

// 🆕 إنشاء منتج جديد
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // بث الحدث لكل المستخدمين
    const io = getIO();
    io.emit("newProduct", product);

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✏️ تحديث منتج
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    io.emit("productUpdated", {
      message: `✏️ Product updated: ${product.name}`,
      product,
      time: new Date().toLocaleTimeString(),
    });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ❌ حذف منتج
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    io.emit("productDeleted", {
      message: `❌ Product deleted: ${product.name}`,
      id: req.params.id,
      time: new Date().toLocaleTimeString(),
    });

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};