import Joi from "joi";

export const ProductAndOrderValidator = Joi.object({
  product: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    stock: Joi.number().integer().min(0).required(),
  }).required(),
  order: Joi.object({
    customerName: Joi.string().required(),
    quantity: Joi.number().required(),
  }).required(),
});
