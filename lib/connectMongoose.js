"use strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;
const dbUri = 'mongodb://localhost/nodepopdb';

mongoose.Promise = global.Promise;

conn.on('error', err => {
    console.log('Error de conexion', err);
    proccess.exit(1);
});


conn.once('open', () => {
    console.log('Conectado a MongoDB');
});

mongoose.connect(dbUri);







