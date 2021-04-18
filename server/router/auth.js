const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

require('../db/conn');
var User=require('../model/userSchema')

router.get('/',(req,res)=>{
    res.send(`Hello World from routerjs`);
})

/*
router.post('/register',(req,res)=>{

 const {name,email,phone,work,password,cpassword} =req.body;

   if(!name|| !email || !phone|| !work || !password || !cpassword )
   return res.status(422).json({error:"fhbdfhjdbfhj"});

   User.findOne({email:email})
   .then((userExist)=>{
       if(userExist){
        return res.status(422).json({error:"Email Already exist"});
       }
       const user=new User({name,email,phone,work,password,cpassword});

       user.save().then(()=>{
           res.status(201).json({message:"user registered"})
       }).catch((err)=>res.status(500).json({error:"Failed to register"}))
   }).catch(err=>{console.log(err);})

})
*/


router.post('/register',async(req,res)=>{

 const {name,email,phone,work,password,cpassword} =req.body;

   if(!name|| !email || !phone|| !work || !password || !cpassword )
   return res.status(422).json({error:"fhbdfhjdbfhj"});
   else if(password != cpassword)
   return res.status(422).json({error:"fhbdfhjdbfhj"});
   else{
   try{

    const userExist=await User.findOne({email:email});
   
        if(userExist){
         return res.status(422).json({error:"Email Already exist"});
        }

        const user=new User({name,email,phone,work,password,cpassword});
 
        
        const userRegister=await user.save();
        if(userRegister)
            res.status(201).json({message:"user registered"});
        
    }catch(err)
   {console.log(err);}
   
   }
})

//login
router.post('/signin',async(req,res)=>{
    /*console.log(req.body);
    res.json({message:"Login Route"});*/
    try{
      let token;
  const {email,password}=req.body;
  if(!email || !password)
  return res.status(400).json({message:"Invalid data"});

  const userLogin=await User.findOne({email:email});

  

  if(userLogin){
    const isMatch=await bcrypt.compare(password,userLogin.password);

    token = await userLogin.generateAuthToken();
    console.log(token);

    res.cookie("jwtoken",token,{
      expires:new Date(Date.now()+25892000000),
      httpOnly:true
    });


    if(!isMatch)
    res.status(400).json({error:"Invalid credentials"});
    else
    res.status(200).json({message:"User registered!!"})
  }
  else{
    res.status(200).json({message:"Invalid credential;!!"})
  }

 
    }
    catch(err){
 console.log(err);
    }
})


module.exports=router;