import mongoose,{Schema} from 'mongoose'

let mineSchema = new Schema({
    courseid:{type:Schema.Types.ObjectId,ref:"course"},
    userid:{type:Schema.Types.ObjectId,ref:"user"},
})

const Mine = mongoose.model('mine',mineSchema)
export default Mine