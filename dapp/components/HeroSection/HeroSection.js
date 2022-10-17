import Image from "next/image";
import { Button } from "../componentIndex";
import { useState, useEffect, useContext } from "react";
import styles from "./HeroSection.module.css";
import images from "../../img";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import { useRouter } from "next/router";

const HeroSection = () => {
  const { titleData } = useContext(NFTMarketplaceContext);
  const router = useRouter();

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroSection_box}>
        <div className={styles.heroSection_box_left}>
          <h1>
            {titleData}
            {/* <Image
              src={images.heroemoji}
              alt="emoji"
              width={70}
              height={70}
              objectFit="cover" 
            /> */}
          </h1>
          <p>
            Discover, collect, and sell extraordinary NFTs OpenSea is the world
            first and largest NFT marketplace
          </p>
          <Button
            btnName="Start the Journey"
            handleClick={() => router.push("search")}
          />
        </div>
        <div className={styles.heroSection_box_right}>
          <Image
            src={images.hero}
            alt="Hero section"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
