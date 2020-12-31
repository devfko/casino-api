## Casino - API

Esta API se realizó para el proceso de control de mesa de casino

#### Configuration

  - Paso 1:
  
  Crear archivo _.env_ con la siguiente estructura de datos

  ```sh
  DB_HOST = 
  DB_PORT = 
  DB_USER = 
  DB_PASS =
  DB_NAME = 
  NODE_ENV = production

  URL_DOMAIN = http://localhost
  URL_PORT = 3000
  ```

  - Paso 2:

  Ejecutar los siguientes scripts en la base creada de MongoDB

  ```sh
  db.getCollection('colors').insertMany([
    { name: "Verde", percentaje: 1, gain: 10 },
    { name: "Rojo", percentaje: 49.5, gain: 2 },
    { name: "Negro", percentaje: 49.5, gain: 2 }
  ])

  db.getCollection('generators').insertOne({
      "type" : "table",
      "seq" : 1
  })
  
  ```