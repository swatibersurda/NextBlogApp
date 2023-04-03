"use client";
import React, { useState } from 'react'
import styles from "../styles/Home.module.css"

export const PostComment = ({item}) => {
  console.log(item,"item at postcomm")
    const [comm,setComment]=useState("");
    const handleComment=async()=>{
        if(comm!==""){
            const data=await fetch("",{
                method:post,
                body:JSON.stringify(comm),
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const res=await data.json();
            console.log(res,"res...")

        }
    }
  return (
    <div className={`${styles.postCommentParentDiv}`}>
      <div>
      <input value={comm} onChange={(e)=>setComment(e.target.value)}/>
      <button onClick={handleComment}>Add Comment</button>
      </div>
      
      {item?.commentsArray&&item.commentsArray.map((itemss)=>{
        return <div className={`${styles.userCommentedDiv}`}>
          <div className={`${styles.userCommentedimageDiv}`}>
           {/* <img src={item.image} width={"100%"} height={"100%"}/> */}
          {item.user_id._id}
          </div>
          <div className={`${styles.userCommentDiv}`}></div>
          {itemss.comm}
          </div>
      })}
    </div>
  )
}


