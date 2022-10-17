import styles from "../styles/search.module.css";
import { useState, useEffect, useContext } from "react";
import { Slider, Brand, Loader } from "../components/componentIndex";
import { SearchBar } from "../searchPage/searchPageIndex";
import { Filter } from "../components/componentIndex";
import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const searchPage = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    try {
      fetchNFTs().then((item) => {
        if (!item) return;
        setNfts(item.reverse());
        setNftsCopy(item);
      });
    } catch (error) {
      // setError(
      //   "Infura service is busy! Please try to reload your page or wait a few minutes"
      // );
      console.log(error);
    }
  }, []);

  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];

  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter((nft) =>
      nft.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTs.length == 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTs);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  return (
    <div className={styles.searchPage}>
      <Banner bannerImage={images.nftbackground3} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
