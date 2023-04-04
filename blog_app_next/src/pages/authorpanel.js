import { AdminLayout } from "@/Components/AdminLayout";
import { PaginatedComponent } from "@/Components/PaginatedComponent";
import React from "react";
import { parseCookies } from "nookies";

const authorpanel = ({ data }) => {
  console.log(data, "data by authorr...");
  return (
    <div>
      {/* <AdminLayout data={data}/> */}
      {/* <PaginatedComponent totalPages={data.totalPages}/> */}i am
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
