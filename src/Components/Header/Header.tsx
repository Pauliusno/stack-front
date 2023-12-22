// Header.js
import React, { useState } from "react";
import Link from "next/link";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import FilterNavbar from "../FilterNavbar/Filter";

import styles from "./header.module.css";

const Header = () => {
  const [isShowMobileNavbar, setShowMobileNavbar] = useState(false);
  const [isShowFilterNavbar, setShowFilterNavbar] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Link href="/">
          <img
            className={styles.img}
            src="https://png2.cleanpng.com/sh/805fbfc84aad4907214bdaca2988e6eb/L0KzQYm3VsI0N6NuiZH0aYP2gLBuTgN1aZRwRdHBZYLpfLFATgNwbqV8eeRuLXTohrbzjCBmel5oh995YYLsg7F1Tf9nNaIyTdQ7ZkDoRYK5UBM1QGEzTKk6M0m0Qoe4VcI6QGI1TaM8MUS5RXB3jvc=/kisspng-stack-overflow-software-developer-comparison-of-q-5b2f0e5123c480.4713912615298105131465.png"
            alt=""
          />
        </Link>
        <button
          className={styles.filterButton}
          onClick={() => setShowFilterNavbar((prevState) => !prevState)}
        >
          <img
            className={styles.filterIcon}
            src="https://cdn.iconscout.com/icon/free/png-256/free-filter-conversion-exchange-remove-throw-exit-46190.png"
            alt="Filter"
          />
        </button>
      </div>

      <DesktopNavbar />

      <button
        className={styles.burgerButtonStyle}
        onClick={() => setShowMobileNavbar((prevState) => !prevState)}
      >
        <svg
          className={styles.burgerButton}
          viewBox="0 0 100 10"
          width="40"
          height="40"
        >
          <rect width="60" height="10"></rect>
          <rect y="20" width="60" height="10"></rect>
          <rect y="40" width="60" height="10"></rect>
        </svg>
      </button>

      <MobileNavbar isActive={isShowMobileNavbar} />
      <FilterNavbar isActive={isShowFilterNavbar} />
    </div>
  );
};

export default Header;
