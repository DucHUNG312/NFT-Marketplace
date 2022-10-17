import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GrClose } from "react-icons/gr";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";

import styles from "./SideBar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";

const SideBar = ({ setOpenSideMenu, currentAcount, connectWallet }) => {
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const discover = [
    { name: "Collection", link: "collection" },
    { name: "Search", link: "search" },
    { name: "Author Profile", link: "author-profile" },
    { name: "NFT Details", link: "nft-details" },
    { name: "Account Setting", link: "account-setting" },
    { name: "Connect Wallet", link: "connect-wallet" },
    { name: "Blog", link: "blog" },
  ];

  const helpCenter = [
    { name: "About", link: "about" },
    { name: "Contact us", link: "contact-us" },
    { name: "Sign up", link: "sign-up" },
    { name: "Sign in", link: "sign-in" },
    { name: "Subscription", link: "subscription" },
  ];

  const openDiscoverMenu = () => {
    setOpenDiscover(!openDiscover);
  };

  const openHelpMenu = () => {
    setOpenHelp(!openHelp);
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };

  return (
    <div className={styles.sideBar}>
      <GrClose
        className={styles.sideBar_closeBtn}
        onClick={() => closeSideBar()}
      />

      <div className={styles.sideBar_box}>
        <Image src={images.logo} alt="logo" width={150} height={150} />
        <p>
          Discover the most outstanding articles on all topices of NFT & write
          your own stories and share them
        </p>
        <div className={styles.sideBar_social}>
          <Link href="https://www.facebook.com/projectopensea">
            <TiSocialFacebook />
          </Link>
          <Link href="https://www.linkedin.com/company/opensea-io">
            <TiSocialLinkedin />
          </Link>
          <Link href="https://twitter.com/opensea">
            <TiSocialTwitter />
          </Link>
          <Link href="https://www.youtube.com/c/OpenSeaTV">
            <TiSocialYoutube />
          </Link>
          <Link href="https://www.instagram.com/opensea/">
            <TiSocialInstagram />
          </Link>
        </div>
      </div>

      <div className={styles.sideBar_menu}>
        <div>
          <div
            className={styles.sideBar_menu_box}
            onClick={() => openDiscoverMenu()}
          >
            <p>Discover</p>
            <TiArrowSortedDown />
          </div>

          {openDiscover && (
            <div className={styles.sideBar_discover}>
              {discover.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>

        <div>
          <div
            className={styles.sideBar_menu_box}
            onClick={() => openHelpMenu()}
          >
            <p>Help Center</p>
            <TiArrowSortedDown />
          </div>

          {openHelp && (
            <div className={styles.sideBar_discover}>
              {helpCenter.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.sideBar_button}>
        {currentAcount == "" ? (
          <Button btnName="Connect" handleClick={() => connectWallet()} />
        ) : (
          <Link href="/upload-nft">
            <a>
              <Button btnName="Create" handleClick={() => {}} />
            </a>
          </Link>
        )}

        {/* <Button btnName="Connect Wallet" handleClick={() => {}} /> */}
      </div>
    </div>
  );
};

export default SideBar;
