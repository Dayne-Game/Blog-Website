import React, { useState } from "react";

const PostSearch = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/post/search/${keyword}`);
    } else {
      history.push("/posts");
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="
        search-input"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Your Posts..."
        />
        <button className="submit-button">Search</button>{" "}
      </form>
    </div>
  );
};

export default PostSearch;
