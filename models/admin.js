const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate:{
            validator:(value)=>{
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message:"Please enter a valid email",

        }
    },
    name:{
        type:String,

    },
    password:{
        type:String,
        required:true,
    },

});

const RegisterCourse = mongoose.Schema({
    courseName:{
        type:String,
    },
    description:{
        type:String,
    }
    
})

const admin = mongoose.Model("admin",AdminSchema);

module.exports={
    admin
}