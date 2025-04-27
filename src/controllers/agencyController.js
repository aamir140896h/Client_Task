import Agency from "../model/Agency.js";
import Client from "../model/Client.js";
import { agencyClientSchema } from "../validation/validator.js";

export const createAgencyController = async (req, res, next) => {
  try {
    const { error } = agencyClientSchema.validate(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { agency, clients } = req.body;
    let existingAgency = await Agency.findOne({
      name: agency.name,
      phoneNumber: agency.phoneNumber,
    });
    if (!existingAgency) {
      existingAgency = await Agency.create(agency);
    }
    const newClients = await Client.insertMany(
      clients.map((client) => ({
        ...client,
        agencyId: existingAgency._id,
      }))
    );
    res.status(201).json({ agency: existingAgency, client: newClients });
  } catch (error) {
    next(error);
  }
};

export const getTopClients = async (req, res, next) => {
  try {
    const clients = await Client.findOne()
      .sort({ totalBill: -1 })
      .limit(1)
      .populate("agencyId", "name");

    const response = {
      agencyName: clients.agencyId.name,
      clientName: clients.name,
      totalBill: clients.totalBill,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};
