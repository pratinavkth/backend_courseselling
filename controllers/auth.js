const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User,Admin, Course, Purchase} = require('../models/users');
const {authcheck,blacklistCheck} = require('../middelware/authcheck');
const authRouter = express.Router();
// const authcheck = require('../middleware/authcheck');


authRouter.post('/user/register',async(req,res)=>{
    try{
        console.log("user intercepted in registeration")
        const {name,email,password} = req.body;
        console.log(name);
        console.log(email);
        console.log(password);
        
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).send("User already exists");
        }
        console.log("ex")
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            name,
            email,
            password:hashedPassword,
        });

        await user.save();

    }
    catch(e){
        res.status(500).send(e);
    }
}); 

authRouter.post('/user/login',async(req,res)=>{
    try{
          const {email,password}= req.body;
          const user = await User.findOne({email});
          if(!user){
                return res.status(404).send("User not found");
          }
          const passwordMatch = await bcrypt.compare(password,user.password);
          if(!passwordMatch){
                return res.status(400).send("Invalid credentials");
            }
          const token = jwt.sign(
            {id:user._id},process.env.JWT_SECRET_KEY);
          res.json({token,user:{...user._doc}});
    }
    catch(e){
        res.status(500).send(e);
    }
});

authRouter.post('/user/updateuser',authcheck,async(req,res)=>{
    try{

        const{ name , email, password ,userId} = req.body;

        const user = await User.findOne(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        if(name) user.name = name;
        if(email) user.email = email;
        if(password) {
            const hashedPassword = await bcrypt.hash(password,10);
            user.password = hashedPassword;
        }

        await user.save();

        return res.status(200).send("User sucessfully updated");
    }
    catch(e){
        res.status(500).send(e);
    }
});

authRouter.get('/user/getallcourse',authcheck,async(req,res)=>{
    try{
        const all_course = await Course.find({});
        if (!all_course.length){
            return res.status(404).send("no course found");
        } 
        res.status(200).send(all_course)
    }catch(e){
        res.status(500).send(e);
    }
});

authRouter.post('/user/purchasecourse',authcheck,async(req,res)=>{
    try{
        const UserID = req.user._id;
        const {courseId} = req.body;

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(400).send("Course not found");
        }

        const existingPurchase = await Purchase.findOne({ UserID , courseId});
        if(existingPurchase){
            return res.status(400).send("You have already purchase this course");
        }

        const newPurchase = new Purchase({
            UserID,
            courseId,
            purchaseDate:Date.now()
        });

         await newPurchase.save();
    }
    catch(e){
        res.status(500).send(e);
    }
});

authRouter.post('/user/showpurchasedcourse',authcheck,async(req,res)=>{
    try{
        const userId = req.user._id;

        const purchasedCourses = await Purchase.find({userId}).populate('courseId');

        if(!purchasedCourses){
            return res.status(400).send("No purchase course found for this user");
        }

        const courses = purchasedCourses.map(Purchase=>{
            const course = Purchase.courseId;
            return{
                title:course.title,
                description:course.description,
                price:course.price,
                imageUrl:course.imageUrl,
                purchaseDate:Purchase.purchaseDate
            };
        });
        res.status(200).json(courses);
        
    }
    catch(e){
        res.status(500).send(e);
    }
});
const blacklistedTokens  = new set();

authRouter.get('/user/logout',authcheck,blacklistCheck ,async(req,res)=>{
    try{
        const token = req.headertoken;
        if(!token){
            return res.status(400).send("token missing");
        }

        blacklistedTokens.add(token);

        res.status(200).json({ message:" Logged out successfully. Token invalidated."});
    }
    catch(e){
        res.status(500).send(e);

    }
    // const token  = req.header;
})


module.exports = authRouter;


