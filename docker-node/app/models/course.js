'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({

    cursename: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'O slug é obrigatório'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }]
}); 

module.exports = mongoose.model('Course', courseSchema)
