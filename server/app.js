const dotenv=require("dotenv");
const express=require('express');
const app=express();
const mongoose=require('mongoose')
const User=require('./model/userSchema');


dotenv.config({path:'./config.env'});
//MIDDleware
require('./db/conn');

app.use(express.json());

app.use(require('./router/auth'));


const PORT=process.env.PORT;


const middleware=(req,res,next)=>{
    console.log('Holla MIDDLEWARE');
    next();
}

/*mongodb+srv://pk22:<password>@cluster0.yj5w9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority*/
app.get('/',(req,res)=>{
  res.send("HELLO WORLD")
});

app.get('/about',middleware,(req,res)=>{
    console.log("ABOUT");
    res.send("Hello from about us Page!!");
})

app.get('/contact',(req,res)=>{
    res.send("Wohoo!! We got a contact page!!");
})
app.get('/signin',(req,res)=>{
    res.send("Wohoo!! We got a signin page!!");
})
app.get('/signup',(req,res)=>{
    res.send("Wohoo!! We got a signup page!!");
})

app.listen(PORT,()=>{
    console.log(`Server is up and Running on ${PORT}`);
})

