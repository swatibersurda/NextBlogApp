// `use-client`;
// import React, { useEffect, useState } from "react";
// import { parseCookies } from "nookies";
// import { useRouter } from "next/router";
// import styles from "../styles/Home.module.css";

// const createpage = () => {
//   // THIS FIELDS WILL BE GIVEN BY USER AND USER_ID WILL BE EXTRACT FROM COOKIES
//   const [title, setTilte] = useState("");
//   const [content, setContent] = useState("");
//   const [imageUrl, setImage] = useState("");
//   const parsecookies = parseCookies();
//   const router = useRouter();
//   const user = parsecookies.user ? JSON.parse(parsecookies.user) : "";
//   console.log(title,content,imageUrl,"mm")

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const imageUrlLink = await imageCloudLink();
//    console.log(imageUrlLink,"imarrrr.............")
   
//     const payload = {
//       title,
//       content,
//       image:
//         imageUrl === ""
//           ? "https://enviragallery.com/wp-content/uploads/2016/05/Set-Default-Featured-Image.jpg"
//           : imageUrlLink,
//       user_id: user._id,
//     };

//     const result = await fetch(`http://localhost:3000/api/blogs`, {
//       method: "POST",
//       body: JSON.stringify(payload),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const postedResult = await result.json();
   
//     if (postedResult.blogs) {
//       router.push("/?page=1");
//     }
//     else{
//       alert("error while posting..")
    
//   }
//   };

//   const imageCloudLink = async () => {
//     const data = new FormData();
//     // here file for uploading file.
//     data.append("file", imageUrl);
//     // name of the upload preset you have given
//     data.append("upload_preset", "ecommerce");
//     // here put your cloud name.
//     data.append("cloud_name", "dnpiacrzw");
//     // put your base url here wih cloudname
//     // check your setting of fetch in coudinary before it
//     const linkData = await fetch(
//       "https://api.cloudinary.com/v1_1/dnpiacrzw/image/upload",
//       {
//         method: "POST",
//         body: data,
//       }
//     );
//     const res = await linkData.json();
//     return res.url;
//   };

  
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTilte(e.target.value)}
//         />
//         <input
//           type="text"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//         />

//         {/* showing uploaded file if that mediaurl has some string or image string then make it image or show in ui */}
//         <div className="responsive-img">
//           <img src={imageUrl ? URL.createObjectURL(imageUrl) : ""} />
//         </div>
//         <input type="submit" />
//       </form>
//     </div>
//     //

//     // <div className={`${styles.formDiv}`}>
//     //   <h1 className={`${styles.textalignCenter}`}>Post Your Blog</h1>

//     //   <form onSubmit={handleSubmit}>
//     //     <label className={`${styles.labell}`} for="title">
//     //       Title
//     //     </label>
//     //     <input
//     //       type="text"
//     //       className={`${styles.inputText}`}
//     //       value={title}
//     //       id="title"
//     //       placeholder="Title"
//     //       onChange={(e) => setTilte(e.target.value)}
//     //     />

//     //     <label className={`${styles.labell}`} for="content">
//     //       Content
//     //     </label>
//     //     <input
//     //       type="text"
//     //       className={`${styles.inputText}`}
//     //       value={content}
//     //       id="content"
//     //       placeholder="content.."
//     //       onChange={(e) => setContent(e.target.value)}
//     //     />

//     //     <label className={`${styles.labell}`} for="imgeurl">
//     //       image
//     //     </label>
//     //     <input
//     //       type="file"
//     //       accept="image/*"
//     //       onChange={(e) => setImage(e.target.files[0])}
//     //     />

//     //     <div className="responsive-img">
//     //       <img src={imageUrl ? URL.createObjectURL(imageUrl) : ""} />
//     //     </div>
//     //     <input
//     //       className={`${styles.inputSubmit} ${styles.inputSubmitHover}`}
//     //       type="submit"
//     //       value="Submit"
//     //     />
//     //   </form>
//     // </div>
//   );
// };

// export default createpage;


import React, { useState } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const createpage = () => {
  // THIS FIELDS WILL BE GIVEN BY USER AND USER_ID WILL BE EXTRACT FROM COOKIES
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImage] = useState("");
  const parsecookies = parseCookies();
  const router=useRouter();
  const user = parsecookies.user ? JSON.parse(parsecookies.user) : "";
  console.log(user.role,user._id, "iam parsed");
  console.log(title, content, imageUrl, "jjjj");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(title===""||content===""){
      alert("please fill all details...")
      setTitle("");
      setContent("");
    }

    else if(title!=="" && content!==""){

    
    let imageUrlLinkkk;
     
    if(imageUrl!==""){
  
        //Need to make link of cloudinary when image is selected  
      imageUrlLinkkk= await imageCloudLink();
   
    
    }

    const payload = {
      title,
      content,
      image:
        imageUrl === ""
          ? "https://enviragallery.com/wp-content/uploads/2016/05/Set-Default-Featured-Image.jpg"
          : imageUrlLinkkk,
      user_id: user._id,
    };
    console.log(payload, "payload at createpage..");
  
 

    const result = await fetch(`http://localhost:3000/api/blogs`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const postedResult = await result.json();
    console.log(postedResult, "ppp");

    if(postedResult.blogs){
      alert("added sucessfully")
      router.push("/?page=1")
    }
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
    <h1 className={`${styles.textalignCenter}`}>Post Blog Here</h1>

       <form onSubmit={handleSubmit}>
  <label className={`${styles.labell}`} for="title">Title</label>
  <input type="text" className={`${styles.inputText}`} value={title}  id="title" placeholder="Title.." onChange={(e) =>setTitle(e.target.value)}/>

  <label  className={`${styles.labell}`} for="content">Content</label>
  <input type="text" className= {`${styles.inputText}`} value={content}  id="content" placeholder="Content.."  onChange={(e) => setContent(e.target.value)}/>

  <label  className={`${styles.labell}`} for="imm">Image</label>
  <input type="file" className= {`${styles.inputText}`} id="imm" placeholder="imagee"  onChange={(e) => setImage(e.target.files[0])}/>
  <div className={`${styles.responsiveimg}`}>
         <img src={imageUrl ? URL.createObjectURL(imageUrl) : ""} width={"100%"}   />
         </div>
 <input className= {`${styles.inputSubmit} ${styles.inputSubmitHover}`} type="submit" value="Submit"/>
</form>

  </div>
  )
}



export default createpage

