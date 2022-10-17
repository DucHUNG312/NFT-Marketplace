import Image from "next/image";
import styles from "./NFTTabs.module.css";

const NFTTabs = ({ dataTab, icon }) => {
  return (
    <div className={styles.NFTTabs}>
      {dataTab.map((el, i) => (
        <div className={styles.NFTTabs_box} key={i + 1}>
          <Image
            src={el}
            alt="profile image"
            width={40}
            height={40}
            className={styles.NFTTabs_box_img}
          />
          <div className={styles.NFTTabs_box_info}>
            <span>
              Offer $770 by <span>Duc Hung</span> {icon}
            </span>

            <small>Jun 14 - 4:12 PM</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTTabs;
