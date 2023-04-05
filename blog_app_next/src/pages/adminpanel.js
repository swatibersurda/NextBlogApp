import { AdminLayout } from '@/Components/AdminLayout';
import { PaginatedComponent } from '@/Components/PaginatedComponent';
import { requireAuthentication } from "../Components/requireAuthentication";
import baseUrl from "../Config/baseUrl";

import React from 'react'

const adminpanel = ({data}) => {
console.log("reaching on admin panel")

  return (
    <div>
      <AdminLayout data={data}/>
    </div>
  )
}

export default adminpanel
  export const getServerSideProps = requireAuthentication(async (context) => {
    // Acessing cookies inside getserverside props which is inside browser
   const data = await fetch(
      // HERE AUTHOR WILL FATCH ONLY HIS POSTED BLOG
      `${baseUrl}/api/blogs`
    );
    const res = await data.json();
    return {
      props: {
        data: res,
      },
    };
  });
  

