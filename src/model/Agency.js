import mongoose from "mongoose";

const agencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  state: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});
const Agency = mongoose.model("Agency", agencySchema);
export default Agency;
