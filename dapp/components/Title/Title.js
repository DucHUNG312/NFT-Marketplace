import styles from "./Title.module.css";

const Title = ({ heading, paragraph }) => {
  return (
    <div className={styles.title}>
      <div className={styles.title_box}>
        <h2>{heading}</h2>
        <p>{paragraph}</p>
      </div>
    </div>
  );
};

export default Title;
