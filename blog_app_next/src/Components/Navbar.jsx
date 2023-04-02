"use client";
import Link from "next/link";
import styles from "../styles/Home.module.css"
import { useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/router";
export const Navbar = () => {
    const [urll,setUrll]=useState("");
    
    const { push, query } = useRouter();

// const buttonHandler = () =>
//   push({ query: { ...query, newParam: 'someValue' } }, undefined, { shallow: true });

    const handleSearchParams=(val)=>{
        console.log(val,"vallll..")
        setUrll(val)
        push({query:{...query,title:urll}})

    }
  return (
    // className={`${styles.navul}`}
    // className={`${styles.navli}`}
    <div className={`${styles.divContainer}`}>
        <div className={`${styles.navDiv}`}>
        <Link className={`${styles.noDecoration}`} href={"/"}><li className={`${styles.navli}`} >HomePage</li></Link>
        <Link className={`${styles.noDecoration}`} href={"/"}><li className={`${styles.navli}`}>PostPage</li></Link>
        <Link className={`${styles.noDecoration}`} href={"/"}><li className={`${styles.navli}`}>CreatePage</li></Link>
        <Link className={`${styles.noDecoration}`} href={"/"}><li className={`${styles.navli}`}>Login</li></Link>
        <Link className={`${styles.noDecoration}`} href={"/"}><li className={`${styles.navli}`}>Register</li></Link>
        </div>
    
     
        <div  className={`${styles.inpuDiv}`}>
        <input className={`${styles.inputt}`} value={urll} onChange={(e)=>handleSearchParams(e.target.value)}/>
        </div>
      
    
    </div>
  );
};
