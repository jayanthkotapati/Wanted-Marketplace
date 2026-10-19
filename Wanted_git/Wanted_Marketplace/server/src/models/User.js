import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true, sparse: true, unique: true },
  phone: { type: String, sparse: true, unique: true },
  role: { type: String, enum: ['customer', 'shop', 'supplier', 'delivery', 'admin'], default: 'customer', index: true },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('User', userSchema);
