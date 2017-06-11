"use strict";

//Conexion a la base de datos
const mongoose  = require('mongoose');
const dbUri = 'mongodb://localhost/nodepopdb';
mongoose.Promise = global.Promise;


var passwordHash = require('password-hash');
const Anuncio   = require('../models/Anuncio');
const Usuario   = require('../models/Usuario');
const fs        = require('fs');
const path      = require('path');

// Funcion elimina las colecciones de anuncio y usuario si existieran

   function eliminarColecciones() {

       let p1 = Anuncio.collection.drop();
       p1.then((sc) => {
            console.log ("Eliminada coleccion de anuncio: " + sc);
       })
       .catch(function(rej){
            console.log("No existia coleccion anuncio: " + rej);
       });


       let p2 = Usuario.collection.drop();
       p2.then((sc) => {
            console.log ("Eliminada la coleccion de usuario: " + sc);
       })
       .catch(function(rej){
            console.log("No existia coleccion usuario: " + rej);    
       });
    
        return Promise.all([p2,p1]);
        
    }

// Añade nuevo usuario a la coleccion de usuarios
   
   function nuevoUsuario () {

       var usuario = new Usuario({ nombre: 'Alex',
                                    email: 'alex@nodepop.com',
                                    clave: '1234'
                                    });
     
     //pass para el hash
       var hashedPassword = passwordHash.generate('1234');
       usuario.pass = hashedPassword;

        usuario.save((err,usuarioGuardado) => {
            if (err){
                    console.log('ERR guardar usuario' + err);  
                    return;      
                }
                    console.log('OK usuario guardado ');
            });

   }
   // Carga los anuncios desde fichero

    function cargarAnuncios() {

        console.log("Cargando anunciones por defecto ...");

        var fichero = path.join(__dirname,'./anuncios.json');
        var obj;
        fs.readFile(fichero, 'utf8', function (err, data) {
            if (err) {
                console.log('No se ha podido leer fichero: ' + err);
                return;
            }
            //Obtener array de anuncios
            const objParse = JSON.parse(data);
    
            var promise = Anuncio.insertMany(objParse.anuncios,(err, result) => {
                if (err){
                    console.log("Error insertar anuncios fichero");
                    return;
                }            
            });

        });

    }

// Main
//Despues de conectar con la db realizamos operaciones    

mongoose.connect(dbUri)
.then(() => {
        eliminarColecciones()
        .then(() => {
            cargarAnuncios();
            nuevoUsuario();
            
        })
        .catch((err) =>{
            console.log("No se ha podido eliminar" + err);
            cargarAnuncios();
            nuevoUsuario();
        })
})
.catch(function (err) {
        console.log("Se ha producido un error " + err);
 });
   