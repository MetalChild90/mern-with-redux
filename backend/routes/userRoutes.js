import express from "express";

import {
  loginUser,
  registerUser,
  getMe,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/me", protect, getMe);

export default router;