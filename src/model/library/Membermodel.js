// Name, Email, Phone, Address, JoinDate

import mongoose from "mongoose";

const memberSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    joinDate: { type: Date, default: Date.now, required: true },
  },
  { timeStamp: true }
);

const Member = mongoose.model("Member", memberSchema);
export default Member;
