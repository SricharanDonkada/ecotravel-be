//MODELS
const transaction = require('../models/transaction')
const user = require('../models/user')

const express = require('express');
const router = express.Router();
const moment = require('moment');



// router.post('/add-credits', (req, res) => {
//     user.findOne({ phone: req.body.phone }).then((data) => {
//         user.findOneAndUpdate({ phone: req.body.phone }, { $inc: { credits: req.body.credits } }).then((doc) => {
//             res.json({ success: true })
//         }).catch((err) => {
//             res.json({ success: false, message: 'Something went wrong, please try again' })
//         })
//     })

// })


router.post('/transaction', (req, res) => {
    // console.log(req.body);
    user.findOne({ phone: req.body.phone }).then((d) => {
        // console.log(d);
        if (d == null) {
            res.json({ success: false, message: 'Account does not exist' });
        }
        else {
            let newTransaction = new transaction()
            newTransaction.phone = req.body.phone;
            newTransaction.comment = req.body.comment;
            newTransaction.credits = req.body.credits
            newTransaction.time = moment.unix();

            newTransaction.save().then((doc) => {
                user.findOneAndUpdate({ phone: req.body.phone }, { $inc: { credits: req.body.credits } }).then((data) => {
                    res.json({ success: true })
                }).catch((err) => {
                    res.json({ success: false, message: "Something went wrong, please try again" })
                })
            }).catch((err) => {
                res.json({ success: false, message: "Something went wrong, please try again" })
            })
        }
    })
})

router.get('/get-credits/:phone',(req,res)=>{
    user.findOne({phone: req.params.phone}).then((doc)=>{
        res.json({success: true, credits: doc.credits});
    }).catch((err)=>{
        res.json({success: false})
    })
});



module.exports = router;