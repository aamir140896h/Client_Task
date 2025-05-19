import Books from "../../model/library/Bookmodel.js";
import Loans from "../../model/library/LoanModel.js";
import Member from "../../model/library/Membermodel.js";
import {
  BookValidation,
  UpdateBookValidation,
} from "../../validation/LibraryValidation.js";

export const addBooks = async (req, res, next) => {
  try {
    const { error } = BookValidation.validate(req.body);
    console.log(error);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { books } = req.body;
    const newBooks = await Books.insertMany(books);
    res.status(201).json({ books: newBooks });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error creating books" });
  }
};

export const updateBook = async (req, res, next) => {
  try {
    console.log(req.params.id);
    console.log(req.body);
    const { error } = UpdateBookValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const book = await Books.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found " });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message || "Error updating books" });
  }
};

export const addMember = async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMostBorrowedBooks = async (req, res) => {
  try {
    const mostBorrowed = await Loans.aggregate([
      {
        $group: {
          _id: "$bookId", // Group by bookId (ObjectId)
          loanCount: { $sum: 1 }, // Count loans per book
        },
      },
      { $sort: { loanCount: -1 } }, // Sort by count descending
      { $limit: 5 }, // Get top 5
      {
        $lookup: {
          // Join with Books collection
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" }, // Flatten the book details
      {
        $project: {
          // Shape the output
          bookId: "$_id",
          title: "$bookDetails.Title",
          author: "$bookDetails.Author",
          loanCount: 1,
          _id: 0, // Exclude MongoDB _id
        },
      },
    ]);

    res.status(200).json(mostBorrowed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
