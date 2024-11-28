const express=require('express');
const router=express.Router();
const { body,query, validationResult } = require('express-validator');
const User =require('../models/User');
const fetchuser=require('../middleware/fetchuser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';
//create auser using: Post "/api/auth/". Doesn't require auth
router.post('/createuser',[
    body('password','Enter a valid password').isLength({ min: 5 }),
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 3 }),
],async (req,res)=>{
    let success=true;
    const result = validationResult(req);
  if (!result.isEmpty()) {
    success=false;
    res.status(400).json({success, errors: result.array() });
  }
  try{
    let user=await User.findOne({email:req.body.email});
    if(user) {
      success=false;
      return res.status(400).json({success,error:"Sorry some user with same email exists"})
    }
    const salt =  bcrypt.genSaltSync(saltRounds);
    const myPlaintextPassword= req.body.password;
    const hash =  bcrypt.hashSync(myPlaintextPassword, salt);

    user =await User.create({
      name:req.body.name,
      password:hash,
      email:req.body.email,
    })
    const data={
      user:{
        id:user.id
      }
    }
    const jwtData=jwt.sign(data, JWT_SECRET);
    console.log(jwtData)
    res.json({success,user,jwtData})
  }
   catch (error){
    console.error(error.message);
    res.status(500).send("Some error occured");
   }
    
  })
  router.post('/login',[
    body('password','Password cannot be blank').exists(),
    body('email','Enter a valid email').isEmail(),
],async (req,res)=>{
    const result = validationResult(req);
    // console.log("hello");
    let success = false;
  if (!result.isEmpty()) {
    res.status(401).json({ errors: result.array() });
  }
  const {email,password}= await req.body;
  try{
    let user=await User.findOne({email:email});
    if(!user) {
      success=false;
      return res.status(400).json({success,error:"Please login using correct credentials"})
    }
    const passwordcompare=await bcrypt.compare(password,user.password);
    if(!passwordcompare) {
      success = false
      return res.status(401).json({success,error:"Please login using correct credentials"})
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json( {success,authtoken});
    console.log("hi i am inside backend");
  } catch (error){
    console.error(error.message);
    res.status(500).send("Some error occured");
   }
    
  })
  //ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports=router;

