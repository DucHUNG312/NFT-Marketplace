import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from "react-icons/ti";
import styles from "./AuthorTaps.module.css";

const AuthorTaps = ({ collectible, created, like, follower, following }) => {
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState("Most Recent");
  const listRef = useRef();

  useEffect(() => {
    let handlerClickOutside = (e) => {
      if (!listRef.current.contains(e.target)) {
        setOpenList(false);
      }
    };

    document.addEventListener("mousedown", handlerClickOutside);

    return () => {
      document.removeEventListener("mousedown", handlerClickOutside);
    };
  });

  const listArray = [
    "Created by Admin",
    "Most Appreciated",
    "Most Discussed",
    "Most Viewed",
  ];

  const openDropDownList = () => {
    setOpenList(!openList);
  };

  const openTab = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Listed NFTs") {
      collectible(true);
      created(false);
      like(false);
      follower(false);
      following(false);
      setActiveBtn(1);
    } else if (btnText == "Own NFTs") {
      collectible(false);
      created(true);
      like(false);
      follower(false);
      following(false);
      setActiveBtn(2);
    } else if (btnText == "Liked") {
      collectible(false);
      created(false);
      like(true);
      follower(false);
      following(false);
      setActiveBtn(3);
    } else if (btnText == "Follower") {
      collectible(false);
      created(false);
      like(false);
      follower(true);
      following(false);
      setActiveBtn(4);
    } else if (btnText == "Following") {
      collectible(false);
      created(false);
      like(false);
      follower(false);
      following(true);
      setActiveBtn(5);
    }
  };

  return (
    <div className={styles.AuthorTaps}>
      <div className={styles.AuthorTaps_box}>
        <div className={styles.AuthorTaps_box_left}>
          <div className={styles.AuthorTaps_box_left_btn}>
            <button
              className={`${activeBtn == 1 ? styles.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Listed NFTs
            </button>
            <button
              className={`${activeBtn == 2 ? styles.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Own NFTs
            </button>
            <button
              className={`${activeBtn == 3 ? styles.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Liked
            </button>
            <button
              className={`${activeBtn == 4 ? styles.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Follower
            </button>
            <button
              className={`${activeBtn == 5 ? styles.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Following
            </button>
          </div>
        </div>

        <div ref={listRef} className={styles.AuthorTaps_box_right}>
          <div
            className={styles.AuthorTaps_box_right_para}
            onClick={() => openDropDownList()}
          >
            <p>{selectedMenu}</p>
            {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>

          {openList && (
            <div className={styles.AuthorTaps_box_right_list}>
              {listArray.map((el, i) => (
                <div
                  key={i + 1}
                  onClick={() => setSelectedMenu(el)}
                  className={styles.AuthorTaps_box_right_list_item}
                >
                  <p>{el}</p>
                  <span>{selectedMenu == el && <TiTick />}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorTaps;
