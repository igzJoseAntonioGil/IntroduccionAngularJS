# Ejercicios a realizar

1. Añadir la sección "Modelos" al proyecto y configurar la navegación a dicha página (modelos.html)

2. Añadir un listado de modelos a la página anterior (a partir del fichero "data/modelos.json"). Crear una directiva que permita visualizar cada modelo individual y utilizarla en el listado anterior

3. Crear un nuevo servicio que devuelva un listado modelo-versión de los vehículos disponibles, a partir del fichero "data/modelos.json", que viene definido por la siguiente estructura:
  ```
  {
    "id": "1",
    "versions": [
      {
        "id": "1_5_puertas",
        "title": "5 Puertas",
        "editions": [
          "base",
          "advanced",
          "sport",
          "full"
        ],
        "base_price": "24.290"
      },
      {...}
    ]
  }
  ```

4. Adaptar el servicio de modelos de vehículos para que recupere la información del fichero "modelos.json", realizando la petición http correspondiente
