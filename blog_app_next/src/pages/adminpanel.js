import { AdminLayout } from '@/Components/AdminLayout';
import { PaginatedComponent } from '@/Components/PaginatedComponent';
import React from 'react'

const adminpanel = ({data}) => {
  return (
    <div>
      <AdminLayout data={data}/>
      {/* <PaginatedComponent totalPages={data.totalPages}/> */}
    </div>
  )
}

export default adminpanel


export async function getServerSideProps(context) {
    const page = Number(context?.query?.page) || 1;
  const dataToSearch = context?.query?.data || "";
  
  
    // console.log(queryData,"queryData...")
    const data = await fetch(
        // HERE ADMIN WILL FATCH ALL USERS'S ALL BLOGS
      `http://localhost:3000/api/blogs?page=${page}&data=${dataToSearch}`
      
    );
    const res = await data.json();
    console.log(res,"ooo");
  
    return {
      props: {
        data: res,
      },
    };
  }

