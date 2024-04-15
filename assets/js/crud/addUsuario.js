import { getUsuarios } from "./getUsuarios.js";
const pathAddUsuario = "/usuario";

export async function addUsuario(formulario) {
  try {
    const data = await getUsuarios();
    if (data.map((obj) => obj.nombre).includes($("#nombre").val())) {
      Swal.fire({
        title: "Advertencia",
        text: "El usuario ya existe, no se pueden agregar dos usuarios con el mismo nombre",
        icon: "warning",
      });
      return;
    }
    const response = await axios.post(pathAddUsuario, formulario, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      $("#nombre").val("");
      $("#balance").val("");
      await getUsuarios();
      Swal.fire({
        title: "Usuario agregado",
        text: "El usuario se agrego correctamente",
        icon: "success",
      });
    } else {
      throw new Error("No se pudo agregar el usuario");
    }
  } catch (error) {
    alert("Algo salió mal ..." + error.message);
  }
}
