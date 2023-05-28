require("dotenv").config();
const jwt = require("jsonwebtoken");

const getUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({error: "Invalid token!"});
    }

    try {
        const data = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = data.user;
        console.log(data.user)
        next()
    } catch (error) {
        res.status(401).json({error: "Invalid token!"});
    }
}

module.exports = getUser;