import styles from "../styles/connectWallet.module.css";
import { useState, useEffect, useContext } from "react";
import { Brand } from "../components/componentIndex";
import Image from "next/image";
import images from "../img";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const ConnectWallet = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const { currentAccount, connectWallet } = useContext(NFTMarketplaceContext);
  const providerArray = [
    {
      provider: images.provider1,
      name: "Metamask",
    },
    {
      provider: images.provider2,
      name: "WalletConnect",
    },
    {
      provider: images.provider3,
      name: "WalletLink",
    },
    {
      provider: images.provider4,
      name: "Formatic",
    },
  ];

  return (
    <div className={styles.connectWallet}>
      <div className={styles.connectWallet_box}>
        <h1>Connect your wallet</h1>
        <p className={styles.connectWallet_box_para}>
          Connect with one of your available wallet providers or create a new
          one
        </p>

        <div className={styles.connectWallet_box_provider}>
          {providerArray.map((el, i) => (
            <div
              className={`${styles.connectWallet_box_provider_item} ${
                activeBtn == i + 1 ? styles.active : ""
              }`}
              key={i + 1}
              onClick={() => {
                setActiveBtn(i + 1);
                connectWallet();
              }}
            >
              <Image
                src={el.provider}
                alt={el.provider}
                width={50}
                height={50}
                className={styles.connectWallet_box_provider_item_img}
              />
              <p>{el.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
