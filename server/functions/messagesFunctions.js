'use strict'
var Message = require('../models/Message');

async function getMessages(req, res) {
    try {
        let data = await Message.find({}).sort('+timestamp');
        return res.status(200).send({message: 'Requested messages', messages: data});
    } catch (error) {
        return res.status(500).send({message: 'Server error'});
    }
}

async function saveMessage(req,res) {
    try {
        if (!req.body.message) {
            return res.status(200).send({message: 'No message received.'});
        }
        let data = await Message.insertMany(req.body.message);
        if (!data) return res.status(200).send({message: 'Message no saved.'});

        return res.status(200).send({message: 'Message saved.', message: data});
    } catch (error) {
        return res.status(500).send({message: 'Server error'});
    }
}
 
// Se exportan las funciones en un objeto json para poder usarlas en otros archivos
module.exports = {
    getMessages,
    saveMessage
};


