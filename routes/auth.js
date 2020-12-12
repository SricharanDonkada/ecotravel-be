const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.post('/signup',(req,res)=>{
    user.findOne({phone: req.body.phone}).then((doc)=>{
        if(doc == null){
            let newAccount = new user({
                username: req.body.username,
                phone: req.body.phone,
                password: req.body.password,
                credits: 0
            });

            newAccount.save().then((doc)=>{
                res.json({success: true, response:doc});
            }).catch((err)=>{
                res.json({success:false, message:'Something went wrong, please try again'});
            });
            
        }else{
            res.json({success:false, message:'Account already exists, try signing in'});
        }
    }).catch(console.log);
});


router.post('/signin',(req,res)=>{
    user.findOne({phone:req.body.phone}).then((doc)=>{
        if(doc == null){
            res.json({success:false, message:'Your does not exit, try signing up'});
        }
        else{
            if(doc.password == req.body.password){
                res.json({success:true, response: doc});
            }else{
                res.json({success:false, message:'Incorrect password'});
            }
        }
    }).catch((err)=>{
        res.json({success:false, message:'Something went wrong, please try again'});
    });
});

module.exports = router;