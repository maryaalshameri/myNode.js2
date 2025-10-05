// models/productModel.js
import mongoose from "mongoose";
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
  timestamps: true,
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

ProductSchema.virtual('isAvailable').get(function() {
  return this.inStock && this.quantity > 0;
});

ProductSchema.pre('save', function(next) {
  if (this.name && !this.slug) {
    this.slug = this.name.toString().toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  }
  next();
});

ProductSchema.methods.applyDiscount = function(percent) {
  if (!percent || percent <= 0) return this.price;
  const newPrice = +(this.price * (1 - percent/100)).toFixed(2);
  this.price = newPrice;
  return this.price;
};

ProductSchema.statics.searchByText = function(q) {
  return this.find({ $text: { $search: q } });
};

ProductSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', ProductSchema);
export default Product;
