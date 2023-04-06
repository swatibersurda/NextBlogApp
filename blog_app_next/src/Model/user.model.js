import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    blogsArray: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    ],
    role: {
      type: String,
      require: true,
      default: "reader",
      enum: ["reader", "author", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
