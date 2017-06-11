"use strict";

var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');
// podríamos recuperar el modelo con moongoose

//Con estas dos lineas autenticamos en cualquier parte
const basicAuth = require('../../lib/basicAuth');
router.use(basicAuth);

/* GET /apiv1/anuncios , poner mas anuncios para filtros*/
router.get('/', function(req, res, next) {
    
   const name = req.query.name; 

   //Creo el filtro vacio
   const filter = {};
   if (name) {
       filter.nombre = name;
   }
   Anuncio.list(filter, null, null, null, null, (err, anuncios) => {
        if(err) {
            next(err); // devuelve error
            return;
        }
        console.log('anuncios ' + anuncios.length);
        res.json({ succes: true, result: anuncios});

    });

});

// POST de anuncio no lo pide probar y quitar
router.post('/', (req, res, next) => { 
    console.log(req.body);
});

module.exports = router;