"use strict";

const basicAuth = require('basic-auth');
const Usuario = require('../models/Usuario');
var passwordHash = require('password-hash');
var CustomError =  require('../models/CustomError');


module.exports = ((req, res, next) => {
    // Recibo el lenguaje de la query
        let lang = req.query.lang
        let error = null;

    // Recibo el objeto de autenticación con mail y password
        const user = basicAuth(req);
        if(!user || user.name==="" || user.pass==="") {
            // Si esta vacio o falta algun elemento 401
            error = new CustomError('USER_AUTHENTICATION_FAILED_1_0',401,lang);
            next(error);
            return;
        }

    // Busco el usuario si no lo encuentro 401
        Usuario.findNombre(user.name, function(err, data){
            if(err) {
                next(err);
                return;
            }
            // Si existe el usuario nos devolvera un objeto con datos
            if (data.length === 0) {
                error = new CustomError('USER_AUTHENTICATION_FAILED_1_1',401,lang);
                next(error);
                return;
            }
            // Validar la password
            var claveUsuario = data[0].clave;
            if(!passwordHash.verify(user.pass, claveUsuario)){
                error = new CustomError('USER_AUTHENTICATION_FAILED_1_2',401,lang);
                next(error);
                return;
               
            }
            // Autenticación correcta
            next();
        });
});