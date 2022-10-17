import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";
import styles from "./Footer.module.css";
import images from "../../img";
import { Discover, HelpCenter } from "../NavBar/index";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_box}>
        <div className={styles.footer_box_social}>
          <Image
            src={images.opensea}
            alt="footer logo"
            width={50}
            height={50}
          />
          <p>
            The world’s first and largest digital marketplace for crypto
            collectibles and non-fungible tokens (NFTs). Buy, sell, and discover
            exclusive digital items.
          </p>

          <div className={styles.footer_social}>
            <a href="https://www.facebook.com/projectopensea" target="_blank">
              <TiSocialFacebook />
            </a>
            <a
              href="https://www.linkedin.com/company/opensea-io/"
              target="_blank"
            >
              <TiSocialLinkedin />
            </a>
            <a href="https://twitter.com/opensea" target="_blank">
              <TiSocialTwitter />
            </a>
            <a href="https://www.youtube.com/c/OpenSeaTV" target="_blank">
              <TiSocialYoutube />
            </a>
            <a href="https://www.instagram.com/opensea/" target="_blank">
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={styles.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>

        <div className={styles.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter />
        </div>

        <div className={styles.subscribe}>
          <h3>Stay in the loop</h3>

          <div className={styles.subscribe_box}>
            <input type="email" placeholder="Enter your email *" />
            <RiSendPlaneFill className={styles.subscribe_box_send} />
          </div>
          <div className={styles.subscribe_box_info}>
            <p>
              Join our mailing list to stay in the loop with our newest feature
              releases, NFT drops, and tips and tricks for navigating NFT world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
