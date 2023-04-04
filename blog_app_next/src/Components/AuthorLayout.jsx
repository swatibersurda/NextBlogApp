import React from "react";
import styles from "../styles/Home.module.css";
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {AiFillEye} from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
// MdDelete
export const AuthorLayout = ({ data }) => {
    const router=useRouter();
  console.log(data, "data at jsx");
  
  const handleDeleteBlog=async(id)=>{
  
    const data=await fetch(`http://localhost:3000/api/blogbyid/${id}`,{
     method:"DELETE",
     // headers:{
     //     "Content-Type":"appliction/json"
     // }
    })
    const result=await data.json()
     console.log(result ,"resulttt after deletion")
     if(result.message){
        alert("deleted sucessfully")
        router.push("/authorpanel")
     }
     else{
         alert(result.err)
     }
   }
 
 
  return (
    <div className={`${styles.gridAuthor}`}>
      {data?.blogsArray &&
        data.blogsArray.map((item) => {
          return (
            <div className={`${styles.gridChild}`}>
              <div>
                <img src={item.image} width={"100%"} height={"30%"} />
                {/* <div> */}
                  <h5>
                    Title:<i>{item.title}</i>
                  </h5>
                  <h5>
                    Author:<i>{data.name}</i>
                  </h5>
                {/* </div> */}
                <div className={`${styles.authorButtonpan}`}>
                    <div className={`${styles.iconDivs}`}>
                        <Link href={`/updatedBlog/${item._id}`} >
                        <FaEdit color="purple" className={`${styles.iconn}`} ></FaEdit>
                        </Link>
                        </div>
                    <div className={`${styles.iconDivs}`}>
                        
                        <MdDelete onClick={()=>handleDeleteBlog(item._id)} color="purple" className={`${styles.iconn}`}></MdDelete>
                        
                        </div>
                        <div className={`${styles.iconDivs}`}>
                        <Link href={`/individualPostPage/${item._id}`}><AiFillEye color="purple" className={`${styles.iconn}`}></AiFillEye></Link>
                        </div>

                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
