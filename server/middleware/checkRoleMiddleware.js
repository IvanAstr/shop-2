const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1] //Bearer sfdfsdfasdasdasda
            if (!token) {
                return res.status(401).json({ message: "Не авторизован3" });
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({ message: "У вас не тправ доступа" });

            }
            req.user = decoded
            next();
        }
        catch (e) {
            return res.status(401).json({ message: "Не авторизован4" });
        }
    }
}

// fn('ADMIN')