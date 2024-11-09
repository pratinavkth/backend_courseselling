const jwt = require('jsonwebtoken');
const admincheck =async(req,res,next)=>{
    try{
        const headertoken = req.header('x-admin-token')
        if(!headertoken){
            res.status(400).send("token is invalid")
        }
        const verified = jwt.verify(headertoken,process.env.JWT_SECRET_KEY);

        if(!verified){
            return res.status(400).send("user is not verified");
        }
        console.log("verified id " + verified);
        req.admin = verified.id;
        req.headertoken= headertoken;
        console.log("req.admin id: "+req.admin);
        next();

    }
    catch(e){
        res.status(401).send("Please authenticate");
    }

}

module.exports = admincheck;