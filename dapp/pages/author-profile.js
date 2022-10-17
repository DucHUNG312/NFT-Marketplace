import { useState, useEffect, useRef, useContext } from "react";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/authorIndex";
import { Brand, Title, Loader } from "../components/componentIndex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import styles from "../styles/Author.module.css";
import images from "../img";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Author = () => {
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
    {
      background: images.creatorbackground7,
      user: images.user7,
      seller: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
  ];

  const [collectible, setCollectible] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  const [nfts, setNfts] = useState([]);
  const [myNfts, setMyNfts] = useState([]);

  useEffect(() => {
    if (currentAccount) {
      fetchMyNFTsOrListedNFTs("fetchItemsListed")
        .then((items) => {
          setNfts(items);
        })
        .catch((err) => {
          alert(
            "Infura service is busy! Please try to reload your page or wait a few minutes"
          );
        });
    }
  }, []);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchMyNFT")
      .then((items) => {
        setMyNfts(items);
      })
      .catch((err) => {
        alert(
          "Infura service is busy! Please try to reload your page or wait a few minutes"
        );
      });
  }, []);

  return (
    <div className={styles.author}>
      <Banner bannerImage={images.nftbackground3} />
      <AuthorProfileCard currentAccount={currentAccount} />
      <AuthorTaps
        collectible={setCollectible}
        created={setCreated}
        like={setLike}
        follower={setFollower}
        following={setFollowing}
      />

      {nfts.length == 0 ? (
        <Loader />
      ) : (
        <AuthorNFTCardBox
          collectible={collectible}
          created={created}
          like={like}
          follower={follower}
          following={following}
          nfts={nfts}
          myNfts={myNfts}
        />
      )}

      <Title
        heading="Popular Creators"
        paragraph="Click on music icon and enjoy NTF music or audio
"
      />
      <div className={styles.author_box}>
        {followerArray.map((el, i) => (
          <FollowerTabCard key={i + 1} i={i} el={el} />
        ))}
      </div>

      <Brand />
    </div>
  );
};

export default Author;
