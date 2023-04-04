import React from "react";
import { PaginatedComponent } from "./PaginatedComponent";
import Link from "next/link";
import { useRouter } from "next/router";

export const AdminLayout = ({ data }) => {
  console.log(data, "data");
  const router=useRouter();
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
       router.push("/?page=1")
    }
    else{
        alert(result.err)
    }
  }




  return (
    <div>
      <table>
        <th>Image</th>
        <th>Title</th>
        {/* <th>Content</th> */}
        <th>Role</th>
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
                  <td>{item.role}</td>
                 
                  <td><Link href={`/individualPostPage/${item._id}`}>View</Link></td>
                  <td  onClick={()=>handleDeleteBlog(item._id)}>Delete</td>
                  <td> <Link href={`/updatedBlog/${item._id}`}>Update</Link></td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
