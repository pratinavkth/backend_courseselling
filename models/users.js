const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
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

        },
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:(value)=>{
                return value.length >=8;

            },
            message:"Password must be at least 8 characters long",
        },
    },
});


const adminSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
});

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    imageUrl:{
        type:String,

    },
    creatorId:{
        type:ObjectId,
        ref:'Admin',
        required:true,
    },
});


const purchaseSchema = new mongoose.Schema({
    userId:{
        type:ObjectId,
        ref:'User',
        required:true

    },
    courseId:{
        type:ObjectId,
        ref: 'Course',
        required: true
    },
    purchaseDate:{
        type: Date,
        default:Date.now
    }
});



const User = mongoose.model('User',userSchema);
const Admin = mongoose.model("Admin",adminSchema);
const Course = mongoose.model("Course",courseSchema);
const Purchase = mongoose.model("Purchase",purchaseSchema);
module.exports = {
    User,
    Admin,
    Course,
    Purchase,
};