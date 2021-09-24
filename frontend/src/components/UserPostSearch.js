import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

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
    <Col md={3} sm={8}>
      <Form className="search" onSubmit={submitHandler}>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Your Posts..."
        />
        <button className="btn btn-info">Search</button>{" "}
      </Form>
    </Col>
  );
};

export default UserPostSearch;
