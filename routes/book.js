const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.route("/").post(async (req, res) => {
    try {
        let book = await Book.findOne({ barcode: req.body.barcode });
        if (book) {
            res.status(400).send("Book with given barcode already exist");
        } else {

            const newBook = new Book(req.body);
            await newBook.save();
            res.send(newBook);

        }
    }
    catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).send(errors);
        }
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})

router.route("/").get(async (req, res) => {
    try {
        const books = await Book.find({});
        res.send(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})

router.route("/:barcode").get(async (req, res) => {
    try {
        const book = await Book.findOne({ barcode: req.params.barcode });
        res.send(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})

router.route("/entry").post(async (req, res) => {
    try {
        let book = await Book.findOne({ barcode: req.body.barcode });
        if (!book) {
            return res.status(400).send({ message: "Invalid barcode for book" });
        }
        book.quantity += req.body.quantity;
        await book.save();
        res.send(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})

router.route("/update/:barcode").post(async (req, res) => {
    try {
        let book = await Book.findOne({ barcode: req.params.barcode });
        if (!book) {
            return res.status(400).send({ message: "Invalid barcode for book" });
        }
        book.title = req.body.title;
        book.price = req.body.price;
        book.genre = req.body.genre;
        book.author = req.body.author;
        await book.save()
        res.send(book);
    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).send(errors);
        }
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})



module.exports = router;
