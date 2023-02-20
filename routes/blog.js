const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.redirect('/post');
});

router.get('/post',(req,res)=>{
    res.render('posts-list')
});

router.get('/new-post',(req,res)=>{
    res.render('create-post')
});


module.exports =router;