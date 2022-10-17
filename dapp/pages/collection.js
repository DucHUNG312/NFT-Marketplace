import styles from "../styles/collection.module.css";
import images from "../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../collectionPage/collectionIndex";
import { Slider, Brand } from "../components/componentIndex";
import Filter from "../components/Filter/Filter";
import { useState, useEffect, useContext } from "react";
import {
  NFTMarketplaceContext,
  currentAccount,
} from "../Context/NFTMarketplaceContext";

const Collection = () => {
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  const { fetchNFTs } = useContext(NFTMarketplaceContext);

  useEffect(() => {
    try {
      if (currentAccount) {
        fetchNFTs().then((item) => {
          setNfts(item.reverse());
          setNftsCopy(item);
        });
      }
    } catch (error) {
      setError(
        "Infura service is busy! Please try to reload your page or wait a few minutes"
      );
    }
  }, []);

  const collectionArray = [
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
  return (
    <div className={styles.collection}>
      <Banner bannerImage={images.nftbackground3} />
      <CollectionProfile />
      <Filter />
      <NFTCardTwo NFTData={nfts} />
      <Slider />
      <Brand />
    </div>
  );
};

export default Collection;
