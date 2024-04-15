import { getUsuarios } from "./getUsuarios.js";

const pathDeleteUser = "/usuario";

export const eliminarUsuario = async (id) => {
  try {
    const response = await axios.delete(`${pathDeleteUser}?id=${id}`);

    if (response.status === 200) {
      if (response.data.code === "23503") {
        Swal.fire({
          title: "Advertencia",
          text: "No se puede eliminar un usuario que tenga transferencias hechas",
          icon: "warning",
        });
        return;
      }
      getUsuarios();
      Swal.fire({
        title: "Usuario eliminado",
        text: "El usuario se elimino correctamente",
        icon: "success",
      });
    } else {
      throw new Error("No se pudo eliminar el usuario");
    }
  } catch (error) {
    console.log(error.message);
  }
};
