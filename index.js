const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

app.use(cors());
app.use(bodyparser.json());

mongoose.connect('mongodb+srv://ecotravel:ecotravel@cluster0.dgzky.mongodb.net/ecotravel?retryWrites=true&w=majority').then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})


app.get('/',(req,res)=>{
    res.end("yoo guys!!!");
});

app.use('/auth', authRoute);



app.listen(process.env.PORT || 3030,()=>{console.log('listening on port 3030')});