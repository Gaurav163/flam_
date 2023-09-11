const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Book = require("../models/book");


router.route("/").post(async (req, res) => {
    try {
        const book = await Book.findOne({ barcode: req.body.barcode });
        if (!book) {
            return res.status(400).send({ message: "Invalid barcode for book" });
        }
        let cart = await Cart.findOne({ email: req.user.email });
        if (cart) {
            cart.books[req.body.barcode] = req.body.quantity;
        }
        else {
            cart = new Cart();
            cart.email = req.user.email;
            cart.books = {};
            cart.books[req.body.barcode] = req.body.quantity;
        }

        await cart.updateOne(cart);
        return res.send({ cart });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})

router.route("/").get(async (req, res) => {
    try {

        let cart = await Cart.findOne({ email: req.user.email });

        return res.send({ cart });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})

router.route("/remove/:barcode").get(async (req, res) => {
    try {
        const book = await Book.findOne({ barcode: req.params.barcode });
        if (!book) {
            return res.status(400).send({ message: "Invalid barcode for book" });
        }
        let cart = await Cart.findOne({ email: req.user.email });
        if (!cart) {
            cart = new Cart();
            cart.email = req.user.email;
            cart.books = {};
        }

        delete cart.books.barcode;
        await cart.save();
        return res.send({ cart });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})


module.exports = router;
