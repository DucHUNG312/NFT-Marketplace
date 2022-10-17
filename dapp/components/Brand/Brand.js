import Image from "next/image";
import styles from "./Brand.module.css";
import images from "../../img";
import { Button } from "../../components/componentIndex";

const Brand = () => {
  return (
    <div className={styles.Brand}>
      <div className={styles.Brand_box}>
        <div className={styles.Brand_box_left}>
          <Image
            src={images.opensea}
            alt="brand logo"
            width={180}
            height={180}
          />
          <h1>Earn free crypto with Binance</h1>
          <p>A creative agency that lead and inspire</p>
          <div className={styles.Brand_box_left_btn}>
            <Button btnName="Create" handleClick={() => {}} />
            <Button btnName="Discover" handleClick={() => {}} />
          </div>
        </div>
        <div className={styles.Brand_box_right}>
          <Image src={images.earn} alt="brand logo" width={800} height={600} />
        </div>
      </div>
    </div>
  );
};

export default Brand;
