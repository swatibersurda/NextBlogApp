import mongoose from "mongoose";
import userModel from "@/Model/user.model";
export default async (req, res) => {
    try {
      console.log(req.query, "ppp");
      // here id will come in query and the name of folder
      const result = await userModel.findById({ _id: req.query.useid }).populate("blogsArray");
      console.log(result, "resultt");
      res.status(200).json({ result: result, message: "getedByID" });
    } catch (err) {
      res.status(500).json({ message: "err in get by id" });
    }
  };