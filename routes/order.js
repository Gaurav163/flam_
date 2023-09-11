const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Book = require("../models/book");
const Order = require("../models/order");

router.route("/").post(async (req, res) => {
    try {

        let cart = await Cart.findOne({ email: req.user.email });
        if (!cart) {
            return res.status(400).send({ message: "Cart is Empty" });
        }
        let barcodes = Object.keys(cart.books);
        console.log(cart);
        if (barcodes.length == 0) {
            return res.status(400).send({ message: "Cart is Empty" });
        }
        const order = new Order();
        order.email = req.user.email;
        let books = []

        order.qty = 0;
        order.price = 0;

        let x = barcodes.map(async barcode => {
            let book = await Book.findOne({ barcode: barcode });

            let item = {
                barcode,
                quantity: cart.books[barcode],
                price: book.price
            }
            order.books.push[item];

            order.qty += cart.books[barcode];
            order.price += book.price * cart.books[barcode];

        });
        if (x) { }

        cart.books = {};
        await cart.save();
        await order.save();
        res.send({ order });



    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})

router.route("/").get(async (req, res) => {
    try {
        const orders = await Order.find({ email: req.user.email });
        res.send(orders);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})




module.exports = router;

