const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {
    if(req.method === 'OPTIONS'){
        next();
    }

    try{
        console.log("1")

        const token = req.headers.authorization.split(' ')[1] //Bearer sdfkemlfkmkdsmcfds
        console.log("2")

        if(!token){
            return res.status(401).json({message:"Не авторизован1"});
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next();
    }
    catch(e){
        res.status(401).json({message:"Не авторизован2"});
    }
};