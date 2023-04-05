import React from "react";
import { PaginatedComponent } from "./PaginatedComponent";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export const AdminLayout = ({ data }) => {
  const router = useRouter();

  const handleDeleteBlog = async (id) => {
    const data = await fetch(`http://localhost:3000/api/blogbyid/${id}`, {
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
    <div className={`${styles.tableContainer}${styles.tablee}`}>
      <h1 className={`${styles.textalignCenter}`}>WELCOME TO ADMIN PANEL</h1>
      <table border={"2"} className={`${styles.tableContainer}`}>
        <thead className={`${styles.theadd}`} >
          <th className={`${styles.tabletdth} ${styles.theadd}`} >Image</th>
          <th className={`${styles.tabletdth} ${styles.theadd}`} >Title</th>
          {/* admin see the particular blog as well */}
          <th className={`${styles.tabletdth} ${styles.theadd}`} >View</th>
          <th className={`${styles.tabletdth} ${styles.theadd}`} >Delete</th>
          <th className={`${styles.tabletdth} ${styles.theadd}`} >Update</th>
        </thead>
        <tbody>
          {data.result &&
            data.result.map((item) => {
              return (
                <tr key={item._id} >
                  <td className={`${styles.tabletdth}`} >
                    <img src={item.image} width={"50%"} height={"30%"} />
                  </td>
                  <td className={`${styles.tabletdth}`}>{item.title}</td>

                  <td className={`${styles.tabletdth}`} >
                    <Link href={`/individualPostPage/${item._id}`}><button className={`${styles.tableButton}`}>VIEW</button></Link>
                  </td>
                  {/* <td className={`${styles.tabletdth}`} onClick={() => handleDeleteBlog(item._id)}>Delete</td> */}
                  <td className={`${styles.tabletdth}`}>
                    {" "}
                   <button onClick={() => handleDeleteBlog(item._id)} className={`${styles.tableButton}`}>DELETE</button>
                  </td>
                  <td className={`${styles.tabletdth}`}>
                    {" "}
                    <Link href={`/updatedBlog/${item._id}`}><button className={`${styles.tableButton}`}>UPDATE</button></Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
