// DesktopNavbar.tsx
import React from "react";
import styles from "./desktopNavbar.module.css";
import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const DesktopNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from the cookie
    cookie.remove("jwt_token");

    // Log a message to indicate that the user has logged out
    console.log("User logged out");

    // Redirect to the login page
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
