## NodePOP API

API para la venta de articulos de segunda mano

## URL de despliegue

knowerflow.com

ip: http://13.58.65.107/

*Ejemplo*

- Devolver anuncios (Basic Auth requerida)

GET
knowerflow.com/apiv1/anuncios

Usuario prueba ya creado (puedes crear tu propio usuario)
Tomas / 1234

- Crear usuario

POST
knowerflow.com/apiv1/usuarios

POST:
nombre: [nombre no duplicado]
clave: [clave]
email: [email valido]



## Archivos estaticos

www.knowerflow.com/images/anuncios/iphone-4.jpg
www.knowerflow.com/images/anuncios/iphone-7.jpg
www.knowerflow.com/images/anuncios/Bicicleta.jpg


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
```
npm run installDB
```

## Arrancar la aplicacion

Para arrancar la aplicación usa el comando 
```npm start;
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


