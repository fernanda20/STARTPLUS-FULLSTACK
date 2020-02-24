'use strict'
 
// Se agrega mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
// Se crea el objeto del esquema y se agregan los campos que tendrá
// indicando el tipo de dato que almacenará
var MessageSchema = Schema({
    message: String,
    sender: String,
    sendTime: String,
    timestamp: { type: Date, default: Date.now }
});
 
// Se exporta el modelo para usarlo en otros archivos
module.exports = mongoose.model('Message', MessageSchema);
