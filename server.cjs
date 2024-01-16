require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/users.cjs')
const Service = require('./models/service.cjs')
app.use(cors({credentials:true, origin:'http://localhost:5173'}));
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 6; 
app.use(express.json());
const jwt = require('jsonwebtoken');
const cookieParser= require('cookie-parser');
app.use(cookieParser());

const jsxViewEngine = require('jsx-view-engine');
app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

const secret = process.env.SECRET
// const path = require('path');
// const jsxViewEngine = require('jsx-view-engine');
// const methodOverride = require('method-override');
// app.use(methodOverride('_method'));
const mongoURI = process.env.MONGO_URI;


app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
});
// // Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

const methodOverride = require('method-override');

app.use(methodOverride('_method'));

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));




// The following "catch all" route (note the /*) is necessary
// to return the index.html on all non-AJAX requests
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));

// });
app.post('/register', async (req,res)=>{
    const {username,password} = req.body;
   try{
    const mernUser = await User.create(
        {username,
        password:bcrypt.hashSync(password,SALT_ROUNDS)});
    res.json(mernUser);
   }
   catch(e){
    res.status(400).json(e);
   }  
});

app.post('/login', async (req, res) =>{
    const {username, password} = req.body;
    const userDB = await User.findOne({username});
    const validPass = bcrypt.compareSync(password, userDB.password)
    // res.json(validPass);
    if(validPass){
        //user logged in
        jwt.sign({username, id:userDB._id}, secret, {}, (err, token)=>{
        if(err) throw err;
        res.cookie('token', token).json('ok');
        })
        
    }
    else{
        res.status(400).json('wrong credentials')
    }
})

app.get('/profile', async (req, res)=>{
    const {token} = req.cookies;
    
    jwt.verify(token, secret, {}, (err, info)=>{
       if (err)
       {res.json('fail')} 
       else{
       res.json(info);
       }
     })
//    res.json(req.cookies)
})

app.post('/logout', (req, res)=>{
    res.cookie('token', '').json('ok');
})

app.post('/create', async(req, res)=>{
    const {firstname,lastname,servicetype,cellphone} = req.body;
   try{
    const mernService = await Service.create(
        {firstname,lastname,servicetype,cellphone});
     
    res.json(mernService);
   }
   catch(e){
    res.status(400).json(e);
   } 
})

  //api end points for Edit Index Show pages 

  ///api end point for Index page

app.get('/services/', async (req, res) => {
    const userService = await Service.find();
    res.json(userService) 
 
    
});

// api end point for show page

app.get('/services/:id', async (req, res) => {
     const {id} = req.params;
    try {
        const userShow = await Service.findById(id);
        res.json(userShow)
        
    } 
    catch(err){
        res.status(400).send(err);
    }
    
})

// api end point for delete

app.delete('/services/delete/:id', async (req, res) => {
    const {id} = req.params;
   
   try {
       const del = await Service.findByIdAndDelete(id);
       
       res.json(del)
   } catch (err) {
       res.status(400).send(err);
   }
})

//api end point for update
app.put('/services/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const updatedService = await Service.findByIdAndUpdate(
            id,
            req.body,
            { new: true },
        );
        
        res.json(updatedService)
    } catch (err) {
        res.status(400).send(err);
    }
 })
//





app.listen(4000, function () {
    console.log('Express app running on port: 4000');
})