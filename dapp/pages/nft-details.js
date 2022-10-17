import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";
import {
  Button,
  Filter,
  Brand,
  Title,
  NFTCard,
  Category,
} from "../components/componentIndex";
import styles from "../styles/nft-details.module.css";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const NFTDetails = () => {
  const { currentAccount } = useContext(NFTMarketplaceContext);
  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);

  return (
    <div>
      <NFTDetailsPage nft={nft} />
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
