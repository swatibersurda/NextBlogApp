"use client";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import jscookies from "js-cookie";
import { GoPerson } from "react-icons/go";
import dynamic from "next/dynamic";
export const Navbar = () => {
  const [urll, setUrll] = useState("");
  const { push, query, pathname } = useRouter();
  const parsecookies = parseCookies();

  const user = parsecookies.user ? JSON.parse(parsecookies.user) : "";

  // SETTING THE INPUT

  useEffect(() => {
    // IF A USER SEARCHING FOR TITLE OR CONTENT LENGTH >2 THEN IT SHOULD BE SETTED ON
    // QUERY PARAMS AND SHOULD BE FETCHED BY HOME PAGE.
    if (urll !== "") {
      push({ query: { ...query, data: urll } });
    } else {
      // BE DEFAULT ON RENDER WE WANT TO SERACH DATA FOR PAGE 1.
      push("/?page=1");
    }
  }, [urll]);

  const handleLogout = () => {
    jscookies.remove("token", { path: "" });
    jscookies.remove("user", { path: "" });
    push("/login");
  };

  return (
    <nav className={`${styles.menu}`}>
      <ul className={`${styles.menuul}`}>
        <li className={`${styles.menuli}`}>
          {" "}
          <Link className={`${styles.lilink}`} href={"/?page=1"}>
            Home{" "}
          </Link>
        </li>

        {user ? (
          <>
            {" "}
            <li className={`${styles.menuli}`}>
              <Link
                className={`${styles.lilink}`}
                href={"/login"}
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}

        {!user ? (
          <>
            <li className={`${styles.menuli}`}>
              <Link className={`${styles.lilink}`} href={"/login"}>
                Login
              </Link>
            </li>

            <li className={`${styles.menuli}`}>
              <Link className={`${styles.lilink}`} href={"/registeruser"}>
                Register
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}

        {/* Reader should has no access of create a blog */}

        {user && user.role !== "reader" ? (
          <>
            <li className={`${styles.menuli}`}>
              <Link className={`${styles.lilink}`} href={"/createpage"}>
                Create
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}

        {user && user.role === "author" ? (
          <>
            <li className={`${styles.menuli}`}>
              <Link className={`${styles.lilink}`} href={"/authorpanel"}>
                <GoPerson color="white" fontSize={"18px"}></GoPerson>
                {} Author
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
        {user && user.role === "admin" ? (
          <>
            <li className={`${styles.menuli}`}>
              <Link className={`${styles.lilink}`} href={`/adminpanel`}>
                Admin
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>

      {query.page || query.data ? (
        <>
          <input
            placeholder="Search Title,Content"
            className={`${styles.serchInput}`}
            value={urll}
            onChange={(e) => setUrll(e.target.value)}
          />
        </>
      ) : (
        <></>
      )}
    </nav>
  );
};
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
