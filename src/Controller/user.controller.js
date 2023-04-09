const userModel = require("../Model/user.model");
const postModel = require("../Model/post.model");

// Create User
const createUser = async (req, res) => {
    const payload = req.body;
    try {
      const userFind = await userModel.find({ $or: [ { email : payload.email }, { name : payload.name }] })
      if(userFind.length >=1){
        res.status(401).send({message : 'User already exists with this email or username' , status: false});
      }
      else{
        const newUser = await userModel.create({...payload});
        res.status(200).send({message : 'User created successfully' , status: true , user: newUser});
      }
    } catch (err) {
      res.status(401).send({message : err.message , status: false});
    }
  }


  // Get Single User By Id
  const getUserById = async (req, res) => {
    const {id} = req.params;
    try {
      const userData = await userModel.find({_id : id})
      if(userData.length >=1){
        res.status(200).send({message : 'User finded successfully' , status: true , user : userData[0]});
      }
      else{
      res.status(404).send({message : 'User not found' , status: false});
      }
    } catch (err) {
      res.status(401).send({message : err.message , status: false});
    }
  }


   // Update users bio or Name
   const updateNameOrBio = async (req, res) => {
    const {id} = req.params;
    try {
      const userData = await userModel.find({_id : id})
      if(userData.length >=1){
          const updateUser = await userModel.findByIdAndUpdate(id , {
            bio : req.body.bio,
            name : req.body.name,
          })

          res.status(200).send({message : 'User updated successfully' , status: true });
      }
      else{
      res.status(404).send({message : 'User not found' , status: false});
      }
    } catch (err) {
      res.status(401).send({message : err.message , status: false});
    }
  }

   // Delete users by id
   const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
      const userData = await userModel.find({_id : id})
      if(userData.length >=1){
          const updateUser = await userModel.findByIdAndDelete(id)
          await postModel.deleteMany({user_id:id})
          res.status(200).send({message : 'User deleted successfully' , status: true });
      }
      else{
      res.status(404).send({message : 'User not found' , status: false});
      }
    } catch (err) {
      res.status(401).send({message : err.message , status: false});
    }
  }

    // Get all users
    const getAllUsers = async (req, res) => {
      try {
        const userData = await userModel.find()
        res.status(200).send({message : 'All users fetched Successfully' , status: true , user: userData});
      } catch (err) {
        res.status(401).send({message : err.message , status: false});
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
             let users = await userModel.findOne({_id : ele._id})
             topUsers.push({posts : ele.count , users})
             }

          res.status(200).send({message : 'All top actives users data fetched Successfully' , status: true , user: topUsers});
        } catch (err) {
          res.status(401).send({message : err.message , status: false});
        }
      }

  module.exports = {createUser , getUserById , updateNameOrBio , deleteUser ,getAllUsers , getTopUsers}