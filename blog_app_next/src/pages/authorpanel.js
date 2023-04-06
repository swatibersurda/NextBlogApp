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

export const getServerSideProps = requireAuthentication(async (context) => {
  // Acessing cookies inside getserverside props which is inside browser
  const { user } = parseCookies(context);

  let x = JSON.parse(user);

  const data = await fetch(
    // HERE AUTHOR WILL FATCH ONLY HIS POSTED BLOG
    `${baseUrl}/api/userbyid/${x._id}`
  );
  const res = await data.json();

  return {
    props: {
      data: res,
    },
  };
});
