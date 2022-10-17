import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

import styles from "./Category.module.css";
import images from "../../img";

const Category = () => {
  const CategoryArray = [
    images.creatorbackground1,
    images.creatorbackground2,
    images.creatorbackground3,
    images.creatorbackground4,
    images.creatorbackground5,
    images.creatorbackground6,
  ];
  return (
    <div className={styles.box_category}>
      <div className={styles.category}>
        {CategoryArray.map((el, i) => (
          <div className={styles.category_box} key={i + 1}>
            <Image
              src={el}
              className={styles.category_box_img}
              alt="Background image"
              width={350}
              height={150}
              objectFit="cover"
            />

            <div className={styles.category_box_title}>
              <span>
                <BsCircleFill />
              </span>
              <div className={styles.category_box_title_info}>
                <h4>Enterainment</h4>
                <small>1995 NFTS</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
