import { useState, useEffect, useContext } from "react";
import styles from "../styles/uploadNFT.module.css";
import { UploadNFT } from "../uploadNFTPage/uploadNFTIndex";
import { Brand } from "../components/componentIndex";
import { Banner } from "../collectionPage/collectionIndex";
import images from "../img";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const uploadNFT = () => {
  const { uploadToIPFS, createNFT } = useContext(NFTMarketplaceContext);
  return (
    <div className={styles.uploadNFT}>
      <Banner bannerImage={images.creatorbackground4} />
      <div className={styles.uploadNFT_box}>
        <div className={styles.uploadNFT_box_heading}>
          <h1>Create New NFT</h1>
          <p>
            You can set preferred display name, create your profile URL and
            manage other personal settings.
          </p>
        </div>

        <div className={styles.uploadNFT_box_title}>
          <h2>Image, Video, Audio, or 3D Model</h2>
          <p>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 100 MB
          </p>
        </div>

        <div className={styles.uploadNFT_box_form}>
          <UploadNFT uploadToIPFS={uploadToIPFS} createNFT={createNFT} />
        </div>
      </div>
      <Brand />
    </div>
  );
};

export default uploadNFT;
