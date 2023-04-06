"use-client";
import Link from "next/link";
// import { Register } from '@/Components/Register'
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import baseUrl from "../Config/baseUrl";

const registeruser = () => {
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
      };

      const data = await fetch(`${baseUrl}/api/register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();

      if (result.newUser) {
        alert(result.message);
        router.push("/login");
      } else if (result.message) {
        alert(result.message);
        router.push("/login");
      }
    }
  };
  return (
    <div className={`${styles.formDiv}`}>
      <h1 className={`${styles.textalignCenter}`}>REGISTER</h1>

      <form onSubmit={handleSubmit}>
        <label className={`${styles.labell}`} htmlFor="name">
          Name
        </label>
        <input
          value={name}
          type="text"
          className={`${styles.inputText}`}
          id="name"
          placeholder="Your name.."
          onChange={(e) => setName(e.target.value)}
        />

        <label className={`${styles.labell}`} htmlFor="email">
          Email
        </label>
        <input
          value={email}
          type="email"
          className={`${styles.inputText}`}
          id="email"
          placeholder="Your email.."
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={`${styles.labell}`} htmlFor="password">
          Password
        </label>
        <input
          value={password}
          type="password"
          className={`${styles.inputText}`}
          id="password"
          placeholder="Your password."
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={`${styles.inputSubmit} ${styles.inputSubmitHover}`}
          type="submit"
          value="Submit"
        />
      </form>
      <h3 className={`${styles.linkDecoration}`}>
        <Link className={`${styles.linkDecoration}`} href={"/registerauthor"}>
          Want to Post your own? Click here
        </Link>
      </h3>
      <h3 className={`${styles.linkDecoration}`}>
        <Link className={`${styles.linkDecoration}`} href={"/login"}>
          Already Registered?Login here
        </Link>
      </h3>
    </div>
  );
};

export default registeruser;
