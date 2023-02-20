const express = require('express');
const router = express.Router();
const db = require('../database/database.js')


router.get('/',(req,res)=>{
    res.redirect('/post');
});

router.get('/post',(req,res)=>{
    res.render('posts-list')
});

router.get('/new-post', async (req,res)=>{
    const [authorData] = await db.query('SELECT * FROM authors');
    console.log(authorData);
    res.render('create-post',{authors:authorData})
});

module.exports =router;