import { useState } from "react";
import { NFTCardTwo } from "../../collectionPage/collectionIndex";
import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import styles from "./AuthorNFTCardBox.module.css";
import images from "../../img";

const AuthorNFTCardBox = ({
  collectible,
  created,
  like,
  follower,
  following,
  nfts,
  myNfts,
}) => {
  const collectibleArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];

  const createdleArray = [
    images.nft_image_1,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];

  const likedArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];

  const followingArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground9,
      user: images.user9,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground8,
      user: images.user8,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground10,
      user: images.user10,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
  ];

  const followerArray = [
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground8,
      user: images.user8,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground10,
      user: images.user10,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
  ];

  return (
    <div className={styles.AuthorNFTCardBox}>
      {collectible && <NFTCardTwo NFTData={nfts} />}
      {created && <NFTCardTwo NFTData={myNfts} />}
      {like && <NFTCardTwo NFTData={nfts} />}
      {follower && (
        <div className={styles.AuthorNFTCardBox_box}>
          {followerArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}
      {following && (
        <div className={styles.AuthorNFTCardBox_box}>
          {followingArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorNFTCardBox;
