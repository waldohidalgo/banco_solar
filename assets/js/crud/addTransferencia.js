import { formatDate } from "./utils.js";
import { getUsuarios } from "./getUsuarios.js";
import { getTransferencias } from "./getTransferencias.js";
import { getComisiones } from "../comisiones/getComisiones.js";

const pathPostTransferencia = "/transferencia";
export async function addTransferencia({ emisor, receptor, monto }) {
  if (emisor === receptor) {
    Swal.fire({
      title: "Advertencia",
      text: "No se puede realizar una transferencia a si mismo",
      icon: "warning",
    });
  } else {
    try {
      const data = {
        emisor,
        receptor,
        monto,
        fecha: formatDate(new Date()),
      };
      const response = await axios.post(pathPostTransferencia, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        $("#emisor").val("");
        $("#receptor").val("");
        $("#monto").val("");
        getUsuarios();
        getTransferencias();
        getComisiones();
        Swal.fire({
          title: "Transferencia realizada",
          text: "La transferencia se realizó correctamente",
          icon: "success",
        });
      } else {
        throw new Error("No se pudo agregar la transferencia");
      }
    } catch (error) {
      try {
        const {
          response: {
            data: { code },
          },
        } = error;
        if (code === "23514") {
          Swal.fire({
            title: "Error",
            text: "Saldo insuficiente para realizar la transferencia por dicho monto",
            icon: "error",
          });
          return;
        }
        alert("Algo salió mal..." + error.message);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
}
