import AudioCard from "./AudioCard/AudioCard";
import AudioCardSmall from "./AudioCardSmall/AudioCardSmall";
import styles from "./AudioLive.module.css";

const AudioLive = () => {
  return (
    <div className={styles.audioLive}>
      <div className={styles.audioLive_box}>
        <div className={styles.audioLive_box_left}>
          <AudioCard />
          <AudioCard />
        </div>
        <div className={styles.audioLive_box_right}>
          <AudioCardSmall />
          <AudioCardSmall />
          <AudioCardSmall />
        </div>
      </div>
    </div>
  );
};

export default AudioLive;
