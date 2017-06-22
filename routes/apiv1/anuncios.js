"use strict";

var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');
const path      = require('path');

//Autenticación
const basicAuth = require('../../lib/basicAuth');
router.use(basicAuth);


/* GET /apiv1/anuncios */
router.get('/', function(req, res, next) {
    
   const nombre = req.query.nombre; 

   const venta = req.query.venta;

   const tag = req.query.tag;

   const limit = parseInt(req.query.limit);

   const start = parseInt(req.query.start);

   //Ordena  por defecto de mas a menos si queremos que ordene de menos a mas el parametro en GET sort=-precio
   const sort = req.query.sort;

   const precio = req.query.precio;
   
   //Eliminamos la __v de la respuesta
   const fields = {__v:0};

   //Crear el filtro vacio
   const filter = {};
   if(nombre) {
       //Con esta expresion regular todo lo que empiece por (nombre)
       filter.nombre = new RegExp('^' + nombre);
       console.log(tags);
   }
   if (venta) {
       filter.venta = venta;
   }
   if(tag) {
       filter.tags = tag;
   }

   //Filtros para precio
   switch(precio) {
       case '10-50':
       filter.precio = { '$gte': '10','$lte': '50'};
       break; 
       case '-50':
       filter.precio = {'$lt': '50'};
       break;
       case '10-': 
       filter.precio = { '$gt': '10'};
       break;
       case '50': 
       filter.precio = '50';
       break;
   }
   
  
   Anuncio.list(filter, limit, start, fields, sort , (err, anuncios) => {
        if(err) {
           next(err);
           return;
        }

        // URL fotos: fullUrl + fotosdir + img.jpg 
        let fullUrl = req.protocol + '://' + req.get('host');
        let fotosdir = '/images/anuncios/';
        
        //Recorremos anuncios y añadimos la url correcta
        for ( let i of anuncios) {
            let nombreFoto = i.foto;
            i.foto = fullUrl + fotosdir + nombreFoto;
        }

        res.json({ succes: true, result: anuncios});

    });

});

// GET: Lista de tags disponibles

router.get('/tagslista', (req, res, next) => {
    console.log('Route tags lista');

    const filter = {};
    const soloTags = {tags:1,_id:0};
    let taglista = [];
    

    Anuncio.list(filter, null, null, soloTags, null , (err, anuncios) => {
        if(err) {
            next(err); // devuelve error
            return;
        }
        for (let i of anuncios){
        taglista = taglista.concat(i.tags);
        }
        //The Set is a built-in object available in ECMAScript 2015 (ES6)
        let sinDuplicados = Array.from(new Set(taglista));
        res.json({ succes: true, result: sinDuplicados});

    });
    
});

    

module.exports = router;