import Joi from "joi";
export const agencyClientSchema = Joi.object({
  agency: Joi.object({
    name: Joi.string().required(),
    address1: Joi.string().required(),
    address2: Joi.string().allow(""),
    state: Joi.string().required(),
    city: Joi.string().required(),
    phoneNumber: Joi.string().required(),
  }).required(),

  clients: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
        totalBill: Joi.number().required(),
      })
    )
    .min(1)
    .required(),
});

export const updateClientSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
});
