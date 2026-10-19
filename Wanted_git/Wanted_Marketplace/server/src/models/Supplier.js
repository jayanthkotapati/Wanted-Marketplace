import mongoose from 'mongoose';
const supplierSchema = new mongoose.Schema({
  businessName: { type: String, required: true, trim: true },
  contactName: String,
  email: { type: String, lowercase: true, trim: true },
  phone: String,
  categories: [String],
  address: String,
  city: { type: String, index: true },
  country: { type: String, default: 'India' },
  verified: { type: Boolean, default: false },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
export default mongoose.model('Supplier', supplierSchema);
