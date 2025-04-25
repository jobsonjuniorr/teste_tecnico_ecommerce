import express from "express";

import { registerUser } from "../controllers/controllRegister/app.js";
import { loginUser } from "../controllers/controllLogin/app.js";
import { updateProductAdm,deleteProduct,criarProduto } from "../controllers/controllerProduct/app.js";
import { deleteSale,attSale,addSale } from "../controllers/controllerSell/app.js";
import { getRegisterSell,getAllRegisterValeu,productSell } from "../controllers/controllerSellRegister/app.js";
import { editUser,deleteUser } from "../controllers/controllerUser/app.js";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const router = express.Router();

router.post("/register", registerUser); 
router.post("/login", loginUser);       
router.put("/usuarios/:id", editUser);
router.delete("/usuarios/:id", deleteUser);

router.put("/updateProduct/:id",upload.single('imagem'),updateProductAdm)
router.delete("/deleteProduct/:id",deleteProduct)
router.post("/produtctAdm",upload.single('imagem'),criarProduto)

router.post("/addSell",addSale)
router.delete("/sale/delete",deleteSale)
router.put("/sale/att",attSale)

router.get("/sellRegister",getRegisterSell)
router.get("/allValue",getAllRegisterValeu)
router.get("/productValue",productSell)

export default router;
