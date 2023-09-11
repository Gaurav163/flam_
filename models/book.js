const mongoose = require("mongoose");
const schema = mongoose.Schema;


const bookSchema = new schema(
    {
        barcode: { type: String, required: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 0 },
    },
);

const Book = mongoose.model("book", bookSchema);
module.exports = Book;