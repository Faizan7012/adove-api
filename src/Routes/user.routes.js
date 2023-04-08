const express = require("express");
const { createUser, getUserById, updateNameOrBio, deleteUser, getAllUsers, login, getTopUsers } = require("../Controller/user.controller");
const { upload } = require("../Utils/multer");

const userRoute = express.Router();

 // Create a user
userRoute.post("/",upload.single("img"),createUser);

// get top 5 liked post
userRoute.get('/analytics/top_active' , getTopUsers)

// user login
userRoute.post("/login",login);

// Get a user by userId
userRoute.get('/:id' , getUserById)

// update user name or bio
userRoute.put('/:id' , updateNameOrBio)

// delete user by id
userRoute.delete('/:id' , deleteUser)

// get all user 
userRoute.get('/analytics' , getAllUsers)



module.exports = userRoute