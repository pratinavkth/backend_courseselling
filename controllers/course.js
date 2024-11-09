const express = require("express");

const courseRouter = express.Router();

courseRouter.get('courses/allcourse',async(req,res)=>{
    try{
    // const course =  
    const allcourse = await courseRouter.finOne();

    res.json(allcourse);
    }
    catch(e){
        res.status(500).status("Cant fetch server issue");
    }

});

courseRouter.post('courses/purchasecourse',async(req,res)=>{
    try{
        const {userId,courseId} = req.body;

        // const purchasecourse = await 
    }
    catch(e){
        res.status(500).status("");
    }

});

courseRouter.post('courses/buyedcourse',async(req,res)=>{
    try{}
    catch(e){
        res.status(500).status("");
    }

});

courseRouter


module.exports ={
    courseRouter
};