import React, { useState } from "react";
import styles from "./Search.module.css";

interface SearchProps {
  onSearch: (longitude: number, latitude: number) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [longitude, setLongitude] = useState<number | string>(13.41);
  const [latitude, setLatitude] = useState<number | string>(52.52);

  const handleSearch = () => {
    const lng = Number(longitude);
    const lat = Number(latitude);

    if (!isNaN(lng) && !isNaN(lat)) {
      onSearch(lng, lat);
    } else {
      alert("Please enter valid longitude and latitude values.");
    }
  };

  return (
    <div className={styles.searchContainer}>
      <label>
        Lng
        <input
          className={styles.inputText}
          type="text"
          placeholder="lng"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
        />
      </label>
      <label>
        Ltd
        <input
          className={styles.inputText}
          type="text"
          placeholder="lat"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
