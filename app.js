console.log('This is Express + Pug');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactus', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static' , express.static('/static')); // For serving static files
//request body config
app.use(express.urlencoded());

// PUG SPECIFIC CONFUG
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views' , path.join(__dirname , ('views')));

// ENDPOINTS
app.get('/' , (req , res)=>{
    res.status(200).render('index.pug')
})
const kittySchema = new mongoose.Schema({
    name: String ,
    age: String ,
    gender: String , 
    address: String ,
    more: String

  });

  const contact1 = mongoose.model('contact', kittySchema);

// app.post('/' , (req , res)=>{
//     console.log(req.body);
//     let name = req.body.name;
//     let age = req.body.age;
//     let gender = req.body.gender;
//     let address = req.body.address;
//     let more= req.body.more;
//     let string = `The clinet name is ${name} and his age is ${age} , he is ${gender} , his address is ${address} , the message is ${more}`;
//     fs.writeFileSync('output.txt' , string);
//     const message = {'message' : 'your form submitted'};
//     res.status(200).render('index.pug');
// })

app.post('/' , (req , res)=>{
    let myData = new contact1(req.body);
    myData.save().then(()=>{
        res.send("This item saved on database")
    }).catch(()=>{
        res.status(400).send("Item not saved")
    })
 
})

app.listen(port , ()=>{
    console.log(`This application started on ${port}`);
    
})