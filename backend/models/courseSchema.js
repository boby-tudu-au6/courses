import mongoose,{Schema} from 'mongoose'

const courseSchema = new Schema({
    owner:{type:Schema.Types.ObjectId,ref:"faculty"},
    title:String,
    dept:String,
    desc:String,
    room:String,
    waitlist:String,
    team:String
  })
  courseSchema.index({ name: 1 });
  
  const Course = mongoose.model('course',courseSchema)
  export default Course