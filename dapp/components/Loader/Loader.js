import styles from "./Loader.module.css";
import Image from "next/image";
import images from "../../img";

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <div className={styles.Loader_box}>
        <div className={styles.Loader_box_img}>
          <Image
            src={images.loader}
            alt="loading"
            width={100}
            height={100}
            className={styles.Loader_box_img_img}
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
