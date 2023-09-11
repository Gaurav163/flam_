const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listItemSchema = new schema(
    {
        barcode: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }
)

const orderSchema = new schema(
    {
        email: { type: String, required: true },
        books: [listItemSchema],
        qty: { type: Number, required: true },
        price: { type: Number, required: true }
    },
);

const Order = mongoose.model("order", orderSchema);
module.exports = Order;