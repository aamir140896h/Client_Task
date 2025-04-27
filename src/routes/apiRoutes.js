import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createAgencyController,
  getTopClients,
} from "../controllers/agencyController.js";
import { updateClient } from "../controllers/clientController.js";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/add/agency-client", protect, createAgencyController);
router.put("/update/client/:id", protect, updateClient);
router.get("/get/top-client", protect, getTopClients);

export default router;
