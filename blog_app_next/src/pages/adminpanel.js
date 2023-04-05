import { AdminLayout } from '@/Components/AdminLayout';
import { PaginatedComponent } from '@/Components/PaginatedComponent';
import React from 'react'

const adminpanel = ({data}) => {
console.log("reaching on admin panel")

  return (
    <div>
      <AdminLayout data={data}/>
      {/* <PaginatedComponent totalPages={data.totalPages}/> */}
    </div>
  )
}

export default adminpanel


export async function getServerSideProps(context) {
    
  
   
    const data = await fetch(
        // HERE ADMIN WILL FATCH ALL USERS'S ALL BLOGS
      `http://localhost:3000/api/blogs`
      
    );
    const res = await data.json();
    
  
    return {
      props: {
        data: res,
      },
    };
  }

