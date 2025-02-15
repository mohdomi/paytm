const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
const {User}  = require("./db");


async function userAuth(req,res,next){

    // console.log(req.headers.authorization);

    const cookie = req.headers.authorization;

    if(!cookie || !cookie.startsWith("Bearer")){
        return res.status(400).json({
            msg : "Authorization failed"
        })
    }


    const token = cookie.split(" ")[1];

    const {userId} =  jwt.verify(token , JWT_SECRET);

    const check = await User.findOne({
        _id : userId
    });

    console.log(check);
    if(check){
  
        req.userId = userId;

        next();

        return;

    }

    res.status(400).json({
        msg : "Authorization failed"
    })

}    


module.exports = {
    userAuth
}
