const express = require('express');
const router = express.Router();
const db = require('../database/database.js')



router.get('/',(req,res)=>{
    res.redirect('/post');
});

router.get('/post',async (req,res)=>{
    res.render('posts-list')
});

router.post('/post',async (req,res)=>{
    const formData = req.body;
    const data = [
    formData.title,
    formData.summary,
    formData.content,
    formData.author
]
console.log(data);
await db.query('INSERT INTO posts (title,summary,body,author_id) VALUES (?)',[data])
res.redirect('/post')
});




router.get('/new-post', async (req,res)=>{
    const [authorData] = await db.query('SELECT * FROM authors');
    console.log(authorData);
    res.render('create-post',{authors:authorData})
});

module.exports =router;