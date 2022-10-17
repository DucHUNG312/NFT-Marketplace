import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import styles from "./Error.module.css";
import images from "../../img";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const Error = () => {
  const { error, setOpenError } = useContext(NFTMarketplaceContext);

  return (
    <div className={styles.Error} onClick={() => setOpenError(false)}>
      <div className={styles.Error_box}>
        <div className={styles.Error_box_info}>
          <Image
            src={images.opensea}
            alt="error"
            width={80}
            height={80}
            className={styles.Error_box_info_img}
          />

          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
