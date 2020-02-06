const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    // same as the GQL schema 
    // no need for id, cuz Mongoose auto assigns
    name: String,
    genre: String,
    author: String
});

module.exports = mongoose.model("Book", bookSchema, 'books');
// Mongoose: name of the schema, and ref the schema