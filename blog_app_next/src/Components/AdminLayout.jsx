import React from "react";
import { PaginatedComponent } from "./PaginatedComponent";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import baseUrl from "../Config/baseUrl"

export const AdminLayout = ({ data }) => {
  console.log(data, "datain admin");
  const router = useRouter();

  const handleDeleteBlog = async (id) => {
    const data = await fetch(`${baseUrl}/api/blogbyid/${id}`, {
      method: "DELETE",
    });
    const result = await data.json();
    if (result.message) {
      alert("deleted sucessfully");
      router.push("/adminpanel");
    } else {
      alert(result.err);
    }
  };

  return (
    <div>
      <h1 className={`${styles.textalignCenter}`}>WELCOME TO ADMIN PANEL</h1>
      <table className={`${styles.tableContainer}`}>
        <thead className={`${styles.theadd}`}>
          <tr>
          <th className={`${styles.tableth}`}>Title</th>
          <th className={`${styles.tableth}`}>Role</th>
          {/* admin see the particular blog as well */}
          <th className={`${styles.tableth}`}>View</th>
          <th className={`${styles.tableth}`}>Delete</th>
          <th className={`${styles.tableth}`}>Update</th>
          </tr>
          
        </thead>
        <tbody>
          {data.result &&
            data.result.map((item) => {
              return (
                <tr key={item._id}>
                  <td className={`${styles.tabletd}`}>{item.title}</td>
                  <td className={`${styles.tabletd}`}>{item.user_id.role}</td>

                  <td className={`${styles.tabletd}`}>
                    <Link href={`/individualPostPage/${item._id}`}>
                      <button className={`${styles.tableButton}`}>
                        Detail
                      </button>
                    </Link>
                  </td>
                  <td className={`${styles.tabletd}`}>
                    <button
                      onClick={() => handleDeleteBlog(item._id)}
                      className={`${styles.tableButton}`}
                    >
                      <AiFillDelete fontSize={"24px"} color={"red"} />
                    </button>
                  </td>
                  <td className={`${styles.tabletd}`}>
                    <Link href={`/updatedBlog/${item._id}`}>
                      <button className={`${styles.tableButton}`}>
                        <BiEdit fontSize={"24px"} color={"blue"} />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
