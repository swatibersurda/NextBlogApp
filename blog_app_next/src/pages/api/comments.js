import dbConnect from "@/Config/dbConnect";
import commentModel from "@/Model/comment.model";
import blogModel from "@/Model/blog.model";
dbConnect();
export default async (req, res) => {
  console.log("reaching on commentss....", commentModel, req.body.blog_id);
  // creating comment with also puting that comment inide the commentsarray of blog.
  let existingBlog;
  // here finding user if user is there then he or she can create the blog.
  try {
    existingBlog = await blogModel.findById(req.body.blog_id);
    console.log(existingBlog, "existingBloggg....");
  } catch (err) {
    return console.log(err);
  }
  // console.log(existingUser,"existingUsersss....")
  if (!existingBlog) {
    return res.status(400).json({ message: "blog not found" });
  }
  const newComment = new commentModel({
    comm: req.body.comm,
    blog_id: req.body.blog_id,
  });

  try {
    // save first comment into comment collectionnn..
    await newComment.save();
    const x = await blogModel.findOneAndUpdate(
      { _id: req.body.blog_id },
      { $push: {"commentsArray": newComment } }
    );
  } catch (err) {
    return res.status(500).json({ message: "internal server error.." });
  }
  return res.status(201).json({ newComment });
};
