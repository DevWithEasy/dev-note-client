import mongoose from 'mongoose';

const mailSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    content : {
        type : String,
        required :true
    },
    font :{
        type : String,
        required :true
    },
    design :{
        type : Number,
        required :true
    },
    seen : {
        type : Boolean,
        default : false
    }
},{
    timestamps:true
})

const Mail = mongoose.models.Mail || mongoose.model('Mail',mailSchema)
export default Mail