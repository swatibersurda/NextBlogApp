"use client";
// import { Login } from '@/Components/Login'
import { useRouter } from "next/router";
import React, { useState } from "react";
import jscookies from "js-cookie";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import baseUrl from "../Config/baseUrl";

const login = () => {
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
      const data = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();

      if (result.err) {
        alert(result.err);
        router.push("/registeruser");
      } else {
        alert("Login successfully");
        jscookies.set("token", result.token);
        jscookies.set("user", JSON.stringify(result.user));
        router.push("/?page=1");
      }
    }
  };
  return (
    <div className={`${styles.formDiv}`}>
      <h1 className={`${styles.textalignCenter}`}>LOGIN</h1>

      <form onSubmit={handleSubmit}>
        <label className={`${styles.labell}`} htmlFor="email">
          Email
        </label>
        <input
          value={email}
          className={`${styles.inputText}`}
          type="text"
          id="email"
          placeholder="Your name.."
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={`${styles.labell}`} htmlFor="password">
          Password
        </label>
        <input
          value={password}
          className={`${styles.inputText}`}
          type="password"
          id="password"
          placeholder="Your last name.."
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className={`${styles.inputSubmit} ${styles.inputSubmitHover}`}
          type="submit"
          value="Submit"
        />
      </form>
      <h3 className={`${styles.linkDecoration}`}>
        <Link className={`${styles.linkDecoration}`} href={"/registeruser"}>
          Not Registered?Register here
        </Link>
      </h3>
    </div>
  );
};

export default login;
