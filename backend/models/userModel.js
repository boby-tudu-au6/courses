// const mongoose = require("mongoose")
// const Schema = mongoose.Schema
import mongoose,{Schema} from 'mongoose'

const userSchema = new Schema({
  name:{type:String,required:true,unique:true},
  profilePic:{type:String,default:''},
  email:{type:String,unique:true},
  pass:{type:String,default:''},
  phone:{type:String,default:''},
  about:{type:String,default:''},
  city:{type:String,default:''},
  country:{type:String,default:''},
  company:{type:String,default:''},
  school:{type:String,default:''},
  hometown:{type:String,default:''},
  lang:{type:String,default:''},
  gender:{type:String,default:''}
})
userSchema.index({ name: 1 });

const User = mongoose.model('user',userSchema)
export default User