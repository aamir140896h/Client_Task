import mongoose from "mongoose";

const prductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", prductSchema);
export default Product;
