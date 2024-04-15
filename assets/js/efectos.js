export function efectosTypeWritter() {
  const textoObjetivo = $("#footer_tag")[0];

  var typewriter = new Typewriter(textoObjetivo, {
    strings: "Developed By:",
    autoStart: true,
    loop: true,
    delay: 75,
  });
}
