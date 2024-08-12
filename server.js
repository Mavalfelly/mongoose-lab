const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const Custy = require('./models/customer.js')
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//landing page//
app.get('/',(req,res)=>{
    res.render('home.ejs')
})
//database//
app.get('/cust', async (req,res)=>{
    try{
        res.json(await Custy.find({}))
    }catch (err){
        res.status(400).json(err)
    }
});

app.post('/cust', async (req,res)=>{
    try{
        res.json(await Custy.create(req.body))
    }catch (err){
        res.status(400).json(err)
    }
});
app.put('/cust/:id', async (req,res)=>{
    try{
        res.json(await Custy.findByIdAndUpdate(req.params.id, req.body))
    }catch (err){
        res.status(400).json(err)
    }
});

app.delete('/cust/:id', async (req,res)=>{
    try{
        res.json(await Custy.findByIdAndDelete(req.params.id))
    }catch (err){
        res.status(400).json(err)
    }
});
//EJS
app.post('/cust-ejs', async (req,res)=>{
    try{
        await Custy.create(req.body)
        res.redirect('/')
    }catch (err){
        res.status(400).json(err)
    }
});
app.get('/cust-ejs', async (req,res)=>{
    try{
        let x= await Custy.find(({}))
        console.log(x)
        res.render('./partials/custys.ejs', {x})
    }catch (err){
        res.status(400).json(err)
    }
});




app.listen(port, ()=>{
    console.log(`hello world this is ${port} `)
})