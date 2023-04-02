// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/Config/dbConnect";
import bcryptjson from "bcryptjs";
import userModel from "@/Model/user.model";
// invoking database here....
dbConnect();
// this endpoint for signup or post.
export default async (req, res) => {
  console.log("reahing here...");
  const { name, email, password, blogsArray, role } = req.body;
  try {
    // IF THESE FIELDS ARE NOT GIVEN WHILE REGISTERING WILL SHOW ERROR
    if (!name || !email || !password) {
      return res.status(422).json({ error: "please fill all details" });
    }
    const user = await userModel.findOne({ email:email });

    if (user) {
      return res.status(422).json({ message: "user registered already..." });
    }
    // THE PASSWORD COME FROM FORM NEED TO HASH.
    const hashPassword = await bcryptjson.hash(password, 12);
    const newUser = await new userModel({
      name,
      email,
      blogsArray:[],
      password: hashPassword,
      role,
    }).save();

    return res.status(201).json({newUser, message: "signup sucess" });
  } catch (err) {
    return res.status(500).json({ error: "server-error" });
  }
};
