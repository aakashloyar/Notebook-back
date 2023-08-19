const mongoose=require('mongoose');
const { Schema } = mongoose;
//whatever we store in mongo it  will take it will do that in organised way we use schema
//crud: create read update delete
const NotesSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    unique:true,
    required:true
  },
  tag:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
});
module.exports=mongoose.model('user',NotesSchema);