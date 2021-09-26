import React, { useState } from "react";

const UserPostSearch = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/user/post/search/${keyword}`);
    } else {
      history.push("/dashboard");
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

export default UserPostSearch;
