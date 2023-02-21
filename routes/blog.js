const express = require('express');
const router = express.Router();
const db = require('../database/database.js')




router.get('/',async (req,res)=>{
    res.redirect('/post');
});

router.get('/post',async (req,res)=>{
    const [postsDATA] = await db.query('SELECT posts.*,authors.name AS author_name FROM blog.posts INNER JOIN authors ON posts.author_id = authors.id;');
    console.log(postsDATA);
    res.render('posts-list',{posts:postsDATA});
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