const jwt = require("jsonwebtoken");

const authcheck = async(req,res,next)=>{
    try{
        const token = req.header('x-auth-token')
        if(!token){
            return res.status(401).send("Please authenticate");
        }
        const verified= jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!verified){
            return res.status(401).send("Please authenticate");
        }
        req.user = verified.id;
        req.token= token;
        next();
    }
    catch(e){
        res.status(401).send("Please authenticate");
    }
}

module.exports = authcheck;