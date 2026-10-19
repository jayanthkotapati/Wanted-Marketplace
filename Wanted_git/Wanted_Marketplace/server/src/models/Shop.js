import mongoose from 'mongoose';
const shopSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  kind: { type: String, enum: ['grocery', 'supermarket', 'restaurant', 'bakery', 'pharmacy', 'other'], default: 'grocery' },
  description: String,
  address: { type: String, required: true },
  city: { type: String, required: true, index: true },
  country: { type: String, required: true, default: 'India' },
  location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: { type: [Number], default: [0,0] } },
  phoneMasked: Boolean,
  isVerified: { type: Boolean, default: false },
  isOpen: { type: Boolean, default: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
shopSchema.index({ location: '2dsphere' });
export default mongoose.model('Shop', shopSchema);
