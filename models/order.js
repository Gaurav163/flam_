const mongoose = require("mongoose");
const schema = mongoose.Schema;


const orderSchema = new schema(
    {
        email: { type: String, required: true },
        books: [],
        qty: { type: Number, default: 0 },
        price: { type: Number, default: 0 }
    },
);

const Order = mongoose.model("order", orderSchema);
module.exports = Order;