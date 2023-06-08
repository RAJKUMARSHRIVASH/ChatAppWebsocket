const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    // const token = req.headers.authorization;

    // jwt.verify(token, "rajchatapp", (err, decoded) => {
    //     if (err) {
    //         res.json({ msg: err })
    //     }
    //     else if (decoded) {
    //         next();
    //     }
    // })
    next();
}

module.exports = authentication;