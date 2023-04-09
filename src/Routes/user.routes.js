const express = require("express");
const { createUser, getUserById, updateNameOrBio, deleteUser, getAllUsers, getTopUsers } = require("../Controller/user.controller");

const userRoute = express.Router();

 // Create a user
userRoute.post("/",createUser);

// get all user 
userRoute.get('/analytics' , getAllUsers)

// get top 5 liked post
userRoute.get('/analytics/top_active' , getTopUsers)

// Get a user by userId
userRoute.get('/:id' , getUserById)

// update user name or bio
userRoute.put('/:id' , updateNameOrBio)

// delete user by id
userRoute.delete('/:id' , deleteUser)




module.exports = userRoute