"use strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;
const dbUri = 'mongodb://mongo:27017/nodepopdb';

mongoose.Promise = global.Promise;

conn.on('error', err => {
    console.log('Error de conexion', err);
    proccess.exit(1);
});


conn.once('open', () => {
    console.log('Conectado a MongoDB');
});

mongoose.connect(dbUri);







