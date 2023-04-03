"use client";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
export const Navbar = () => {
  console.log("i am runing navbar");
  const [urll, setUrll] = useState("");

  const { push, query } = useRouter();
  const handleSearchParams = (val) => {
    setUrll(val);
  };

  useEffect(() => {
    if (urll.length > 2) {
      push({ query: { ...query, data: urll } });
    } else {
      push("/");
    }
  }, [urll]);

  return (
    <div className={`${styles.divContainer}`}>
      <div className={`${styles.navDiv}`}>
        <Link className={`${styles.noDecoration}`} href={"/"}>
          <li className={`${styles.navli}`}>HomePage</li>
        </Link>
        <Link className={`${styles.noDecoration}`} href={"/"}>
          <li className={`${styles.navli}`}>PostPage</li>
        </Link>
        <Link className={`${styles.noDecoration}`} href={"/"}>
          <li className={`${styles.navli}`}>CreatePage</li>
        </Link>
        <Link className={`${styles.noDecoration}`} href={"/"}>
          <li className={`${styles.navli}`}>Login</li>
        </Link>
        <Link className={`${styles.noDecoration}`} href={"/"}>
          <li className={`${styles.navli}`}>Register</li>
        </Link>
      </div>

      <div className={`${styles.inpuDiv}`}>
        <input
          className={`${styles.inputt}`}
          value={urll}
          onChange={(e) => handleSearchParams(e.target.value)}
        />
      </div>
    </div>
  );
};
