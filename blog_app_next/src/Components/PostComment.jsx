`use client`;
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import {GoPerson} from "react-icons/go";
import baseUrl from "../Config/baseUrl"


export const PostComment = ({ item }) => {
  const [comm, setComment] = useState("");
  const router = useRouter();
  const handleComment = async () => {
    if (comm !== "") {
      const payload = {
        comm,
        blog_id: item._id,
      };
      const data = await fetch(`${baseUrl}/api/comments`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await data.json();

      // after commenting redirecting it to same page or same id page so that it can refecth the new posted
      // comment.
      setComment("");
      router.push(`/individualPostPage/${item._id}`);
    }
  };
  return (
    <div className={`${styles.postCommentParentDiv}`}>
      <div className={`${styles.postPageDiv}`}>
        <input
          className={`${styles.postPageInput}`}
          value={comm}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className={styles.postPageButton} onClick={handleComment}>
          Add Comment
        </button>
      </div>

      {item?.commentsArray &&
        item.commentsArray.map((itemss) => {
          return (
            <div key={uuid()} className={`${styles.userCommentedDiv}`}>
              <div className={`${styles.userCommentedimageDiv}`}>
                <GoPerson color=" #6b5b95" fontSize={"40px"}></GoPerson>
              </div>
              <div className={`${styles.userCommentDiv}`}>
              {itemss.comm}
              </div>
             
            </div>
          );
        })}
    </div>
  );
};
