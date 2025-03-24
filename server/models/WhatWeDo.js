require('../config/dataBase')
const mongoose = require('mongoose')


const WhatWeDo = new mongoose.Schema({

service: [
    {
        uniqueId: { type: String, default: '' },
        head: { type: String, default: '' },
        body: { type: String, default: '' },
    }
]

}, { collection : "whatWeDo" });

module.exports = mongoose.model('whatWeDo', WhatWeDo);  