const jwt = require('jsonwebtoken')

const authMiddleware = async(req , res , next)=>{
    try {
        const token = req.headers["token"];
        const check = jwt.decode(token)
        if(check?.user_id){
            req.body.user_id = check.user_id
            next();
        }
        else{
            return res.status(401).json({
                status:false,
                message:"invalid token"
            })
        }
        
    } catch (error) {
        return res.status(401).json({
            status:false,
            message:error.message
        })
    }
}

module.exports = {authMiddleware}