import Image from "next/image";
import styles from "./LikeProfile.module.css";
import images from "../../img";
const LikeProfile = () => {
  const imageArray = [images.user1, images.user2, images.user3, images.user4];
  return (
    <div className={styles.like}>
      {imageArray.map((el, i) => (
        <div className={styles.like_box} key={i + 1}>
          <Image
            src={el}
            width={15}
            height={15}
            key={i + 1}
            className={styles.like_box_img}
          />
        </div>
      ))}
    </div>
  );
};

export default LikeProfile;
