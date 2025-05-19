import Order from "../../model/product/OrderModel.js";
import Product from "../../model/product/ProductModel.js";
import { ProductAndOrderValidator } from "../../validation/ProductOrderValidation.js";

export const createProductAndOrder = async (req, res, next) => {
  try {
    const { error } = ProductAndOrderValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { product, order } = req.body;

    if (order.quantity > product.stock) {
      return res.status(400).json({ message: "insufficient stock" });
    }
    const newProduct = await Product.create(product);

    const totalAmount = newProduct.price * order.quantity;
    const newOrder = await Order.create({
      customerName: order.customerName,
      productId: newProduct._id,
      totalAmount,
      quantity: order.quantity,
    });

    newProduct.stock -= order.quantity;
    await newProduct.save();
    await newOrder.save();
    res.status(201).json({ product: newProduct, order: newOrder });
  } catch (error) {
    next(error);
  }
};

export const getAllOrder = async (req, res, next) => {
  try {
    const amount = parseFloat(req.params.amount);
    if (isNaN(amount)) {
      return res
        .status(400)
        .json({ error: `Invalid amount value: ${req.params.amount}` });
    }
    const orders = await Order.find({ totalAmount: { $gt: amount } }).populate(
      "productId"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
