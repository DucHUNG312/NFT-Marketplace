import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentIndex";
import { useState, useContext, useEffect } from "react";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import { getTopCreators } from "../utils/TopCreators";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { checkIfWalletConnected, fetchNFTs, currentAccount } = useContext(
    NFTMarketplaceContext
  );

  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  // Creator list
  const TopCreators = getTopCreators(nfts);
  //const TopCreators = getTop8Creators(nfts);

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

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

  return (
    <div className={styles.homePage}>
      <HeroSection />
      <Service />
      <Title
        heading="Hot Collections"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <BigNFTSlider />
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />
      {TopCreators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreators={TopCreators} />
      )}

      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCard nfts={nfts} />}

      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;
