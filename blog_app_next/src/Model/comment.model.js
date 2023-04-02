import mongoose from "mongoose";
// WHEN CREATING COMMENT THE SAME COMMENT SHOULD BE ALSO INSIDE THE COMMENT'S ARRAY OF BLOGS.
const commentSchema=new mongoose.Schema({
    comm:{type:String,required:true},
    blog_id:{type:mongoose.Schema.Types.ObjectId,ref:"blog",required:true}
},{
    timestamps:true
})

export default mongoose.models.comment||mongoose.model("comment",commentSchema);