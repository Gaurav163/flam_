const mongoose = require("mongoose");
const schema = mongoose.Schema;


const cartSchema = new schema(
    {
        email: { type: String, required: true },
        books: Object
    },
);



const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;