import React from "react";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import Style from "../styles/contactus.module.css";
import formStyle from "../accountPage/Form/Form.module.css";
import { Button } from "../components/componentIndex";

const contactus = () => {
  return (
    <div className={Style.contactus}>
      <div className={Style.contactus_box}>
        <h1>Contact</h1>
        <div className={Style.contactus_box_box}>
          <div className={Style.contactus_box_box_left}>
            <div className={Style.contactus_box_box_left_item}>
              <h3>🗺 ADDRESS</h3>
              <p>
                Photo booth tattooed prism, portland taiyaki hoodie neutra
                typewriter
              </p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>💌 EMAIL</h3>
              <p>example@example.com</p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>☎ PHONE</h3>
              <p>000-123-456-7890</p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>🌏 SOCIALS</h3>
              <a href="https://www.facebook.com/projectopensea" target="_blank">
                <TiSocialFacebook />
              </a>
              <a
                href="https://www.linkedin.com/company/opensea-io/"
                target="_blank"
              >
                <TiSocialLinkedin />
              </a>
              <a href="https://twitter.com/opensea" target="_blank">
                <TiSocialTwitter />
              </a>
              <a href="https://www.youtube.com/c/OpenSeaTV" target="_blank">
                <TiSocialYoutube />
              </a>
              <a href="https://www.instagram.com/opensea/" target="_blank">
                <TiSocialInstagram />
              </a>
            </div>
          </div>
          <div className={Style.contactus_box_box_right}>
            <form>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name*"
                  className={formStyle.Form_box_input_userName}
                />
              </div>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="email">Email</label>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <HiOutlineMail />
                  </div>
                  <input type="text" placeholder="Enter your email*" />
                </div>
              </div>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="description">Message</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  placeholder="Your message*"
                ></textarea>
              </div>
              <Button
                btnName="Send Message"
                handleClick={() => {}}
                classStyle={Style.button}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contactus;
