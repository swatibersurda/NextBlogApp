import React from "react";
import styles from "../styles/Home.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import baseUrl from "../Config/baseUrl";
// MdDelete
export const AuthorLayout = ({ data }) => {
  const router = useRouter();

  const handleDeleteBlog = async (id) => {
    const data = await fetch(`${baseUrl}/api/blogbyid/${id}`, {
      method: "DELETE",
    });
    const result = await data.json();
    if (result.message) {
      alert("deleted sucessfully");
      router.push("/authorpanel");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className={`${styles.gridAuthor}`}>
      {data?.blogsArray &&
        data.blogsArray.map((item) => {
          return (
            <div className={`${styles.gridChild}`} key={item._id}>
              <div>
                <div className={styles.autorPanelImageDiv}>
                  <img src={item.image} width={"100%"} height={"100%"} />
                </div>

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
                    <Link href={`/updatedBlog/${item._id}`}>
                      <FaEdit
                        color="#6b5b95"
                        className={`${styles.iconn}`}
                      ></FaEdit>
                    </Link>
                  </div>
                  <div className={`${styles.iconDivs}`}>
                    <MdDelete
                      onClick={() => handleDeleteBlog(item._id)}
                      color="#6b5b95"
                      className={`${styles.iconn}`}
                    ></MdDelete>
                  </div>
                  <div className={`${styles.iconDivs}`}>
                    <Link href={`/individualPostPage/${item._id}`}>
                      <AiFillEye
                        color="#6b5b95"
                        className={`${styles.iconn}`}
                      ></AiFillEye>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
