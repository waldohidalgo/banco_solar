import { formatearToChileanPeso } from "../crud/utils.js";
const montoComisiones = 300;
export function comisiones() {
  $("#monto_comision").text(formatearToChileanPeso(+montoComisiones));
}
