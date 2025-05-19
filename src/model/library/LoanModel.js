// BookId, MemberId, LoanDate, DueDate, ReturnDate, Status

import mongoose from "mongoose";

const loanSchema = mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    loadDate: { type: Date, default: Date.now },
    dueDate: { type: Date, default: Date.now },
    returnDate: { type: Date, default: Date.now },
    status: {
      type: String,
      required: true,
      enum: ["Borrowed", "Returned", "Overdue"],
      default: "Borrowed",
    },
  },
  { timeStamp: true }
);

const Loans = mongoose.model("Loans", loanSchema);
export default Loans;
