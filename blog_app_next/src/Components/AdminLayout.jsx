import React from "react";
import { PaginatedComponent } from "./PaginatedComponent";
import Link from "next/link";

export const AdminLayout = ({ data }) => {
  console.log(data, "data");
  return (
    <div>
      <table>
        <th>Image</th>
        <th>Title</th>
        {/* <th>Content</th> */}
        <th>Blog_id</th>
        {/* admin see the particular blog as well */}
        <th>View</th>
        <th>Delete</th>
        <th>Update</th>
        <tbody>
          {data.result &&
            data.result.map((item) => {
              return (
                <tr>
                  <td>
                    <img src={item.image} width={"20px"} />
                  </td>
                  <td>{item.title}</td>
                  {/* <td>{item.user_id}</td> */}
                  <td>{item._id}</td>
                 
                  <td><Link href={`/individualPostPage/${item._id}`}>View</Link></td>
                  <td>Delete</td>
                  <td>Update</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
