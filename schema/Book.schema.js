const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    status: { type: String },
});


module.exports = bookSchema;