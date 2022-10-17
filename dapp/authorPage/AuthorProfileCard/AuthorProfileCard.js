import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  MdVerified,
  MdCloudUpload,
  MdOutlineReportProblem,
} from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialInstagram,
  TiSocialYoutube,
  TiTick,
} from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "../../components/componentIndex";
import styles from "./AuthorProfileCard.module.css";
import images from "../../img";

const AuthorProfileCard = ({ currentAccount }) => {
  const [follow, setFollow] = useState(false);
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const shareRef = useRef();

  useEffect(() => {
    let handlerClickOutside = (e) => {
      if (!shareRef.current.contains(e.target)) {
        setShare(false);
        setReport(false);
      }
    };

    document.addEventListener("mousedown", handlerClickOutside);

    return () => {
      document.removeEventListener("mousedown", handlerClickOutside);
    };
  });

  const copyAddress = () => {
    const copyText = document.getElementById("myInput");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  const openShare = () => {
    if (!share) {
      setShare(true);
      setReport(false);
    } else {
      setShare(false);
    }
  };

  const openReport = () => {
    if (!report) {
      setReport(true);
      setShare(false);
    } else {
      setReport(false);
    }
  };

  const handleFollow = () => {
    setFollow(!follow);
  };

  return (
    <div className={styles.AuthorProfileCard}>
      <div className={styles.AuthorProfileCard_box}>
        <div className={styles.AuthorProfileCard_box_img}>
          <Image
            src={images.nft_image_1}
            className={styles.AuthorProfileCard_box_img_img}
            alt="nft image"
            width={220}
            height={220}
          />
        </div>

        <div className={styles.AuthorProfileCard_box_info}>
          <h2>
            Spyderman{" "}
            <span>
              <MdVerified />
            </span>
          </h2>

          <div className={styles.AuthorProfileCard_box_info_address}>
            <input type="text" value={currentAccount} id="myInput" readOnly />
            <FiCopy
              onClick={() => copyAddress()}
              className={styles.AuthorProfileCard_box_info_address_icon}
            />
          </div>

          <p>
            Spyderman / An OG Cryptopunk Collector, hoader of NFTs. Contributing
            to @ether_cards, an NFT Monetization Platform
          </p>

          <div className={styles.AuthorProfileCard_box_info_social}>
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

        <div ref={shareRef} className={styles.AuthorProfileCard_box_share}>
          {follow ? (
            <Button
              btnName="Following"
              icon=<TiTick />
              handleClick={handleFollow}
            />
          ) : (
            <Button btnName="Follow" handleClick={handleFollow} />
          )}
          <MdCloudUpload
            onClick={() => openShare()}
            className={styles.AuthorProfileCard_box_share_icon}
          />
          {share && (
            <div className={styles.AuthorProfileCard_box_share_upload}>
              <p>
                <span>
                  <TiSocialFacebook />
                </span>{" "}
                Facebook
              </p>
              <p>
                <span>
                  <TiSocialLinkedin />
                </span>{" "}
                Linkedin
              </p>
              <p>
                <span>
                  <TiSocialTwitter />
                </span>{" "}
                Twitter
              </p>
              <p>
                <span>
                  <TiSocialYoutube />
                </span>{" "}
                Youtube
              </p>
              <p>
                <span>
                  <TiSocialInstagram />
                </span>{" "}
                Instagram
              </p>
            </div>
          )}

          <BsThreeDots
            onClick={() => openReport()}
            className={styles.AuthorProfileCard_box_share_icon}
          />
          {report && (
            <p className={styles.AuthorProfileCard_box_share_report}>
              <span>
                <MdOutlineReportProblem />
              </span>{" "}
              Report abouse
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;
