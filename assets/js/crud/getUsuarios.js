import { formatearToChileanPeso } from "./utils.js";
const pathGetUsuarios = "/usuarios";
export const getUsuarios = async () => {
  try {
    const { data } = await axios.get(pathGetUsuarios);

    $(".usuarios").html("");
    $("#emisor").html(`<option value="">Selecciona un emisor</option>`);
    $("#receptor").html(`<option value="">Selecciona un receptor</option>`);
    data
      .sort((a, b) => a.id - b.id)
      .forEach((elemento, index) => {
        $(".usuarios").append(`
                              <tr>
                                <td class="tabla_usuarios_nombre">${
                                  elemento.nombre
                                }</td>
                                <td class="tabla_usuarios_balance">${formatearToChileanPeso(
                                  +elemento.balance,
                                )}</td>
                                <td class="tabla_usuarios_contenedor_botones">
                                  <button
                                    class="btn btn-warning"
                                    data-bs-toggle="modal" 
                                    data-bs-target="#exampleModal"
                                    onclick="setInfoModal('${
                                      elemento.nombre
                                    }', '${elemento.balance}', '${
          elemento.id
        }')"
                                  >
                                  <i class="bi bi-pencil-fill"></i> Editar</button
                                  ><button class="btn btn-danger" onclick="eliminarUsuario('${
                                    elemento.id
                                  }')"><i class="bi bi-trash-fill"></i> Eliminar</button>
                                </td>
                              </tr>
                         `);

        $("#emisor").append(
          `<option value="${elemento.id}">${elemento.nombre}</option>`,
        );
        $("#receptor").append(
          `<option value="${elemento.id}">${elemento.nombre}</option>`,
        );
      });

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
