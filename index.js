import express from "express";
import router from "./routes/routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { resetDataQuery } from "./queries/consultas.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(
  "/bootstrap_icons",
  express.static(
    path.join(__dirname, "node_modules", "bootstrap-icons", "font"),
  ),
);
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/", router);
app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${PORT}`);
});

setInterval(async () => {
  try {
    const response = await resetDataQuery();

    if (response === "exito") {
      console.log("Se reinicio el servidor exitosamente");
      return;
    } else {
      throw new Error("No se pudo reiniciar el servidor");
    }
  } catch (error) {
    console.error("Error al llamar a la ruta:", error);
  }
}, 1800000);
