`use-client`;
import React, { useState } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

const  updateblog = () => {
  // THIS FIELDS WILL BE GIVEN BY USER AND USER_ID WILL BE EXTRACT FROM COOKIES
  const [title, setTilte] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImage] = useState("");
  const parsecookies = parseCookies();
  const router=useRouter();
  
  const user = parsecookies.user ? JSON.parse(parsecookies.user) : "";
  console.log(user.role,user._id, "iam parsed");
  console.log(title, content, imageUrl, "jjjj");
  console.log(router.query,"qq")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrlLink = await imageCloudLink();
    console.log(imageUrlLink, "i am back");
    const payload = {
      title,
      content,
      image:
        imageUrl === ""
          ? "https://enviragallery.com/wp-content/uploads/2016/05/Set-Default-Featured-Image.jpg"
          : imageUrlLink,
      user_id: user._id,
    };
    console.log(payload, "payload at createpage..");
    const result = await fetch(`http://localhost:3000/api/blogbyid/${router.query.updateblog}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const postedResult = await result.json();
    console.log(postedResult, "ppp");

    // if(postedResult.blogs){
    //   router.push("/?page=1")
    // }
  };

  const imageCloudLink = async () => {
    const data = new FormData();
    // here file for uploading file.
    data.append("file", imageUrl);
    // name of the upload preset you have given
    data.append("upload_preset", "ecommerce");
    // here put your cloud name.
    data.append("cloud_name", "dnpiacrzw");
    // put your base url here wih cloudname
    // check your setting of fetch in coudinary before it
    const linkData = await fetch(
      "https://api.cloudinary.com/v1_1/dnpiacrzw/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res = await linkData.json();
    return res.url;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTilte(e.target.value)}
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* showing uploaded file if that mediaurl has some string or image string then make it image or show in ui */}
        <div className="responsive-img">
          <img src={imageUrl ? URL.createObjectURL(imageUrl) : ""} />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default updateblog;
