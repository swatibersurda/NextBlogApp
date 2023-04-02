"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// PAGINATED COMPONENT
export const PaginatedComponent=()=>{
    const [page,setPage]=useState(0);
    const { push, query } = useRouter();
    // console.log(page,"i am pagee..")
    useEffect(()=>{
       
        if(page){
            push({query:{...query,page:page}})
          }
          
    },[page])
    return(
        <div>
            <button  onClick={()=>setPage(page+1)}>Next</button>
            <button disabled={page===1} onClick={()=>setPage(page-1)}>Previous</button>
        </div>
    )
}