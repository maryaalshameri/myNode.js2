// controllers/productsController.js
let nextId = 3; // إذا أضفنا منتجات افتراضية
const products = [
  { id: 1, name: "iPhone 14", category: "electronics", price: 999 },
  { id: 2, name: "T-shirt", category: "clothing", price: 19.99 }
];

function getAllProducts(req, res) {
  // دعم فلترة بسيطة عبر query string: name, category, minPrice, maxPrice
  let result = products.slice();

  const { name, category, minPrice, maxPrice } = req.query;

  if (name) {
    result = result.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (minPrice) {
    const min = parseFloat(minPrice);
    if (!Number.isNaN(min)) result = result.filter(p => p.price >= min);
  }
  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!Number.isNaN(max)) result = result.filter(p => p.price <= max);
  }

  res.json(result);
}

function getSingleProduct(req, res) {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  // الدوال الأخرى ستُكمل في المرحلة 3
  _internal_products: products, // للغرض التعليمي فقط (ليس مطلوب الإنتاجياً)
  _internal_nextId: () => nextId
};
