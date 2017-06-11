## NodePOP API

API para la venta de articulos de segunda mano

## URL de desplegue

## Instalar paquetes

Para descargar los paquetes correspondientes ejecutar el comando

## Conexión con la base de datos

Defina la conexión con la base de datos en el archivo:

```"use strict";
const mongoose = require('mongoose');
const conn = mongoose.connection;
const dbUri = 'mongodb://[ip/domain:port]/nodepopdb';
```

## Cargar datos

Para cargar los datos de los anuncios y usuario podemos ejecutar el script 
```npm run installDB
```

## Arrancar la aplicacion

Para arrancar la aplicación usa el comando 
```npm start
```


## Registro

POST:
nombre: [nombre]
clave: [clave]
email: [email valido]

*Errores*

Usuario no puede estar vacio

Usuario no puede estar duplicado

Mail con formato valido

## Peticion de anuncios

*Filtros*

Añadir filtros ...


