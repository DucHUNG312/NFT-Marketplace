import Link from "next/link";
import styles from "./Discover.module.css";

const Discover = () => {
  const discover = [
    { name: "NFT Collections", link: "collection" },
    { name: "Search NFT", link: "search" },
    { name: "Author Profile", link: "author-profile" },
    // { name: "NFT Details", link: "nft-details" },
    { name: "Account Setting", link: "account-setting" },
    { name: "Upload NFT", link: "upload-nft" },
    { name: "Connect Wallet", link: "connect-wallet" },
    { name: "Blog", link: "blog" },
  ];

  return (
    <div className={styles.box}>
      {discover.map((el, i) => (
        <div key={i + 1} className={styles.discover}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;
