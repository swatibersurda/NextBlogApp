import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import blogModel from "@/Model/blog.model";
import dbConnect from "@/Config/dbConnect";
import userModel from "@/Model/user.model";
// import userModel from "../../Model/user.model";

// import userModel from "@/Model/user.model";
dbConnect();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchAllBlogs(req, res);
      break;
    case "POST":
      await postBlog(req, res);
      break;
    case "PATCH":
      await editBlog(req, res);
      break;
    case "DELETE":
      await deleteBlog(req, res);
      break;
  }
};

const fetchAllBlogs = async (req, res) => {
  let obj = {};
  let limit;
  let sorting;
  let page;
  if (req.query.title) {
    obj.title = { $in: req.query.title };
  }
  if (req.query.content) {
    obj.content = { $in: req.query.content };
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  } else {
    limit = 0;
  }
  if (req.query.page) {
    page = parseInt((req.query.page - 1) * limit);
  } else {
    page = 0;
  }

  if (!req.query.sort === "") {
    sorting = "";
  } else {
    sorting = req.query.sort;
  }
  console.log(obj, "i am obj");
  try {
    // finding this
    // { content: 'yellow', title: 'tr' } uery...
    const result = await blogModel
      .find(obj)
      .limit(limit)
      .skip(page)
      .sort(sorting)
      .populate("commentsArray")
      .lean()
      .exec();
    return res.send(result);
  } catch (err) {
    return res.status(500).send("something went wrong in get");
  }
};

// post a userrrr.....

const postBlog = async (req, res) => {
  console.log(req.body, "bcxsvbxcs", userModel);
  let existingUser;
  // here finding user if user is there then he or she can create the blog.
  try {
    // userModel.findById({_id:req.query.useid});
    existingUser = await userModel.findById(req.body.user_id);
    console.log(existingUser, "existinguserr");
  } catch (err) {
    return console.log(err);
  }
  // console.log(existingUser,"existingUsersss....")
  if (!existingUser) {
    return res.status(400).json({ message: "user not found" });
  }
  const blogs = new blogModel({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    user_id: req.body.user_id,
  });

  try {
    await blogs.save();
    await userModel.findOneAndUpdate(
      { _id: req.body.user_id },
      { $push: { blogsArray: blogs } }
    );
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json(blogs);
};
