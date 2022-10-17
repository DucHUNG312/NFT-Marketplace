import Image from "next/image";
import styles from "./Video.module.css";
import images from "../../img";

const Video = () => {
  return (
    <div className={styles.Video}>
      <div className={styles.Video_box}>
        <h1>
          <span>🎬</span>The Videos
        </h1>
        <p>
          The pulse of what's trending on Binance NFT. Check out the latest
          music videos, trailers, comedy clips, and everything else that people
          are watching right now.
        </p>

        <div className={styles.Video_box_frame}>
          <div className={styles.Video_box_frame_left}>
            <Image
              src={images.bitcoin}
              alt="video image"
              width={1920}
              height={1080}
              objectFit="cover"
              className={styles.Video_box_frame_left}
            />
          </div>
          <div className={styles.Video_box_frame_right}>Hey</div>
        </div>
      </div>
    </div>
  );
};

export default Video;
