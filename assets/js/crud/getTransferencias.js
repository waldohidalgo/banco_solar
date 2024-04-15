import { formatDate } from "./utils.js";
import { getUsuarios } from "./getUsuarios.js";
import { formatearToChileanPeso } from "./utils.js";
const pathGetTransferencias = "/transferencias";

export const getTransferencias = async () => {
  try {
    const { data } = await axios.get(pathGetTransferencias);
    const dataUsuarios = await getUsuarios();
    $(".transferencias").html("");

    data.forEach((obj) => {
      const nombreEmisor = dataUsuarios.find(
        (user) => user.id == obj.emisor,
      ).nombre;
      const nombreReceptor = dataUsuarios.find(
        (user) => user.id == obj.receptor,
      ).nombre;
      $(".transferencias").append(`
               <tr>
                <td><span class="eliminar_transferencia" title="Eliminar Transferencia" onclick={deleteTransferencia('${
                  obj.id
                }')}><i class="bi bi-trash-fill"></i></span></td>
                 <td class="datos_transferencia_fecha"> ${formatDate(
                   obj.fecha,
                 )} </td>
                 <td class="datos_transferencia"> ${nombreEmisor} </td>
                 <td class="datos_transferencia"> ${nombreReceptor} </td>
                 <td class="datos_transferencia"> ${formatearToChileanPeso(
                   +obj.monto,
                 )} </td>
               </tr>
             `);
    });
  } catch (error) {
    console.log(error.message);
  }
};
