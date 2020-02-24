'use strict'
// Se agrega express para creación de rutas
var express = require('express');
// Se agrega el archivo que contiene las funciones que serán utilizadas
var messagesFunctions = require('../functions/messagesFunctions');
// Se agrega el router
var api = express.Router();

api.get('/getMessages', messagesFunctions.getMessages);
api.post('/saveMessage', messagesFunctions.saveMessage);
 
// Se exporta la configuración
module.exports = api;
