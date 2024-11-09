const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const {Admin,Course,Purchase,User} = require("../models/users");
// const { admin } = require("../models/admin");
const admincheck = require("../middelware/admincheck");

const adminRouter = express.Router();

adminRouter.post("/admin/signup",async(req,res)=>{
    
    try{
        console.log("Admin Check intercepted");
    const{ email,password,firstname,lastname}= req.body;
    console.log(email,password);
    const emailexist = await Admin.findOne({email});
    console.log("email  existed check ");
    if(emailexist){
        return res.status(400).send("User alredy exist");

    }
    console.log("email is not exist");

    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Password is hashed");
    const admin = new Admin({
        firstname,
        lastname,
        email,
        password:hashedPassword,
    });
    console.log("data is saved");
  
    await admin.save();
    res.status(201).send("Admin registered successfully");
    }
    catch(e){
        res.status(500).send(e);
    }

});

adminRouter.post("/admin/signin",async(req,res)=>{
    
    try{
        const{email,password} = req.body;
    console.log("sign in intercepted");

        const emailexist  = await Admin.findOne({email});
        console.log("email existed ");
    if(!emailexist){
        res.status(400).send("user not found please register");

    }
    console.log("email existed or nto")
    
    const passwordcompare = await bcrypt.compare(password,emailexist.password);
    console.log("compare password intercepted");
    if(!passwordcompare){
        res.status(400).send("password is incorrect");
    }
    console.log("password compare done");
    const admintoken = jwt.sign(
        {id:emailexist._id},process.env.JWT_SECRET_KEY
    );
    res.json({admintoken,Admin:{...Admin.doc}});
    console.log(admintoken);
    }
    catch(e){
        res.status(500).send(e);
    }
});

adminRouter.post("/admin/createcourse",admincheck,async(req,res)=>{
    try{
        const {title,description,price,imageUrl} = req.body;
        const creatorId = req.admin;
        console.log("Creator ID:", creatorId);
        console.log("course info");
        if (!creatorId) {
            return res.status(400).send("Creator ID is missing");
        }

        const newcourse = new Course({
            title,
            description,
            price,
            imageUrl,
            creatorId,
        });

        console.log("new course save");
        await newcourse.save();
        console.log("course saved");
        const courseId = newcourse._id;
        console.log("Course created with Id : ",courseId );
        console.log(newcourse);
        res.status(201).send(newcourse);
    }
    catch(e){
        res.status(500).send(e);
    }
    

});

adminRouter.post("/admin/updatecourse",admincheck,async(req,res)=>{
    try{
        const{courseId,title,description,price,imageUrl} = req.body;

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).send("course not found");
        }
        if(title) course.title = title;
        if(price) course.price = price;
        if(description) course.description = description;
        if(imageUrl) course.imageUrl = imageUrl;
        
        await course.save();

        res.status(200).send("course updated sucessfully");
    }
    catch(e){
        res.status(500).send(e);
        }
});


adminRouter.delete("/admin/deletecourse",admincheck,async(req,res)=>{
    try{
        const { courseId } = req.body;
        const course = await Course.findByIdAndDelete(courseId);

        if(!course){
            return res.status(404).send("course not found");
        }

        return res.status(200).send("course sucessfully deleted")
    }
    catch(e){
        res.status(500).send(e);
    }
});

adminRouter.get("/admin/allcourses",admincheck, async(req,res)=>{
    const adminId = req.admin._id;
    try{
        const courses = await Course.find(adminId);
        if(!courses.length){
            return res.status(404).send("No courses found for this admin");
        }
        res.status(200).json(courses);
    }
    
    catch(e){
        return res.status(500).send(e);
    }
});

module.exports ={
    adminRouter:adminRouter
}

