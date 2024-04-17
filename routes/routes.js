import express from "express";
import {
  renderHome,
  addUser,
  getUsers,
  deleteUser,
  editUser,
  getTransferencias,
  postAddTransferencia,
  deleteTransferencia,
  getComisiones,
  resetData,
  notFound,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", renderHome);

//rutas CRUD usuarios
router.get("/usuarios", getUsers);

router.post("/usuario", addUser);

router.delete("/usuario", deleteUser);

router.put("/usuario", editUser);

//rutas CRUD trasnferencias

router.get("/transferencias", getTransferencias);

router.post("/transferencia", postAddTransferencia);

router.delete("/transferencia", deleteTransferencia);

//comisiones
router.get("/comisiones", getComisiones);

//Resetear Data

router.get("/reset", resetData);

//No found

router.get("/*", notFound);

export default router;
