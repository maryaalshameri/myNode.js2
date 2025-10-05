// models/productModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'uncategorized',
    index: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  inStock: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    default: 0,
    min: [0, 'Quantity cannot be negative']
  },
  tags: [{
    type: String
  }],
  metadata: {
    type: Schema.Types.Mixed
  }
}, {
  timestamps: true, // createdAt, updatedAt
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: { virtuals: true }
});

/* Virtual example: isAvailable */
ProductSchema.virtual('isAvailable').get(function() {
  return this.inStock && this.quantity > 0;
});

/* Pre-save hook: generate slug if not provided */
ProductSchema.pre('save', function(next) {
  if (this.name && !this.slug) {
    this.slug = this.name.toString().toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')   // remove non word chars
      .replace(/\s+/g, '-')       // spaces -> dashes
      .replace(/--+/g, '-');      // collapse dashes
  }
  next();
});

/* Instance method example */
ProductSchema.methods.applyDiscount = function(percent) {
  if (!percent || percent <= 0) return this.price;
  const newPrice = +(this.price * (1 - percent/100)).toFixed(2);
  this.price = newPrice;
  return this.price;
};

/* Static method example: simple text search wrapper */
ProductSchema.statics.searchByText = function(q) {
  return this.find({ $text: { $search: q } });
};

/* Text index for name + description (for full-text search) */
ProductSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
