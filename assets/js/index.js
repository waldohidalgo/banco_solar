import { getUsuarios } from "./crud/getUsuarios.js";
import { eliminarUsuario } from "./crud/deleteUsuario.js";
import { editUsuario } from "./crud/editUsuario.js";
import { getTransferencias } from "./crud/getTransferencias.js";
import { addTransferencia } from "./crud/addTransferencia.js";
import { addUsuario } from "./crud/addUsuario.js";
import { deleteTransferencia } from "./crud/deleteTransferencia.js";
import { getComisiones } from "./comisiones/getComisiones.js";

import { efectosTypeWritter } from "./efectos.js";

import { comisiones } from "./comisiones/index.js";

$(function () {
  efectosTypeWritter();

  //Obtener usuarios
  getUsuarios();

  // Crear Usuario
  $("#form_add_usuario").on("submit", async function (e) {
    e.preventDefault();
    addUsuario(this);
  });

  // Eliminar usuario
  window.eliminarUsuario = eliminarUsuario;

  //Set info de modal
  const setInfoModal = (nombre, balance, id) => {
    $("#nombreEdit").val(nombre);
    $("#balanceEdit").val(balance);
    $("#formulario_editar_usuario").attr("data-id", `${id}`);
  };
  window.setInfoModal = setInfoModal;

  // Editar usuario

  $("#formulario_editar_usuario").on("submit", function (e) {
    e.preventDefault();
    editUsuario(this, this.dataset.id);
  });

  //Get transferencias
  getTransferencias();

  //Add transferencia
  $("#form_crear_transferencia").submit(async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const { emisor, receptor, monto } = Object.fromEntries(formData);

    if (!monto || !emisor || !receptor) {
      Swal.fire({
        title: "Alerta",
        text: "Debes seleccionar un emisor,receptor y monto a transferir",
        icon: "warning",
      });
      return;
    }
    addTransferencia({ emisor, receptor, monto });
  });

  //eliminar transferencia

  window.deleteTransferencia = deleteTransferencia;

  //comisiones seteo monto
  comisiones();
  // Get Comisiones
  getComisiones();
});

/*




getUsuarios();
getTransferencias();


formatDate();
*/
