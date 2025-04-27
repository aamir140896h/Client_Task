import Client from "../model/Client.js";
import { updateClientSchema } from "../validation/validator.js";

export const updateClient = async (req, res, next) => {
  try {
    console.log(req.params.id);
    console.log(req.body);
    const { error } = updateClientSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const updateClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateClient)
      return res.status(404).json({ message: "Client not found " });

    res.json(updateClient);
  } catch (error) {
    next(error);
  }
};
