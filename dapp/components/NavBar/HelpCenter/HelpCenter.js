import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import styles from "./HelpCenter.module.css";

const HelpCenter = () => {
  const helpCenter = [
    { name: "About us", link: "about" },
    { name: "Contact us", link: "contact" },
    { name: "Sign up", link: "signup" },
    { name: "Sign in", link: "login" },
    { name: "Subscription", link: "subscription" },
  ];
  return (
    <div className={styles.box}>
      {helpCenter.map((el, i) => (
        <div key={i + 1} className={styles.helpCenter}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default HelpCenter;
