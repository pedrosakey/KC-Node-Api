/*No están personalizados los errores, pendiente probar Plugin. Unificar.

mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema.

This makes error handling much easier, since you will get a Mongoose validation error when you attempt to violate a unique constraint, rather than an E11000 error from MongoDB.*/

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
   console.log(emailRegex.test(email));
   return emailRegex.test(email); // Assuming email has a text attribute
}, 'USER_INVALID_EMAIL');