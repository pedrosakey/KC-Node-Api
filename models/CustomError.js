'use strict';

    const CustomError = function (messageKey, status, lang) {

        // Añadimos el status
        this.status = status;

        // Si no se ha especificado el idioma o el idioma es 
        // ingles por defecto
        if (!lang || lang === 'en') {
            this.message = langMap.get(messageKey).en;
        }
        else {
            this.message = langMap.get(messageKey)[lang];
        }
    }

    // Cambiar este Map por un JSON para cargar
    const langMap = new Map();

    langMap.set ('IS_NOT_API_REQUEST',
                {'en' : 'API Request Fail',
                 'es' : 'Error en la petición a la API'});

    langMap.set ('USER_AUTHENTICATION_FAILED_1_0',
                {'en' : 'User Authentication Fail: Name and Password Required',
                 'es' : 'Fallo de autenticacion: Nombre de usuario y contraseña requerida'});
   
    langMap.set ('USER_AUTHENTICATION_FAILED_1_1',
                {'en' : 'User Authentication Fail: User Name',
                 'es' : 'Fallo de autenticacion: Nombre de usuario'});

    langMap.set ('USER_AUTHENTICATION_FAILED_1_2',
                {'en' : 'Use Authentication Fail: PassWord',
                 'es' : 'Fallo de autenticacion: Error contraseña'});


module.exports = CustomError;

