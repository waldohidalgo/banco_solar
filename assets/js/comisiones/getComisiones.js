import { formatearToChileanPeso } from "../crud/utils.js";

const pathGetComisiones = "/comisiones";
export const getComisiones = async () => {
  try {
    const { data } = await axios.get(pathGetComisiones);
    $(".comisiones").html("");

    const ganacias = data.reduce(
      (acc, curr) => acc + parseFloat(curr.subtotal_comisiones),
      0,
    );
    $("#ganancias_total").html("$ " + ganacias);
    data
      .sort((a, b) => a.id - b.id)
      .forEach((elemento, index) => {
        $(".comisiones").append(`
                              <tr>
                                <td >${elemento.nombre}</td>
                                <td >${formatearToChileanPeso(
                                  +elemento.subtotal_transferencias,
                                )}</td>
                                <td >${formatearToChileanPeso(
                                  +elemento.subtotal_comisiones,
                                )}</td>
                              </tr>
                         `);
      });
  } catch (error) {
    console.log(error.message);
  }
};
