import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import styles from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button, Error } from "../componentIndex";
import images from "../../img";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NavBar = () => {
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const router = useRouter().asPath;

  let discoverRef = useRef();
  let helpRef = useRef();
  let notificationRef = useRef();
  let profileRef = useRef();

  useEffect(() => {
    setDiscover(false);
    setHelp(false);
    setNotification(false);
    setProfile(false);
    setOpenSideMenu(false);
  }, [router]);

  useEffect(() => {
    let handlerClickOutside = (e) => {
      if (
        !discoverRef.current.contains(e.target) &&
        !helpRef.current.contains(e.target) &&
        !notificationRef.current.contains(e.target) &&
        !profileRef.current.contains(e.target)
      ) {
        setDiscover(false);
        setHelp(false);
        setNotification(false);
        setProfile(false);
      }
    };

    document.addEventListener("mousedown", handlerClickOutside);

    return () => {
      document.removeEventListener("mousedown", handlerClickOutside);
    };
  });

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover" && !discover) {
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText == "Help Center" && !help) {
      setDiscover(false);
      setHelp(true);
      setNotification(false);
      setProfile(false);
    } else {
      setDiscover(false);
      setHelp(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    setOpenSideMenu(!openSideMenu);
  };

  const { currentAccount, connectWallet, openError } = useContext(
    NFTMarketplaceContext
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_container}>
        <div className={styles.navbar_container_left}>
          <div className={styles.logo}>
            <Link href="/">
              <a>
                <Image
                  src={images.opensea}
                  alt="NFT MARKETPLACE"
                  width={100}
                  height={100}
                />
              </a>
            </Link>
          </div>
          {/* <div className={styles.navbar_container_left_box_input}>
            <div className={styles.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => {}} className={styles.search_icon} />
            </div>
          </div> */}
        </div>

        {/* //END OF LEFT SECTION */}
        <div className={styles.navbar_container_right}>
          <div
            ref={discoverRef}
            className={styles.navbar_container_right_discover}
          >
            {/* DISCOVER MENU */}
            <h2
              className={styles.navbar_container_right_discover_text}
              onClick={(e) => openMenu(e)}
            >
              Discover
            </h2>
            {discover && (
              <div className={styles.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* HELP CENTER MENU */}
          <div ref={helpRef} className={styles.navbar_container_right_help}>
            <h2
              className={styles.navbar_container_right_discover_text}
              onClick={(e) => openMenu(e)}
            >
              Help Center
            </h2>
            {help && (
              <div className={styles.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* NOTIFICATION */}
          <div
            ref={notificationRef}
            className={styles.navbar_container_right_notify}
          >
            <MdNotifications
              className={styles.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>

          {/* CREATE BUTTON SECTION */}
          <div className={styles.navbar_container_right_button}>
            {currentAccount == "" ? (
              <Button btnName="Connect" handleClick={() => connectWallet()} />
            ) : (
              <Link href={{ pathname: "/upload-nft" }}>
                <a>
                  <Button btnName="Create NFT" handleClick={() => {}} />
                </a>
              </Link>
            )}
          </div>

          {/* USER PROFILE */}

          <div className={styles.navbar_container_right_profile_box}>
            <div
              ref={profileRef}
              className={styles.navbar_container_right_profile}
            >
              <Image
                src={images.user1}
                alt="Profile"
                width={40}
                height={40}
                onClick={() => openProfile()}
                className={styles.navbar_container_right_profile}
              />

              {profile && <Profile currentAccount={currentAccount} />}
            </div>
          </div>

          {/* MENU BUTTON */}

          <div className={styles.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={styles.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>

      {/* SIDBAR CPMPONE/NT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar
            setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
          />
        </div>
      )}

      {openError && <Error />}
    </div>
  );
};

export default NavBar;
