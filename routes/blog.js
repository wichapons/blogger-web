const express = require('express');
const router = express.Router();
const db = require('../database/database.js')


router.get('/',async (req,res)=>{
    res.redirect('/post');
});

router.get('/post',async (req,res)=>{
    const [postsDATA] = await db.query('SELECT posts.*,authors.name AS author_name FROM blog.posts INNER JOIN authors ON posts.author_id = authors.id;');
    //console.log(postsDATA[0].id);
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
await db.query('INSERT INTO posts (title,summary,body,author_id) VALUES (?)',[data])
res.redirect('/post')
});

router.get(('/view/:id'),async (req,res)=>{
    const postID = req.params.id;
    console.log(postID);
    const [postBody] = await db.query(`SELECT *  FROM posts INNER JOIN authors ON posts.author_id = authors.id WHERE posts.id = ${postID}`);
    if (!postBody || postBody.length===0){  //in case that user manually type in the post number and it's not found on our server
        console.log('hi');
        res.status(404);
        res.render('404')
    }else{
        res.render('post-detail',{postDetails:postBody});
    }
    
});

router.get('/new-post', async (req,res)=>{
    const [authorData] = await db.query('SELECT * FROM authors');
    console.log(authorData);
    res.render('create-post',{authors:authorData})
});

router.get('/edit/:id', async (req,res)=>{
    const postID = req.params.id;
    [postData] = await db.query(`SELECT posts.*,authors.name FROM posts INNER JOIN authors ON posts.author_id = authors.id WHERE posts.id = ${postID}  `)
    console.log(postData);
    if (!postData || postData.length === 0){
        res.status(404);
        console.log('hi');
        res.render('404');
    };
    //console.log('edit post ID:'+postID);
    res.render('update-post',{posts:postData})
});

router.post(('/view/:id'),async (req,res)=>{
    const postID = req.params.id;
    const editedData = req.body;
    console.log("EDITED POST ID:"+ postID);
    const [postBody] = await db.query(`UPDATE posts SET title = '${editedData.title}', summary = '${editedData.summary}', body='${editedData.content}'  WHERE posts.id = ${postID}`);
    console.log(postBody);
    if (!postBody || postBody.length===0){  //in case that user manually type in the post number and it's not found on our server
        console.log('hi');
        res.status(404);
        res.render('404')
    }else{
        res.redirect('/post');
    } 
});

router.get(('/post/delete/id=:id'),async (req,res)=>{
    const postID = req.params.id;
    console.log("Delete POST ID:"+ postID);
    const [postBody] = await db.query(`DELETE FROM posts WHERE posts.id=${postID}`);
    console.log(postBody);
    if (!postBody || postBody.length===0){  //in case that user manually type in the post number and it's not found on our server
        console.log('hi');
        res.status(404);
        res.render('404')
    }else{
        res.redirect('/post');
    } 
});

module.exports =router;