import blogModel from "@/Model/blog.model";
import dbConnect from "@/Config/dbConnect";
import userModel from "@/Model/user.model";

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
  console.log(req.query, "reqq");
  let obj = {};
  let limit;
  let sorting;
  let page;
  
  // let total=await blogModel.find(count());
  // console.log(total,"total")
  if (req.query.data) {
    // need to apply or query in thatt... data can be any one
    obj = { $or: [{ title: req.query.data }, { content: req.query.data }] };
  }
  // /If pages means you need paginated data there you need limit concept
  if (req.query.page) {
    limit = 4;
  } else {
    limit = 0;
  }
  if (req.query.page) {
    page = parseInt((req.query.page - 1) * limit);
  } else {
    page = 0;
  }
  // console.log(limit,page,"kkk");

  console.log(obj, "i am obj");
  try {
    // finding this
    // { content: 'yellow', title: 'tr' } uery...
    const result = await blogModel
      .find(obj)
      .limit(limit)
      .skip(page)
      .lean()
      .exec();
    // this will give filtered result means if there only 2 records then you need to give
    // 2 records to front end so that it can make that much button
    const totalPages = Math.ceil(await blogModel.find(obj).countDocuments());
    console.log(totalPages, "totalPages");
    return res.send({ result, totalPages });
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
      { $push: {"blogsArray": blogs } }
    );
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ blogs });
};
