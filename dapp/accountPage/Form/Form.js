import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";
import styles from "./Form.module.css";
import { Button } from "../../components/componentIndex";

const Form = () => {
  return (
    <div className={styles.Form}>
      <div className={styles.Form_box}>
        <form>
          <div className={styles.Form_box_input}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder="Enter your name*"
              className={styles.Form_box_input_userName}
            />
          </div>

          <div className={styles.Form_box_input}>
            <label htmlFor="email">Email</label>
            <div className={styles.Form_box_input_box}>
              <div className={styles.Form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input type="text" placeholder="Enter your email*" />
            </div>
          </div>

          <div className={styles.Form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="Something about your self"
            ></textarea>
          </div>

          <div className={styles.Form_box_input}>
            <label htmlFor="website">Website</label>
            <div className={styles.Form_box_input_box}>
              <div className={styles.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>

              <input type="text" placeholder="website" />
            </div>
          </div>

          <div className={styles.Form_box_input_social}>
            <div className={styles.Form_box_input}>
              <label htmlFor="facebook">Facebook</label>
              <div className={styles.Form_box_input_box}>
                <div className={styles.Form_box_input_box_icon}>
                  <TiSocialFacebook />
                </div>
                <input type="text" placeholder="https://www.facebook.com/" />
              </div>
            </div>
            <div className={styles.Form_box_input}>
              <label htmlFor="Twitter">Twitter</label>
              <div className={styles.Form_box_input_box}>
                <div className={styles.Form_box_input_box_icon}>
                  <TiSocialTwitter />
                </div>
                <input type="text" placeholder="https://twitter.com" />
              </div>
            </div>
            <div className={styles.Form_box_input}>
              <label htmlFor="Instragram">Instragram</label>
              <div className={styles.Form_box_input_box}>
                <div className={styles.Form_box_input_box_icon}>
                  <TiSocialInstagram />
                </div>
                <input type="text" placeholder="https://instagram.com" />
              </div>
            </div>
          </div>

          <div className={styles.Form_box_input}>
            <label htmlFor="wallet">Wallet address</label>
            <div className={styles.Form_box_input_box}>
              <div className={styles.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                placeholder="0x9Fe6ab591cF87771c99Dc929286deA9d40dC1287"
              />
              <div className={styles.Form_box_input_box_icon}>
                <MdOutlineContentCopy />
              </div>
            </div>
          </div>

          <div className={styles.Form_box_btn}>
            <Button
              btnName="Upload profile"
              handleClick={() => {}}
              classstyles={styles.button}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
