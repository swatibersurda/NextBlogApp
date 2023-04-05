"use client";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import jscookies from "js-cookie";
export const Navbar = () => {
  
  const [urll, setUrll] = useState("");
  const { push, query, pathname } = useRouter();
  const parsecookies = parseCookies();
  // const [user,setUser]=useState("")
  // console.log(user,"useee")
  const user = parsecookies.user ? JSON.parse(parsecookies.user) : "";
  // console.log(user.role, "iam parsed");
  // console.log(query, pathname, "querypathh..");

  // SETTING THE INPUT

  const handleSearchParams = (val) => {
    setUrll(val);
  };

  useEffect(() => {
    // IF A USER SEARCHING FOR TITLE OR CONTENT LENGTH >2 THEN IT SHOULD BE SETTED ON
    // QUERY PARAMS AND SHOULD BE FETCHED BY HOME PAGE.
    if (urll.length > 2) {
      push({ query: { ...query, data: urll } });
    } else {
      // BE DEFAULT ON RENDER WE WANT TO SERACH DATA FOR PAGE 1.
      push("/?page=1");
    }
    // note always do browser releted stuff on use effect to prevent hydration errror.
    //  let userr = parsecookies.user ? JSON.parse(parsecookies.user) : "";
    //  setUser(userr)

  }, [urll]);

  const handleLogout = () => {
    jscookies.remove("token", { path: "" });
    jscookies.remove("user", { path: "" });
    push("/?page=1");
  };

  return (
    <div className={`${styles.divContainer}`}>
      <div className={`${styles.navDiv}`}>
        <li className={`${styles.navli}`}>
          {" "}
          <Link className={`${styles.noDecoration}`} href={"/?page=1"}>
            HomePage{" "}
          </Link>
        </li>

        {user ? (
          <>
            <li className={`${styles.navli}`} onClick={handleLogout}>
              Logout
            </li>
          </>
        ) : (
          <>
            {/* Means if there is no user these login and regiter should be visible */}

            <li className={`${styles.navli}`}>
              <Link className={`${styles.noDecoration}`} href={"/login"}>
                Login
              </Link>
            </li>

            <li className={`${styles.navli}`}>
              <Link className={`${styles.noDecoration}`} href={"/registeruser"}>
                Register
              </Link>
            </li>
          </>
        )}

        {/* Reader should has no access of create a blog */}

        {user && user.role !== "reader" ? (
          <>
            {" "}
            <li className={`${styles.navli}`}>
              <Link className={`${styles.noDecoration}`} href={"/createpage"}>
                CreatePage
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}

        {user && user.role === "author" ? (
          <>
            {" "}
            <li className={`${styles.navli}`}>
              <Link className={`${styles.noDecoration}`} href={"/authorpanel"}>
                AuthorPost
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}

        {user && user.role === "admin" ? (
          <>
            {" "}
            <li className={`${styles.navli}`}>
              <Link className={`${styles.noDecoration}`} href={`/adminpanel`}>
                AdminPanel
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </div>
      {/* means input should only be inside all blog page */}
      {query.page || query.data ? (
        <>
          <div className={`${styles.inpuDiv}`}>
            <input
              className={`${styles.inputt}`}
              value={urll}
              onChange={(e) => handleSearchParams(e.target.value)}
            />
          </div>
        </>
      ) : (
        <>""</>
      )}
    </div>
    // </div>
  );
};
