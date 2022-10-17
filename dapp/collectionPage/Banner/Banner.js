import Image from "next/image";
import styles from "./Banner.module.css";

const Banner = ({ bannerImage }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner_img}>
        <Image
          className={styles.banner_img_img}
          src={bannerImage}
          objectFit="cover"
          alt="background"
          width={2400}
          height={300}
        />
      </div>

      <div className={styles.banner_img_mobile}>
        <Image
          src={bannerImage}
          objectFit="cover"
          alt="background"
          width={1600}
          height={900}
        />
      </div>
    </div>
  );
};

export default Banner;
