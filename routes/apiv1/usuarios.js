"use strict";

var express = require('express');
var router = express.Router();
const Usuario = require('../../models/Usuario');
var passwordHash = require('password-hash');

/*GET /apiv1/usuarios */
router.post('/', function(req, res, next) {
    console.log(req.body.nombre);
    var passHash = passwordHash.generate(req.body.clave);
    var usuario = new Usuario({ nombre: req.body.nombre,
                                email: req.body.email,
                                clave: passHash
                            });
    // Al guardar el el usuario se valida con su esquema           
    usuario.save((err) => {
                if (err){
                        next(err);
                        return;      
                    }
                        res.json({ succes: true });
                });


});

module.exports = router;