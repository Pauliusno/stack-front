// MobileNavbar.tsx
import React from "react";
import styles from "./mobileNavbar.module.css";
import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const MobileNavbar = ({ isActive }) => {
  const router = useRouter();

  const handleLogout = () => {
    cookie.remove("jwt_token");
    t;
    console.log("User logged out");

    router.push("/login");
  };

  return (
    <nav className={`${styles.mobileNav} ${isActive && styles.active}`}>
      <ul>
        <li>
          <Link href="/AddQuestion">Add Question</Link>
        </li>
        <li>
          <Link href="/singin">Sign In</Link>
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

export default MobileNavbar;
