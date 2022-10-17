import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";
import { truncateStr } from "../../../utils/truncateString";
import styles from "./Profile.module.css";
import images from "../../../img";

const Profile = ({ currentAccount }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile_account}>
        <Image
          src={images.user1}
          alt="user profile"
          width={50}
          height={50}
          className={styles.profile_account_img}
        />

        <div className={styles.profile_account_info}>
          <p>Duc Hung</p>
          <small>{truncateStr(currentAccount.toString(), 15)}</small>
        </div>
      </div>

      <div className={styles.profile_menu}>
        <div className={styles.profile_menu_one}>
          <div className={styles.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{ pathname: "/author-profile" }}>My Profile</Link>
            </p>
          </div>
          <div className={styles.profile_menu_one_item}>
            <FaRegImage />
            <p>
              <Link href={{ pathname: "/author-profile" }}>My Items</Link>
            </p>
          </div>
          <div className={styles.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{ pathname: "/account-setting" }}>Edit Profile</Link>
            </p>
          </div>
        </div>

        <div className={styles.profile_menu_two}>
          <div className={styles.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link href={{ pathname: "/contact" }}>Help</Link>
            </p>
          </div>
          <div className={styles.profile_menu_one_item}>
            <TbDownload />
            <p>
              <Link href={{ pathname: "/about" }}>About us</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
