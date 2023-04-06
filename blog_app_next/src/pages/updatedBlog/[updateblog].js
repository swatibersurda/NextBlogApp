`use-client`;
import React, { useState } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import baseUrl from "../../Config/baseUrl";

const updateblog = () => {
  // THIS FIELDS WILL BE GIVEN BY USER AND USER_ID WILL BE EXTRACT FROM COOKIES
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImage] = useState("");
  const parsecookies = parseCookies();
  const router = useRouter();

  const user = parsecookies.user ? JSON.parse(parsecookies.user) : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrlLink = await imageCloudLink();
    let payload = {};
    // Incase user do not want to edit any other thing then will use the privious one and will not append everything on payload
    // only things which are edited will be sent to update.
    if (title !== "") {
      payload.title = title;
    }
    if (content !== "") {
      payload.content = content;
    }

    payload.image =
      imageUrl === ""
        ? "https://enviragallery.com/wp-content/uploads/2016/05/Set-Default-Featured-Image.jpg"
        : imageUrlLink;
    payload.user_id = user._id;

    const result = await fetch(
      `${baseUrl}/api/blogbyid/${router.query.updateblog}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const postedResult = await result.json();

    if (postedResult.result) {
      router.push("/?page=1");
    }
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
    <div className={`${styles.formDiv}`}>
      <h1 className={`${styles.textalignCenter}`}>UPDATE Here</h1>

      <form onSubmit={handleSubmit}>
        <label className={`${styles.labell}`} for="title">
          Title
        </label>
        <input
          type="text"
          className={`${styles.inputText}`}
          value={title}
          id="title"
          placeholder="Title.."
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className={`${styles.labell}`} for="content">
          Content
        </label>
        <input
          type="text"
          className={`${styles.inputText}`}
          value={content}
          id="content"
          placeholder="Content.."
          onChange={(e) => setContent(e.target.value)}
        />

        <label className={`${styles.labell}`} for="imm">
          Image
        </label>
        <input
          type="file"
          className={`${styles.inputText}`}
          id="imm"
          placeholder="imagee"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className={`${styles.responsiveimg}`}>
          <img
            src={imageUrl ? URL.createObjectURL(imageUrl) : ""}
            width={"100%"}
          />
        </div>
        <input
          className={`${styles.inputSubmit} ${styles.inputSubmitHover}`}
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default updateblog;
