"use-client";
import { Register } from '@/Components/Register'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

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
    <div>
      <form onSubmit={handleSubmit}>
        NAME:
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        Email:
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        Password:
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <input type="submit" />
      </form>
    </div>
  )
}

export default registerauthor
