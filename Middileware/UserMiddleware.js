const jwt = require('jsonwebtoken'); 
const User = require('../Models/User');
const cookieParser = require("cookie-parser"); 



const userAuthenticate = async (req, res, next) => {
    
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log("Authentication middleware called");
            return res.status(401).json({ message: "Unauthorized 1" });
        }
        
        const decoded = jwt.verify(token, 'aman');
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const {userName} = user;
        req.user = {userName};
        
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
}

exports = module.exports = userAuthenticate;