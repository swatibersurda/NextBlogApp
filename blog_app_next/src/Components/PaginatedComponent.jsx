"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// PAGINATED COMPONENT
export const PaginatedComponent=({totalPages})=>{
    console.log(totalPages,"tt")
    // as our limit is 5;
    const butt=Math.ceil(totalPages/5);
    let buttonArray=new Array(butt).fill(0);
    console.log(buttonArray,"buttonArrayyy...")
    console.log(butt)
    const [page,setPage]=useState(1);
    const { push, query } = useRouter();
    // console.log(page,"i am pagee..")
    useEffect(()=>{
       console.log("i am runing pagination")
        if(page){
            push({query:{...query,page:page}})
          }
          
    },[page])
    return(
        <div>
            {/* <button  onClick={()=>setPage(page+1)}>Next</button>
            <button disabled={page===1} onClick={()=>setPage(page-1)}>Previous</button> */}
            {buttonArray.map((item,index)=>{ 
               return <button key={item.index} value={index+1} onClick={()=>setPage(index+1)}>{index+1}</button> 
             })}
        </div>
    )
}