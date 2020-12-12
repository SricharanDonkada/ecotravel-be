//MODELS
const transaction = require('../models/transaction')
const user = require('../models/user')

const express = require('express');
const router = express.Router();
const moment = require('moment');



router.post('/add-credit',(req,res)=>{
    user.findOne({phone : req.body.phone}).then((data)=>{
        user.findOneAndUpdate({phone: req.body.phone},{$inc:{credits: req.body.credits}}).then((doc)=>{
            res.json({success: true})
        }).catch((err)=>{
            res.json({success:false , message :'Something went wrong, please try again'})
        })
    })
    
})


router.post('/transaction',(req,res)=>{
    let newTransaction = new transaction()

    newTransaction.phone= req.body.phone;
    newTransaction.busid = req.body.busid;
    newTransaction.credits = req.body.credits
    newTransaction.time = moment.unix();

    newTransaction.save().then((doc)=>{
        let num = 0-req.body.credits
        user.findOneAndUpdate({phone: req.body.phone},{$inc : {credits : num}}).then((data)=>{
            res.json({success : true})
        }).catch((err)=>{
            res.json({success : false, message :"Something went wrong, please try again"})
        })
    }).catch((err)=>{
        res.json({success : false, message :"Something went wrong, please try again"})
    })
})