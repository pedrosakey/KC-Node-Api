"use strict";

const mongoose = require('mongoose');

//Schema

const usuarioSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    clave: { type: String, required: true },
     
});



usuarioSchema.statics.findNombre = function (name, cb) {
    Usuario.find({'nombre': name}, cb);
}

const Usuario = mongoose.model('Usuario', usuarioSchema);



module.exports = Usuario;


//Custom validators

Usuario.schema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email); // Assuming email has a text attribute
}, 'Síntaxis incorrecta');