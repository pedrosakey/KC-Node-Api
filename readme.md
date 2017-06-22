# NodePOP API

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

PARAMETROS EN EL BODY

nombre: [nombre no duplicado]

clave: [clave]

email: [email valido]




## Archivos estaticos

www.knowerflow.com/images/anuncios/iphone-4.jpg

www.knowerflow.com/images/anuncios/iphone-7.jpg

www.knowerflow.com/images/anuncios/Bicicleta.jpg


## Instalar paquetes

Para descargar los paquetes correspondientes ejecutar el comando

```
npm install
```

## Conexión con la base de datos

Defina la conexión con la base de datos en el archivo:
```
/lib/connectMongoose.js
```

```"use strict";
const mongoose = require('mongoose');
const conn = mongoose.connection;
const dbUri = 'mongodb://[ip/domain:port]/nodepopdb';
```

## Cargar datos (Populate)

Para cargar los datos de los anuncios y usuario podemos ejecutar el script 

```
npm run installDB
```

## Arrancar la aplicacion

Para arrancar la aplicación usa el comando 
```
npm start
```


## Registro

POST:
nombre: [nombre]
clave: [clave]
email: [email valido]

### Errores

Usuario no puede estar vacio 

Usuario no puede estar duplicado

Mail con formato valido

*Estos errores no están personalizados*

*Ejemplo*
```
http://localhost:3000/apiv1/usuarios
```

*Especificar parámetros en el body*
*x-www-form-urlencoded*

## Devolver todos los tags disponibles en anuncios
```
http://localhost:3000/apiv1/anuncios/tagslista
```

## Peticion de anuncios

GET:

Ejemplo petición genérica devuelva todos los anuncios, requiere BasicAuth

```
http://localhost:3000/apiv1/anuncios
```

*Filtros*

 * tag: Devuelve todos los anuncios que contienen un determinado tag, ejemplo

```
http://localhost:3000/apiv1/anuncios?tag=mobile
```

 * venta: Anuncios que está en venta, valor *true* o *false* si se buscan, ejemplo
```
http://localhost:3000/apiv1/anuncios?venta=true
```

* precio: 10-50 , 10-, -50, 50. Precio entre 10 y 50 incluido, mayor que 10 no incluido, menor que 50 no incluido, igual a 50 respectivamente. Ejemplo:

```
http://localhost:3000/apiv1/anuncios?precio=10-50
```

*Errores Génericos*

NOT_FOUND -  404

SERVER_ERROR - 500





