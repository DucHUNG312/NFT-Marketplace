import { NFTDescription, NFTDetailsImage, NFTTabs } from "./nftDetailsIndex";
import styles from "./NFTDetailsPage.module.css";

const NFTDetailsPage = ({ nft }) => {
  return (
    <div className={styles.NFTDetailsPage}>
      <div className={styles.NFTDetailsPage_box}>
        <NFTDetailsImage nft={nft} />
        <NFTDescription nft={nft} />
      </div>
    </div>
  );
};

export default NFTDetailsPage;
