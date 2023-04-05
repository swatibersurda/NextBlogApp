"use-client";
// import { Register } from '@/Components/Register'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styles from "../styles/Home.module.css"

const registerauthor = () => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (email && name && password) {
        const payload = {
          name,
          email,
          password,
          role:"author"
        };
        const data = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await data.json();
        console.log(result, "result after register");
          if(result.newUser){
            router.push("/login")
          }
      }
    };
  return (
    <div className={`${styles.formDiv}`}>
    <h1 className={`${styles.textalignCenter}`}>REGISTER AUTHOR</h1>

       <form onSubmit={handleSubmit}>
  <label className={`${styles.labell}`}  htmlFor="name">Name</label>
  <input value={name} type="text" className={`${styles.inputText}`}  id="name" placeholder="Your name.." onChange={(e) => setName(e.target.value)}/>

  <label  className={`${styles.labell}`}  htmlFor="email">Email</label>
  <input value={email} type="email" className= {`${styles.inputText}`}  id="email" placeholder="Your email.."  onChange={(e) => setEmail(e.target.value)}/>

  <label  className={`${styles.labell}`}  htmlFor="password">Password</label>
  <input type="password" className= {`${styles.inputText}`} id="password" placeholder="Your password." value={password}  onChange={(e) => setPassword(e.target.value)}/>
 <input className= {`${styles.inputSubmit} ${styles.inputSubmitHover}`} type="submit" value="Submit"/>
</form>

  </div>
  )
}

export default registerauthor
