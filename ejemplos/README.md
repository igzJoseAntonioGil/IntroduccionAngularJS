# Ejercicios a realizar

1. Añadir la sección "Modelos" al proyecto y configurar la navegación a dicha página (modelos.html)

2. Crear un nuevo servicio que devuelva un listado modelo-versión de los vehículos disponibles, a partir del fichero "data/modelos.json", que viene definido por la siguiente estructura:
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
3. Crear una directiva que permita visualizar cada modelo individual y modificar el listado anterior para hacer uso de dicha directiva

4. Adaptar el servicio de modelos de vehículos para que recupere la información del fichero "modelos.json", realizando la petición http correspondiente
