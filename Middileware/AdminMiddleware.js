const jwt = require('jsonwebtoken'); 
const User = require('../Model/user');

const adminAuthenticate = async (req, res, next) => {
    
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
         if (user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
        }
        const {userName} = user;
        req.user = {userName};
        
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
}

exports = module.exports = adminAuthenticate;