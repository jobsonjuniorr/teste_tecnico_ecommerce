import express from "express";

import { registerUser } from "../controllers/controllRegister/app.js";
import { loginUser } from "../controllers/controllLogin/app.js";
import { updateProductAdm,deleteProduct,criarProduto } from "../controllers/controllerProduct/app.js";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const router = express.Router();

router.post("/register", registerUser); 
router.post("/login", loginUser);       

router.put("/updateProduct/:id",upload.single('imagem'),updateProductAdm)
router.delete("/deleteProduct/:id",deleteProduct)
router.post("/produtctAdm",upload.single('imagem'),criarProduto)

export default router;
