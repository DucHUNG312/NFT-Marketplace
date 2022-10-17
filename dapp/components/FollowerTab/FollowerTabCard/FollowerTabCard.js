import { useState } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import styles from "./FollowerTabCard.module.css";
import images from "../../../img";
import { truncateStr } from "../../../utils/truncateString";

const FollowerTabCard = ({ i, el }) => {
  const [following, setFollowing] = useState(false);

  const followMe = () => {
    setFollowing(!following);
  };
  return (
    <div className={styles.FollowerTabCard}>
      <div className={styles.FollowerTabCard_rank}>
        <p>
          #{i + 1} <span>🥇</span>
        </p>
      </div>

      <div className={styles.FollowerTabCard_box}>
        <div className={styles.FollowerTabCard_box_img}>
          <Image
            className={styles.FollowerTabCard_box_img_img}
            src={el.background || images.creatorbackground1}
            alt="profile braground"
            width={500}
            height={300}
            objectFit="cover"
          />
        </div>

        <div className={styles.FollowerTabCard_box_profile}>
          <Image
            className={styles.FollowerTabCard_box_profile_img}
            alt="profile picture"
            width={50}
            height={50}
            src={el.user || images.user3}
          />
        </div>

        <div className={styles.FollowerTabCard_box_info}>
          <div className={styles.FollowerTabCard_box_info_name}>
            <h4>
              {truncateStr(el.seller.toString(), 15)}
              {""}{" "}
              <span>
                <MdVerified />
              </span>
            </h4>
            <p>{el.total || 0} ETH</p>
          </div>

          <div className={styles.FollowerTabCard_box_info_following}>
            {following ? (
              <a onClick={() => followMe()}>Follow</a>
            ) : (
              <a onClick={() => followMe()}>
                Following{" "}
                <span>
                  <TiTick />
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerTabCard;
