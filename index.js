const express=require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const Mong_DB_URL = process.env.DB_URL;
const  authRouter  = require('./controllers/auth');
const { courseRouter } = require('./controllers/course');
const { adminRouter } = require('./controllers/admin');


app.use(express.json());
app.use(authRouter);
app.use(adminRouter);

app.use(courseRouter);




async function databaseConnetion(){
    await mongoose.connect(Mong_DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    } );
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });

    console.log("connected to the port")

}

databaseConnetion();
