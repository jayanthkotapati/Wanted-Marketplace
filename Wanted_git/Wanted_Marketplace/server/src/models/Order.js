import mongoose from 'mongoose';
const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  nameSnapshot: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 }
}, { _id: false });
const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  items: { type: [orderItemSchema], validate: v => v.length > 0 },
  currency: { type: String, default: 'INR' },
  subtotal: { type: Number, required: true, min: 0 },
  deliveryFee: { type: Number, default: 0, min: 0 },
  total: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, enum: ['cod', 'upi', 'phonepe', 'paytm', 'card'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'authorized', 'paid', 'failed', 'refunded', 'cod_due'], default: 'pending' },
  status: { type: String, enum: ['placed', 'accepted', 'preparing', 'ready_for_pickup', 'picked_up', 'on_the_way', 'delivered', 'cancelled'], default: 'placed', index: true },
  deliveryPartnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deliveryAddress: { type: String, required: true },
  deliveryLocation: { lat: Number, lng: Number },
  tracking: [{ lat: Number, lng: Number, at: { type: Date, default: Date.now } }],
  deliveryOtpHash: String
}, { timestamps: true });
orderSchema.index({ createdAt: -1, status: 1 });
export default mongoose.model('Order', orderSchema);
