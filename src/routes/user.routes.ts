import express from "express";
const router = express.Router();

import { register } from "../controllers/auth.controller.js";
import { getAllUsers } from "../controllers/user.controller.js";

router.post("/register", register);
router.get("/", getAllUsers);

export default router;
