const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookTitle: String,
    meanRating: Number,
    sumOfReads: Number
}, {collection : "books"})

module.exports = mongoose.model("book", bookSchema)