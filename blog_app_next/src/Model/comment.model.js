import mongoose from "mongoose";
// WHEN CREATING COMMENT THE SAME COMMENT SHOULD BE ALSO INSIDE THE COMMENT'S ARRAY OF BLOGS.
const CommentSchema = new mongoose.Schema(
  {
    comm: { type: String, required: true },
    blog_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
