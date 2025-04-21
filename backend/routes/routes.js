import express from "express";

import { registerUser } from "../controllers/controllRegister/app.js";
import { loginUser } from "../controllers/controllLogin/app.js";


const router = express.Router();

router.post("/register", registerUser); 
router.post("/login", loginUser);       

export default router;
