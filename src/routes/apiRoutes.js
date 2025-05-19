import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createAgencyController,
  getTopClients,
} from "../controllers/agencyController.js";
import { updateClient } from "../controllers/clientController.js";
import { loginUser, registerUser } from "../controllers/authController.js";
import {
  createProductAndOrder,
  getAllOrder,
} from "../controllers/product/productController.js";
import {
  addBooks,
  addMember,
  getMostBorrowedBooks,
  updateBook,
} from "../controllers/library/bookController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// agency and client
router.post("/add/agency-client", protect, createAgencyController);
router.put("/update/client/:id", protect, updateClient);
router.get("/get/top-client", protect, getTopClients);

//product and order
router.post("/add/product-order", protect, createProductAndOrder);
router.get("/get/allorder/:amount", protect, getAllOrder);

//library
router.post("/add/books", protect, addBooks);
router.put("/update/book/:id", protect, updateBook);
router.post("/add/member", protect, addMember);
router.get("/loans/most-borrowed", protect, getMostBorrowedBooks);

export default router;
