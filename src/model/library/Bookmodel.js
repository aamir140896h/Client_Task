// Title, Author, ISBN, PublishedYear, Publisher, Category

import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    ISBN: { type: String, required: true },
    publishedYears: { type: Number, required: true },
    publisher: { type: String },
    category: { type: String, required: true },
  },
  { timeStamp: true }
);

const Books = mongoose.model("Books", bookSchema);
export default Books;
