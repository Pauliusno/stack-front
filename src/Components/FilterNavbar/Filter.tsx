// FilterNavbar.js
import React from "react";
import styles from "./filter.module.css";
import Link from "next/link";

const FilterNavbar = ({ isActive }) => {
  return (
    <nav className={`${styles.filterNav} ${isActive && styles.active}`}>
      <ul>
        <li>
          <Link href="/QuestionsWithAnswers">Question with Answers</Link>
        </li>
        <li>
          <Link href="/QuestionsWithoutAnswers">Questions without Answers</Link>
        </li>
      </ul>
    </nav>
  );
};

export default FilterNavbar;
