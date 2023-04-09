const postModel = require("../Model/post.model");


// Create post
const createpost = async (req, res) => {
    const payload = req.body;
    try {
        const newpost = await postModel.create({...payload});
        res.send({message: 'Posted successfully' , status: true})
    } catch (err) {
      res.send({message : err.message , status: false});
    }
  }


  // Get Single post By Id
  const getpostById = async (req, res) => {
    const {id} = req.params;
    try {
      const postData = await postModel.find({_id : id}).populate('user_id')
      if(postData.length >=1){
        res.send({message : 'post finded successfully' , status: true , post : postData[0]});
      }
      else{
      res.send({message : 'post not found' , status: false});
      }
    } catch (err) {
      res.send({message : err.message , status: false});
    }
  }


   // Update posts
   const updateContentOfPost = async (req, res) => {
    const {id} = req.params;
    try {
      const postData = await postModel.find({_id : id})
      if(postData.length >=1){
          const updatepost = await postModel.findByIdAndUpdate(id , {
            content : req.body.content ,
          })
          
          res.send({message : 'post updated successfully' , status: true });
      }
      else{
      res.send({message : 'post not found' , status: false});
      }
    } catch (err) {
      res.send({message : err.message , status: false});
    }
  }

   // Delete posts by id
   const deletepost = async (req, res) => {
    const {id} = req.params;
    try {
      const postData = await postModel.find({_id : id})
      if(postData.length >=1){
          const updatepost = await postModel.findByIdAndDelete(id)
          res.send({message : 'post deleted successfully' , status: true });
      }
      else{
      res.send({message : 'post not found' , status: false});
      }
    } catch (err) {
      res.send({message : err.message , status: false});
    }
  }

  
  // post like
  const likePost = async(req , res)=>{
    const {id} = req.params;
    try {
      const postData = await postModel.find({_id : id})
      if(postData.length >=1){
          const updatepost = await postModel.findByIdAndUpdate(id , {
            likes : postData[0].likes +1
          })
          res.send({message : 'Post liked by You' , status: true });
      }
      else{
      res.send({message : 'post not found' , status: false});
      }
    } catch (err) {
      res.send({message : err.message , status: false});
    }
  }

  // post unlike
  const unlikePost = async(req , res)=>{
    const {id} = req.params;
    try {
      const postData = await postModel.find({_id : id})
      if(postData.length >=1){
          const updatepost = await postModel.findByIdAndUpdate(id , {
            likes : postData[0].likes -1
            
          })
          res.send({message : 'Post unliked by You' , status: true });
      }
      else{
      res.send({message : 'post not found' , status: false});
      }
    } catch (err) {
      res.send({message : err.message , status: false});
    }
  }

  // get all post
  const getAllpost = async (req, res) => {
    try {
      const postData = await postModel.find().populate('user_id')
      res.send({message : 'All post fetched Successfully' , status: true , post: postData});
    } catch (err) {
      res.send({message : err.message , status: false});
    }
  }

  // get top 5 liked posts
  const getTopPost = async (req, res) => {
    try {
      const postData = await postModel.find().sort({likes:-1}).limit(5).populate('user_id')
      res.send({message : 'All post fetched Successfully' , status: true , post: postData});
    } catch (err) {
      res.send({message : err.message , status: false});
    }
  }


  module.exports = {createpost , getpostById , updateContentOfPost , deletepost , likePost , unlikePost , getAllpost , getTopPost }