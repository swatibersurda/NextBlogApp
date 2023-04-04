import { AdminLayout } from "@/Components/AdminLayout";
import { PaginatedComponent } from "@/Components/PaginatedComponent";
import React from "react";
import { parseCookies } from "nookies";
import { AuthorLayout } from "@/Components/AuthorLayout";

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

export async function getServerSideProps(context) {
  // Acessing cookies inside getserverside props which is inside browser
  const { user } = parseCookies(context);
  let x = JSON.parse(user);

  const data = await fetch(
    // HERE AUTHOR WILL FATCH ONLY HIS POSTED BLOG
    `http://localhost:3000/api/userbyid/${x._id}`
  );
  const res = await data.json();
  console.log(res, "ooo");

  return {
    props: {
      data: res,
    },
  };
}
