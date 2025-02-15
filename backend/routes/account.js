const express = require("express");
const { userAuth } = require("../middlewares");
const router = express.Router();
const {User , Account} = require("../db");
const mongoose = require("mongoose");
const zod = require("zod");


router.get('/balance' ,  userAuth , async (req,res)=>{

    try{const {balance} =  await Account.findOne({
        userId : req.userId
    })
    
    res.json({
        msg : "Got Balance" , 
        balance
    })}
    catch(err){
        console.log("User Account does not exist")
    }
    

})

const transferAuth = zod.object({

    to : zod.string(), 
    amount : zod.number()

})


router.post("/transfer" ,userAuth, async (req,res)=>{

    console.log(typeof(req.body.to));
    console.log(typeof(req.body.amount));
    
    const some = transferAuth.safeParse({
        to : req.body.to , 
        amount : Number(req.body.amount)
    });
    console.log(some);
    if(!some.success){
        return res.status(400).json({
            
            msg : "Invalid User"
            
        })
    }

    console.log(req.userId);
    
    const session  = await  mongoose.startSession();
    session.startTransaction();

    const firstUser = await Account.findOne({
        userId : req.userId
    }).session(session);

    if(!firstUser.balance || firstUser.balance < req.body.amount){

        await session.abortTransaction();

        return res.status(400).json({
            msg : "Balance is less than the required amount"
        })
    }

    const secondUser = await Account.findOne({
        userId : req.body.to
    }).session(session);

    if(!secondUser){
        await session.abortTransaction();
        return res.status(400).json({
            msg : "This Account does not exist"
        })
    }

    await Account.updateOne({
        userId : req.userId
    } , {
        "$inc" : {
            balance : -req.body.amount
        }
    }).session(session);

    await Account.updateOne({
        userId : secondUser.userId
    } , {
        "$inc" : {
            balance : req.body.amount
        }
    }).session(session);

    await session.commitTransaction();

    res.json({
        msg : "Transaction Complete"
    })




})
 




module.exports = router;