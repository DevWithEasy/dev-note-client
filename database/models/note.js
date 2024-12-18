import mongoose from 'mongoose';

const mailSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    title : {
        type : String,
        required :true
    },
    description :{
        type : String,
        required :true
    },
    icon :{
        type : String,
        required :true,
        default : 'doc'
    },
    keywords : {
        type : [String],
        default : []
    },
    publish : {
        type : Boolean,
        default : false
    }
},{
    timestamps:true
})

const Mail = mongoose.models.Mail || mongoose.model('Mail',mailSchema)
export default Mail