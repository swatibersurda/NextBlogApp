import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import userModel from "@/Model/user.model";

export default async(req,res)=>{
    const {email,password}=req.body;
    try{
          if(!email ||! password){
            return res.status(422).json({err:"please fill all details"})
          } 
          
          const user=await userModel.findOne({email:email}).lean().exec();
          if(!user){
           return res.status(404).json({err:'user is not registered go first registerrrr...'})
          }
          const convertPassword=await bcrypt.compareSync(password,user.password)
        //   men
          if(convertPassword){
            const token=jsonwebtoken.sign({userId:user._id},process.env.JWTSECRET_KEY,{
              expiresIn:"7d",    
            });
            res.status(201).json({token,user})
          }
        //   means if someone entering wrong passsword or email
          else{
            return res.status(401).json({error:"email and password is incorrect.."})
          }
 
    }catch(err){
      res.status(500).json({error:"server error.."})
    }
}