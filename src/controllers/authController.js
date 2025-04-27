import { Users } from "../model/UserModel.js";
import { generateToken } from "../utils/token.js";
import bcrypt from "bcryptjs";

// register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }
    const user = new Users({ name, email, password: password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });
    const user = await Users.findOne({ email });

    if (!user) return res.status(400).json({ message: "Incorrect email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });
    const token = generateToken(email);
    res.json(token);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
