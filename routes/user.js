const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");


router.route("/signup").post(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            res.status(400).json({ message: "Email Already Used!" });
        } else {

            const newuser = new User(req.body);
            newuser.password = await User.hashPassword(newuser.password);
            await newuser.save();
            console.log(newuser);
            res.status(200).json({ user: newuser });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured" });
    }
})

router.route("/signin").post(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(400).json({ message: "User Not Exits" });
        } else {
            if (User.comparePasswords(req.body.password, user.password)) {
                const payload = {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
                const token = await jwt.sign(payload, process.env.JWT_SECRET_TOKEN,);
                res.cookie('auth_token', token, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000
                })
                res.status(200).json({ token, user: payload });
            }
            else {
                res.status(400).json({ message: "wrong Password" });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured" });
    }
})

module.exports = router;