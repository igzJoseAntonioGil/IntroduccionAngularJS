
### Como solucionar los problemas de refresco en Angular
Muchas veces, al realizar una actualización sobre un dato en el controlador, dicho cambio no se ve reflejado en la vista.
Esto es porque Angular aún no ha ejecutado el ciclo de refresco ($digest), que se realiza al cumplirse ciertas condiciones, que no siempre se darán al modificar nuestro dato.

Para solucionarlo, podemos forzar que se realice el refresco al ejecutar una función, pasándosela como parámetro al siguiente método:

```
function _SafeApply(fn) {
  var root = this.$root;
  var phase = (root && root.$$phase) || "?";

  if (phase == "$apply" || phase == "$digest") {
    typeof fn === "function" && fn();
  } else {
    this.$apply(fn);
  }
}
```
