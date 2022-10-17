import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import styles from "./NFTCardTwo.module.css";
import { LikeProfile } from "../../components/componentIndex";

const NFTCardTwo = ({ NFTData }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(22);

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(23);
    } else {
      setLike(false);
      setLikeInc(22);
    }
  };

  return (
    <div className={styles.NFTCardTwo}>
      {NFTData.map((el, i) => (
        <Link href={{ pathname: "/nft-details", query: el }} key={i + 1}>
          <div className={styles.NFTCardTwo_box} key={i + 1}>
            <div className={styles.NFTCardTwo_box_like}>
              <div className={styles.NFTCardTwo_box_like_box}>
                <div className={styles.NFTCardTwo_box_like_box_box}>
                  <BsImage
                    className={styles.NFTCardTwo_box_like_box_box_icon}
                  />
                  <p onClick={() => likeNFT()}>
                    {like ? <AiFillHeart /> : <AiOutlineHeart />}
                    {""}
                    <span>{likeInc}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.NFTCardTwo_box_img}>
              <Image
                src={el.image}
                alt="NFT"
                width={500}
                height={500}
                objectFit="cover"
                className={styles.NFTCardTwo_box_img_img}
              />
            </div>

            <div className={styles.NFTCardTwo_box_info}>
              <div className={styles.NFTCardTwo_box_info_left}>
                <LikeProfile />
                <p>{el.name}</p>
              </div>
              <small>4{i + 2}</small>
            </div>

            <div className={styles.NFTCardTwo_box_price}>
              <div className={styles.NFTCardTwo_box_price_box}>
                <small>Current Bid</small>
                <p>{el.price} ETH</p>
              </div>
              <p className={styles.NFTCardTwo_box_price_stock}>
                <MdTimer /> <span>{i + 1} hours left</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCardTwo;
