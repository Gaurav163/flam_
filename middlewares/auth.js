const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            res.status(401).json({ message: "Please Sign In" });
        }
        else {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
            req.user = decodedToken;
            next();

        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Please Sign In" });
    }
}