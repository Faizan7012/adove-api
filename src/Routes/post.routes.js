const express = require("express");
const { createpost, getpostById, updateContentOfPost, deletepost, likePost, unlikePost, getAllpost, getTopPost } = require("../Controller/post.controller");
const postRoute = express.Router();

 // Create a post
postRoute.post("/", createpost);


// get all post
postRoute.get('/analytics' , getAllpost )


// get top 5 liked post
postRoute.get('/analytics/topliked' , getTopPost)


// Get a single post by postId
postRoute.get('/:id' , getpostById)

// update a post
postRoute.put('/:id' , updateContentOfPost)

// delete a post
postRoute.delete('/:id' , deletepost)

// like a post
postRoute.post('/like/:id' ,  likePost)

// unlike a post
postRoute.post('/unlike/:id' ,  unlikePost)



module.exports = postRoute