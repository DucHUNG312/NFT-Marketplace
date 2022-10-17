import { useState, useEffect } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import styles from "./NFTDetailsImage.module.css";
import images from "../../img";

const NFTDetailsImage = ({ nft }) => {
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);
  const [like, setLike] = useState(false);

  const openDescription = () => {
    setDescription(!description);
  };

  const openDetails = () => {
    setDetails(!details);
  };

  const likeNFT = () => {
    setLike(!like);
  };

  return (
    <div className={styles.NFTDetailsImage}>
      <div className={styles.NFTDetailsImage_box}>
        <div className={styles.NFTDetailsImage_box_NFT}>
          <div className={styles.NFTDetailsImage_box_NFT_like}>
            <BsImages className={styles.NFTDetailsImage_box_NFT_like_icon} />
            <p onClick={() => likeNFT()}>
              {like ? (
                <AiFillHeart
                  className={styles.NFTDetailsImage_box_NFT_like_icon}
                />
              ) : (
                <AiOutlineHeart
                  className={styles.NFTDetailsImage_box_NFT_like_icon}
                />
              )}
              <span>23</span>
            </p>
          </div>

          <div className={styles.NFTDetailsImage_box_NFT_img}>
            {nft.image && (
              <Image
                src={nft.image}
                className={styles.NFTDetailsImage_box_NFT_img_img}
                alt="NFT Image"
                width={800}
                height={800}
                objectFit="cover"
              />
            )}
          </div>
        </div>

        <div
          className={styles.NFTDetailsImg_box_description}
          onClick={() => openDescription()}
        >
          <p>Description</p>
          {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {description && (
          <div className={styles.NFTDetailsImg_box_description_box}>
            <small>{nft.description}</small>
          </div>
        )}

        <div
          className={styles.NFTDetailsImg_box_details}
          onClick={() => {
            openDetails();
          }}
        >
          <p>Details</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {details && (
          <div className={styles.NFTDetailsImg_box_details_box}>
            <small>2000 x 2000 px.IMAGE(685KB)</small>
            <p>
              Owner Address:
              <br></br>
              <small>{nft.seller}</small>
            </p>
            <p>
              Token ID: &nbsp;
              <small>{nft.tokenId}</small>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImage;
