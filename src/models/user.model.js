import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({

  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
  },
  fullname:{
    type:String,
    required:true,
    trim:true,
    index:true
  },
  avatar:{
    type:String,//cloudinary
    required:true,
  },

  coverImage:{
    type:String,//cloudinary
  },
  watchHistory:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }
  ],
  password:{
    type:String,
    required:[true,"password is required"],
    unique:true
  },
  refreshToken:{
    type:String,
  }


},{timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect= async function
(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.genereateAccesToken=function(){
    //sign method is used to genreate Token
    return jwt.sign(
    {
      _id:this.id,
      email:this.email,
      username:this.username,
      fullname:this.fulllname
    },
    process.env.ACCESS_TOKEN_KEY,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRE
    },
  )
}


userSchema.methods.generateRefreshToken=function (){
  //In refreshtoken information is less
  return jwt.sign(
    {
      _id:this.id,    
    },
    process.env.REFRESH_TOKEN_KEY,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRE
    },
  )
}

export const User=mongoose.model("User",userSchema)