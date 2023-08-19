const express=require('express');
const router=express.Router();
const { body,query, validationResult } = require('express-validator');
const User =require('../models/User');
//create auser using: Post "/api/auth/". Doesn't require auth
router.post('/createuser',[
    body('password','Enter a valid password').isLength({ min: 5 }),
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 3 }),
],async (req,res)=>{
    // obj={
    //     a:'thois',
    //     number:34
    // }
    // console.log("hello")
    const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    //  const user=new User(req.body);
    // user.save();
    // res.json(req.body)
  }
  try{
    let user=await User.findOne({email:req.body.email});
    if(user) {
      return res.status(400).json({error:"Sorry some user with same email exists"})
    }
    user =await User.create({
      name:req.body.name,
      password:req.body.password,
      email:req.body.email,
    })
    res.json(user)
  }
  // .then(user=>res.json(user))
  // .catch(err=>{console.log(err)
  // res.json({error:"please enter a unique value for email",message:err.message})}); 
  // }
  
    // console.log(req.body)
    // const user=new User(req.body);
    // user.save();
   catch (error){
    console.error(error.message);
    res.status(500).send("Some error occured");
   }
   //res.json({"Nice":"nice"})
    
  })

module.exports=router;