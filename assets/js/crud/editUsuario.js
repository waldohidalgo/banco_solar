import { getUsuarios } from "./getUsuarios.js";
const pathEditUser = "/usuario";

export const editUsuario = async function (formulario, id) {
  try {
    const response = await axios.put(`${pathEditUser}?id=${id}`, formulario, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      $("#exampleModal").modal("hide");
      getUsuarios();
      Swal.fire({
        title: "Usuario editado",
        text: "El usuario se edito correctamente",
        icon: "success",
      });
    } else {
      throw new Error("No se pudo editar el usuario");
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Algo salió mal..." + error.message,
      icon: "error",
    });
  }
};
