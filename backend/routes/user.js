const express = require("express");
const mongoose = require("mongoose");
const zod = require('zod');
const router = express.Router();
const {User , Account} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {userAuth} = require("../middlewares");

const signUpAuth = zod.object({

    username : zod.string().email() , 
    firstname: zod.string() , 
    lastname : zod.string(), 
    password : zod.string()

})


router.post('/signup' , async (req,res)=>{

    const user = req.body ;

    console.log(user);

    const {success} = signUpAuth.safeParse({
        username : user.username , 
        firstname : user.firstname , 
        lastname : user.lastname , 
        password : user.password
    });
 
    if(!success){
        return res.status(400).json({
            msg : "Invalid Inputs"
        })
    }

    const response = await User.findOne({username : user.username})

    if(response){
        return res.status(400).json({
            msg : "User ALready Exists"
        })
    }
 
    const {_id} = await User.create({
        username : user.username , 
        firstname : user.firstname ,
        lastname : user.lastname , 
        password : user.password
    })

    await Account.create({
        userId : _id , 
        balance : 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId : _id
    } , JWT_SECRET);


    res.status(200).json({
        msg : "User Created" , 
        token
    })



})


const signInAuth = zod.object({
    username : zod.string().email() , 
    password : zod.string()
})


router.post('/signin' , async (req,res)=>{

    const user = req.body;
    

    const {success} = signInAuth.safeParse(user);

    if(!success){
        return res.status(400).json({
            msg : "Invalid Inputs"
        })
    }

    const checkUser = await User.findOne({
        username : user.username , 
        password : user.password
    })

    if(!checkUser){
        return res.status(400).json({
            msg : "User does not exist"
        })
    }

    const token = jwt.sign({
        userId : checkUser._id
    } , JWT_SECRET);


    res.status(200).json({
        msg : "Successfully SignedIn",
        token
    })



})

const updateAuth = zod.object({
    password : zod.string().optional() , 
    firstname : zod.string().optional() , 
    lastname : zod.string().optional()
})


router.put('/update' ,userAuth ,async (req,res)=>{

    const user = req.body;

    const {success} = updateAuth.safeParse({
        password : user.password , 
        firstname : user.firstname , 
        lastname : user.lastname
    }); 

    if(!success){
        return res.status(400).json({
            msg : "Invalid Inputs"
        })
    }

    await User.updateOne({
        _id : req.userId 

    } , user)
 
    res.json({
        msg:  "Profile Updates Successfully"
    })


})


router.get('/bulk' ,userAuth, async (req,res)=>{

    const filter = req.query.filter || "";

    const users = await User.find({
        "$or" : [{
            firstname : {"$regex" : filter}
        } , {
            lastname : {"$regex" : filter}
        }]
    })

    res.json({
        msg : "Users called successfully" , 
        users : users.map((user)=>{
            return {
                username : user.username , 
                firstname : user.firstname , 
                lastname : user.lastname ,
                id : user._id
            }
        })
    })

})
 

module.exports = router