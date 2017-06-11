"use strict";

const basicAuth = require('basic-auth');
const Usuario = require('../models/Usuario');
var passwordHash = require('password-hash');


module.exports = ((req, res, next) => {
    const user = basicAuth(req);
    console.log('user', user);
    console.log(user);
        Usuario.findNombre(user.name, function(err, data){
            if(err) {
                console.log('Se ha producido un error' + err);
            }
            if (data.length === 0) {
            console.log('No existe ese nombre de usuario');
            return res.status(401).send({message: 'Error nombre'});
            }
            // Validar la password
            var claveUsuario = data[0].clave;
            if(!passwordHash.verify(user.pass, claveUsuario)){
                return res.status(401).send({message: 'Error pass'});
            }
            next();
        });
});