import Image from "next/image";
import { MdVerified } from "react-icons/md";
import styles from "./DaysComponents.module.css";
import images from "../../../img";

const DaysComponents = ({ el, i }) => {
  return (
    <div className={styles.daysComponent}>
      <div className={styles.daysComponent_box}>
        <div className={styles.daysComponent_box_img}>
          <Image
            src={el.background}
            className={styles.daysComponent_box_img_img}
            alt="profile background"
            width={620}
            height={300}
            objectFit="cover"
          />
        </div>

        <div className={styles.daysComponent_box_profile}>
          <Image
            src={el.background}
            alt="profile"
            width={200}
            height={200}
            className={styles.daysComponent_box_img_1}
            objectFit="covers"
          />
          <Image
            src={el.background}
            alt="profile"
            width={200}
            height={200}
            className={styles.daysComponent_box_img_2}
            objectFit="covers"
          />
          <Image
            src={el.background}
            alt="profile"
            width={200}
            height={200}
            className={styles.daysComponent_box_img_3}
            objectFit="covers"
          />
        </div>

        <div className={styles.daysComponent_box_title}>
          <h2>Amazing Collection</h2>
          <div className={styles.daysComponent_box_title_info}>
            <div className={styles.daysComponent_box_title_info_profile}>
              <Image
                src={el.user}
                alt="profile"
                width={30}
                height={30}
                objectFit="covers"
                className={styles.daysComponent_box_title_info_profile_img}
              />

              <p>
                Creator
                <span>
                  Duc Hung
                  <small>
                    <MdVerified />
                  </small>
                </span>
              </p>
            </div>

            <div className={styles.daysComponent_box_title_info_price}>
              <small>1.255 ETH</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponents;
