// DesktopNavbar.tsx
import React from "react";
import styles from "./desktopNavbar.module.css";
import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const DesktopNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    cookie.remove("jwt_token");

    console.log("User logged out");

    router.push("/login");
  };

  return (
    <nav className={styles.desktopNav}>
      <ul>
        <li>
          <Link href="/AddQuestion">Add Question</Link>
        </li>
        <li>
          <Link href="/singin">Sing In</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <button className={styles.warning} onClick={handleLogout}>
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNavbar;
