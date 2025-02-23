import React, { useState } from "react";
import searchLogo from "./searchLogo.png";
import "../styles/search.css";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        className="searchBar"
        placeholder="Search Notes here"
        aria-label="Search Notes"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button
        className="searchButton"
        aria-label="Search"
        onClick={handleSearchClick}
      >
        <img src={searchLogo} alt="Search Logo" style={{ height: "18px" }} />
        <span>Search</span>
      </button>
    </div>
  );
};

export default Search;
