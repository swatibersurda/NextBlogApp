import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    //

    //
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    commentsArray: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
