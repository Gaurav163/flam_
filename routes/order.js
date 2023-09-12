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
        if (barcodes.length == 0) {
            return res.status(400).send({ message: "Cart is Empty" });
        }
        let order = new Order({ email: req.user.email });

        let books = await Book.find({ barcode: barcodes });
        order.books = [];
        books.forEach((book) => {
            let item = {
                barcode: book.barcode,
                quantity: cart.books[book.barcode],
                price: book.price
            }
            order.books.push(item);

            order.qty += cart.books[book.barcode];
            order.price += book.price * cart.books[book.barcode];
        })

        cart.books = {};

        await order.save();
        await cart.save();
        return res.send(order);

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
});


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

