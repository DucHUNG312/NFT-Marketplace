import styles from "../styles/listing-nft.module.css";
import formStyle from "../accountPage/Form/Form.module.css";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "../components/componentIndex";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import Image from "next/image";

const ListingNFT = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const { id, tokenURI } = router.query;

  const fetchNFT = async () => {
    if (!tokenURI) return;
    const { data } = await axios.get(tokenURI);
    //setPrice(data.price);
    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  const resell = async () => {
    try {
      await createSale(tokenURI, price, true, id);
      router.push("/author-profile");
    } catch (error) {
      console.log("Error while listing NFT: ", error);
    }
  };

  return (
    <div className={styles.reSellToken}>
      <div className={styles.reSellToken_box}>
        <h1>Listing your NFT, set the price</h1>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Price</label>
          <input
            type="number"
            min={0.0015}
            placeholder="Enter the price*"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className={styles.reSellToken_box_img}>
          {image && (
            <Image
              src={image}
              alt="listing nft"
              width={400}
              height={400}
              layout="fixed"
            />
          )}
        </div>

        <div className={styles.reSellToken_box_btn}>
          <Button btnName="List NFT" handleClick={() => resell()} />
        </div>
      </div>
    </div>
  );
};

export default ListingNFT;
