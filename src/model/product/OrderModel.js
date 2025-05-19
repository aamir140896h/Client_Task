import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  customerName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  quantity: { type: Number },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
