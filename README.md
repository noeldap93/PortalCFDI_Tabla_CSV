# PortalCFDI_Tabla_CSV
Obtiene los datos de las tablas del portal de consulta de CFDI y genera un archivo CSV a partir de ellos. 


Para cargar el script abrir la consola de debug (en google chrome preferentemente). Pegar lo siguiente y dar enter:
``` Javascript
(function() {
  var scriptNames = [
    "https://rawgit.com/noeldap93/PortalCFDI_Tabla_CSV/ft-export-from-closure/code.js",
  ];
  for (var i = 0; i < scriptNames.length; i++) {
    var script = document.createElement('script');
    script.src = scriptNames[i];
    script.async = false; // This is required for synchronous execution
    document.head.appendChild(script);
  }
})();
```

Para ejecutarlo, pegar esto en la consola.
``` Javascript
  PortalCFDI_Tabla_CSV.start();
```
