import React from "react";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialInstagram,
  TiSocialYoutube,
} from "react-icons/ti";

//INTERNAL IMPORT
import styles from "./CollectionProfile.module.css";
import images from "../../img";

const CollectionProfile = () => {
  const cardArray = [1, 2, 3, 4];
  return (
    <div className={styles.collectionProfile}>
      <div className={styles.collectionProfile_box}>
        <div className={styles.collectionProfile_box_left}>
          <Image
            src={images.nft_image_1}
            alt="nft image"
            width={800}
            height={800}
            className={styles.collectionProfile_box_left_img}
          />

          <div className={styles.collectionProfile_box_left_social}>
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

        <div className={styles.collectionProfile_box_middle}>
          <h1>Awesome NFTs Collection</h1>
          <p>
            Karafuru is home to 5,555 generative arts where colors reign
            supreme. Leave the drab reality and enter the world of Karafuru by
            Museum of Toys.
          </p>

          <div className={styles.collectionProfile_box_middle_box}>
            {cardArray.map((el, i) => (
              <div
                className={styles.collectionProfile_box_middle_box_item}
                key={i + 1}
              >
                <small>Floor price</small>
                <p>${i + 1}95,4683</p>
                <span>+ {i + 2}.11%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionProfile;
