require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri = process.env.DATABASE_URL;
const morgan = require('morgan');
const auth = require("./middlewares/auth");

mongoose.connect(uri)
    .then(() => console.log('Connection to DB successful'))
    .catch((err) => console.error(err, 'Error'));
mongoose.Promise = global.Promise;
mongoose.pluralize(null);

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));

app.get("/", async (req, res) => {
    res.send("hello");
})

app.use("/users", require("./routes/user"));
app.use("/books", auth, require("./routes/book"));
app.use("/cart", auth, require("./routes/cart"));
app.use("/orders", auth, require("./routes/order"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, (e) => {
    console.log("Server Stated at http://localhost:" + PORT);
});


