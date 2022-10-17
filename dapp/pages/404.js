import Link from "next/link";
import styles from "../styles/PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={styles.box}>
      <div className={styles.center}>
        <h2>404 | Page Not Found</h2>
        <Link href={"/"}>
          <h3 className={styles.center_goback}> Go back to the Home page</h3>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
