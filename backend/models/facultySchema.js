// const mongoose = require("mongoose")
// const Schema = mongoose.Schema
import mongoose,{Schema} from 'mongoose'

const facultySchema = new Schema({
  name:{type:String,required:true},
  email:{type:String,unique:true,required:true},
  pass:{type:String,required:true}
})
facultySchema.index({ name: 1 });

const Faculty = mongoose.model('faculty',facultySchema)
export default Faculty