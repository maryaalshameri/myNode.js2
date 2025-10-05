// controllers/productsController.js
let nextId = 3;
const products = [
  { id: 1, name: "iPhone 14", category: "electronics", price: 999 },
  { id: 2, name: "T-shirt", category: "clothing", price: 19.99 }
];

function getAllProducts(req, res) {
  let result = products.slice();
  const { name, category, minPrice, maxPrice } = req.query;
  if (name) result = result.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  if (category) result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (minPrice) { const min = parseFloat(minPrice); if (!Number.isNaN(min)) result = result.filter(p => p.price >= min); }
  if (maxPrice) { const max = parseFloat(maxPrice); if (!Number.isNaN(max)) result = result.filter(p => p.price <= max); }
  res.json(result);
}

function getSingleProduct(req, res) {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
}

function createProduct(req, res) {
  const { name, category, price } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: "Name is required and must be a string" });
  }
  const parsedPrice = Number(price);
  if (Number.isNaN(parsedPrice)) {
    return res.status(400).json({ error: "Price is required and must be a number" });
  }

  const newProduct = {
    id: nextId++,
    name,
    category: category || 'uncategorized',
    price: parsedPrice
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
}

function updateProduct(req, res) {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const { name, category, price } = req.body;
  if (name !== undefined) {
    if (typeof name !== 'string') return res.status(400).json({ error: "Name must be a string" });
    product.name = name;
  }
  if (category !== undefined) product.category = category;
  if (price !== undefined) {
    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice)) return res.status(400).json({ error: "Price must be a number" });
    product.price = parsedPrice;
  }

  res.json(product);
}

function deleteProduct(req, res) {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });
  const removed = products.splice(index, 1)[0];
  res.json({ message: "Product deleted", product: removed });
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
