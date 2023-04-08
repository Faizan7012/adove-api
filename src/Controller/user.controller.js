const userModel = require("../Model/user.model");
const jwt = require("jsonwebtoken");
const postModel = require("../Model/post.model");

// Create User
const createUser = async (req, res) => {
    const payload = req.body;
    try {
      const userFind = await userModel.find({ $or: [ { email : payload.email }, { name : payload.name }] })
      if(userFind.length >=1){
        res.send({message : 'User already exists with this email or username' , status: false});
      }
      else{
        const newUser = await userModel.create({...payload});
  
        res.send({message : 'User created successfully' , status: true , user: newUser});
      }
    } catch (err) {
      res.send({message : err.message , status: false});
    }
  }


  //user login
  const login = async(req , res)=>{
    const payload = req.body;
    try {
      const userFind = await userModel.find({ email : payload.email , password : req.body.password})
      if(userFind.length >=1){
      let token = jwt.sign({user_id: userFind[0]._id,email: userFind[0].email,},process.env.key,{ expiresIn: "30d"});
       res.send({message : 'Login successfull' , user : userFind[0], token})
      }
      else{
        res.send({message : 'Wrong credentials' , status: false});
      }
    } catch (err) {
      res.send({message : err.message , status: false});
    }
  }


  // Get Single User By Id
  const getUserById = async (req, res) => {
    const {id} = req.params;
    try {
      const userData = await userModel.find({_id : id})
      if(userData.length >=1){
        res.send({message : 'User finded successfully' , status: true , user : userData[0]});
      }
      else{
      res.send({message : 'User not found' , status: false});
      }
    } catch (err) {
      res.send({message : err.message , status: false});
    }
  }


   // Update users bio or Name
   const updateNameOrBio = async (req, res) => {
    const {id} = req.params;
    try {
      const userData = await userModel.find({_id : id})
      if(userData.length >=1){
          const updateUser = await userModel.findByIdAndUpdate(id , {
            name : req.body.name ,
            bio : req.body.bio
          })

          res.send({message : 'User updated successfully' , status: true });
      }
      else{
      res.send({message : 'User not found' , status: false});
      }
    } catch (err) {
      res.send({message : err.message , status: false});
    }
  }

   // Delete users by id
   const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
      const userData = await userModel.find({_id : id})
      if(userData.length >=1){
          const updateUser = await userModel.findByIdAndDelete(id)
          res.send({message : 'User deleted successfully' , status: true });
      }
      else{
      res.send({message : 'User not found' , status: false});
      }
    } catch (err) {
      res.send({message : err.message , status: false});
    }
  }

    // Get all users
    const getAllUsers = async (req, res) => {
      try {
        const userData = await userModel.find()
        res.send({message : 'All users fetched Successfully' , status: true , user: userData});
      } catch (err) {
        res.send({message : err.message , status: false});
      }
    }

       // Get top 5 active users
       const getTopUsers = async (req, res) => {
        try {
          const userData = await postModel.aggregate([
            {$group : {_id:"$user_id", count:{$sum:1}}}, {$sort :{count : -1}}, {$limit : 5}
          ])

          let topUsers = [];

            for(let ele of userData){
             let users = await userModel.findOne({_id : ele._id});
             topUsers.push({posts : ele.count , users})
             }

          res.send({message : 'All top actives users data fetched Successfully' , status: true , user: topUsers});
        } catch (err) {
          res.send({message : err.message , status: false});
        }
      }

  module.exports = {createUser , getUserById , updateNameOrBio , deleteUser ,getAllUsers , login , getTopUsers}