import { AdminLayout } from "@/Components/AdminLayout";
import { PaginatedComponent } from "@/Components/PaginatedComponent";
import React from "react";
import { parseCookies } from "nookies";
import { AuthorLayout } from "@/Components/AuthorLayout";
import { requireAuthentication } from "../Components/requireAuthentication";
import baseUrl from "../Config/baseUrl";

const authorpanel = ({ data }) => {
  return (
    <div>
      {/* <AdminLayout data={data}/> */}
      {/* <PaginatedComponent totalPages={data.totalPages}/> */}
      <AuthorLayout data={data.result} />
    </div>
  );
};

export default authorpanel;

// export const getServerSideProps = requireAuthentication(async (context) => {
//   const id = context.params.individualid;
//   const data = await fetch(`http://localhost:3000/api/blogbyid/${id}`);
//   const result = await data.json();
//   console.log(result, "result after fetchinfg one id");

//   return {
//     props:{
//               data:result
//         }
//   };
// });

export const getServerSideProps = requireAuthentication(async (context) => {
  // Acessing cookies inside getserverside props which is inside browser
  const { user } = parseCookies(context);

  let x = JSON.parse(user);

  const data = await fetch(
    // HERE AUTHOR WILL FATCH ONLY HIS POSTED BLOG
    `${baseUrl}/api/userbyid/${x._id}`
  );
  const res = await data.json();
  console.log(res, "ooo");

  return {
    props: {
      data: res,
    },
  };
});
