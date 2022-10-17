import { BsSearch, BsArrowRight } from "react-icons/bs";
import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onHandleSearch, onClearSearch }) => {
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  return (
    <div className={styles.SearchBar}>
      <div className={styles.SearchBar_box}>
        <BsSearch className={styles.SearchBar_box_icon} />
        <input
          type="text"
          placeholder="Type your keyword"
          onChange={(e) => setSearchItem(e.target.value)}
          value={searchItem}
        />
        <BsArrowRight className={styles.SearchBar_box_icon} />
      </div>
    </div>
  );
};

export default SearchBar;
