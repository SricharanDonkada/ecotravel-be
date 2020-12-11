const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.post('/signin',(req,res)=>{
    user.findOne({phone: req.body.phone}).then((doc)=>{
        if(doc == null){
            let newAccount = new user({
                username: req.body.username,
                phone: req.body.phone,
                password: req.body.password,
                credits: 0
            });

            newAccount.save().then((doc)=>{
                res.json({success: true});
            }).catch((err)=>{
                res.json({success:false, message:'Something went wrong, please try again'});
            });
            
        }else{
            res.json({success:false, message:'Account already exists, try to signing in'});
        }
    }).catch(console.log);
});