import mongoose from "mongoose";
import userModel from "@/Model/user.model";
import blogModel from "@/Model/blog.model";
// finding each author and admin's blogs
import dbConnect from "@/Config/dbConnect";
dbConnect();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getByID(req, res);
      break;
    case "DELETE":
      await deleteById(req, res);
      break;
    case "PATCH":
      await updateById(req, res);
      break;
  }
};

const getByID = async (req, res) => {
  console.log("reahing at blogidd..");
  try {
    console.log(req.query.blogid, "ppp");
    // here id will come in query and the name of folder
    const result = await blogModel
      .findById({ _id: req.query.blogid }).populate("commentsArray")
      
    console.log(result, "resultt");
    res.status(200).json({ result: result, message: "getedByID" });
  } catch (err) {
    res.status(500).json({ message: "err in get by id" });
  }
};

// DELETE BY ID
const deleteById = async (req, res) => {
  console.log(req.query.blogid, "bcxsvbxcs", userModel);
  // FIRST DELETE BLOG FROM BLOGS COLLECTION THEN DELETE IT FROM USER'S BLOGS ARRAY..
  const result = await blogModel.findByIdAndDelete({ _id: req.query.blogid });
  try {
    await blogs.save();
    await userModel.findOneAndUpdate(
      { _id: req.body.user_id },
      { $pull: { blogsArray: req.query.blogid } }
    );

    return res.status(204).json({ message: "Deleted Sucessfully..." });
  } catch (err) {
    return res.status(500).json({ message: "err while deleting" });
  }
};

const updateById = async (req, res) => {
  console.log(req.query.blogid, "immm");
  try {
    const result = await blogModel.findByIdAndUpdate(
      { _id: req.query.blogid },
      req.body,
      {
        new: true,
      }
    );
    return res.status(201).json({ result, message: "userUpdated..." });
  } catch (err) {
    return res.status(500).json({ message: "error while updating..." });
  }
};
