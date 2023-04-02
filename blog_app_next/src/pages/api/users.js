import mongoose from "mongoose";
import userModel from "@/Model/user.model";
export default async (req, res) => {
  // GETTING ALL SIGNUP USERS...
  try {
    const result = await userModel.find().populate("blogsArray").lean().exec();
    res
      .status(200)
      .json({ users: result, message: "geted all signup userssss...." });
  } catch (err) {
    res.status(500).json({ err: "err while getting users" });
  }
};
