import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLines } from "react-icons/tb";
import styles from "./BigNFTSlider.module.css";
import images from "../../img";

const BigNFTSlider = () => {
  const [idNumber, setIdNumber] = useState(0);

  const sliderData = [
    {
      title: "Hello NFT",
      id: 1,
      name: "Duc Hung",
      collection: "Yacht",
      price: "00000696969 ETH",
      like: 243,
      image: images.user1,
      nftImage: images.nft_image_1,
      time: {
        days: 27,
        hours: 10,
        minutes: 11,
        seconds: 35,
      },
    },
    {
      title: "Hello NFT",
      id: 2,
      name: "Duc Hung",
      collection: "Yacht",
      price: "00000696969 ETH",
      like: 243,
      image: images.user2,
      nftImage: images.nft_image_2,
      time: {
        days: 27,
        hours: 10,
        minutes: 11,
        seconds: 35,
      },
    },
    {
      title: "Hello NFT",
      id: 3,
      name: "Duc Hung",
      collection: "Yacht",
      price: "00000696969 ETH",
      like: 243,
      image: images.user3,
      nftImage: images.nft_image_3,
      time: {
        days: 27,
        hours: 10,
        minutes: 11,
        seconds: 35,
      },
    },
    {
      title: "Hello NFT",
      id: 4,
      name: "Duc Hung",
      collection: "Yacht",
      price: "00000696969 ETH",
      like: 243,
      image: images.user4,
      nftImage: images.nft_image_2,
      time: {
        days: 27,
        hours: 10,
        minutes: 11,
        seconds: 35,
      },
    },
  ];

  const inc = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
      setIdNumber(idNumber + 1);
    } else if (idNumber + 1 >= sliderData.length) {
      setIdNumber(0);
    }
  }, [idNumber, sliderData.length]);

  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    } else if (idNumber - 1 < 0) {
      setIdNumber(sliderData.length - 1);
    }
  }, [idNumber, sliderData.length]);

  return (
    <div className={styles.bigNFTSlider}>
      <div className={styles.bigNFTSlider_box}>
        <div className={styles.bigNFTSlider_box_left}>
          <h2>{sliderData[idNumber].title}</h2>
          <div className={styles.bigNFTSlider_box_left_creator}>
            <div className={styles.bigNFTSlider_box_left_creator_profile}>
              <Image
                className={styles.bigNFTSlider_box_left_creator_profile_img}
                src={sliderData[idNumber].image}
                alt="profile image"
                width={50}
                height={50}
              />
              <div
                className={styles.bigNFTSlider_box_left_creator_profile_info}
              >
                <p>Creator</p>
                <h4>
                  {sliderData[idNumber].name}{" "}
                  <span>
                    <MdVerified />
                  </span>
                </h4>
              </div>
            </div>

            <div className={styles.bigNFTSlider_box_left_creator_collection}>
              <AiFillFire
                className={styles.bigNFTSlider_box_left_creator_collection_icon}
              />

              <div
                className={styles.bigNFTSlider_box_left_creator_collection_info}
              >
                <p>Collection</p>
                <h4>{sliderData[idNumber].collection}</h4>
              </div>
            </div>
          </div>

          <div className={styles.bigNFTSlider_box_left_bidding}>
            <div className={styles.bigNFTSlider_box_left_bidding_box}>
              <small>Current Bid</small>
              <p>
                {sliderData[idNumber].price} <span>$221,21</span>
              </p>
            </div>

            <p className={styles.bigNFTSlider_box_left_bidding_box_auction}>
              <MdTimer
                className={styles.bigNFTSlider_box_left_bidding_box_icon}
              />
              <span>Auction ending in</span>
            </p>

            <div className={styles.bigNFTSlider_box_left_bidding_box_timer}>
              <div
                className={styles.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.days}</p>
                <span>Days</span>
              </div>

              <div
                className={styles.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.hours}</p>
                <span>Hours</span>
              </div>

              <div
                className={styles.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.minutes}</p>
                <span>mins</span>
              </div>

              <div
                className={styles.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.seconds}</p>
                <span>secs</span>
              </div>
            </div>

            <div className={styles.bigNFTSlider_box_left_button}>
              <Button btnName="Place" handleClick={() => {}} />
              <Button btnName="View" handleClick={() => {}} />
            </div>
          </div>

          <div className={styles.bigNFTSlider_box_left_sliderBtn}>
            <TbArrowBigLeftLines
              className={styles.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => dec()}
            />
            <TbArrowBigRightLines
              className={styles.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => inc()}
            />
          </div>
        </div>

        <div className={styles.bigNFTSlider_box_right}>
          <div className={styles.bigNFTSlider_box_right_box}>
            <Image
              src={sliderData[idNumber].nftImage}
              alt="NFT IMAGE"
              className={styles.bigNFTSlider_box_right_box_img}
              width={1100}
              height={1100}
              objectFit="cover"
            />

            <div className={styles.bigNFTSlider_box_right_box_like}>
              <AiFillHeart />
              <span>{sliderData[idNumber].like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigNFTSlider;
