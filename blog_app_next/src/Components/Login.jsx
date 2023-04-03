"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const payload = {
        email,
        password,
      };
      const data = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();
      console.log(result, "result after login");
    //   if (result.newUser) {
    //     router.push("/?page=1");
    //   }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
  );
};
