import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <Link href="#">
        <img
          className={styles.img}
          src="https://png2.cleanpng.com/sh/805fbfc84aad4907214bdaca2988e6eb/L0KzQYm3VsI0N6NuiZH0aYP2gLBuTgN1aZRwRdHBZYLpfLFATgNwbqV8eeRuLXTohrbzjCBmel5oh995YYLsg7F1Tf9nNaIyTdQ7ZkDoRYK5UBM1QGEzTKk6M0m0Qoe4VcI6QGI1TaM8MUS5RXB3jvc=/kisspng-stack-overflow-software-developer-comparison-of-q-5b2f0e5123c480.4713912615298105131465.png"
          alt=""
        />
      </Link>

      {/* Separate nav component */}
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link href="#">Add Question</Link>
          </li>

          <li>
            <Link href="#">
              <img
                className={styles.filter}
                src="https://cdn.iconscout.com/icon/free/png-256/free-filter-conversion-exchange-remove-throw-exit-46190.png"
                alt=""
              />
            </Link>
          </li>
          <li>
            <button>Log in</button>
          </li>
          <li>
            <button>Sing in</button>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
