"use strict";

const mongoose = require('mongoose');

// Primero definimos el esquema

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// Creamos metodo estatico
anuncioSchema.statics.list = function (filter, limit, skip, fields, sort, callback) {
    const query = Anuncio.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    query.exec(callback);
};
// Segundo  creamos el modelo

var Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Realmente no es neceario exportarlo, ya que en otros 
// sitios podríamos recuperar el modelo usando
// moongose.model('Anuncio')

module.exports = Anuncio;