import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, default: '', maxlength: 2000 },
  category: { type: String, required: true, index: true },
  type: { type: String, enum: ['grocery', 'food', 'essential', 'regulated'], default: 'grocery', index: true },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'INR' },
  unit: { type: String, default: 'each' },
  stock: { type: Number, default: 0, min: 0 },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', index: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  imageUrl: String,
  isActive: { type: Boolean, default: true, index: true }
}, { timestamps: true });
productSchema.index({ name: 'text', description: 'text', category: 'text' });
export default mongoose.model('Product', productSchema);
