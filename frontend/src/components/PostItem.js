import React from "react";
import { Link } from "react-router-dom";
import { NavItem } from "react-bootstrap";

const PostItem = ({ post }) => {
  return (
    <NavItem className="item-deco">
      <Link className="nav-link custom-nav-link mb-2" to={`/posts/${post._id}`}>
        {post.title}
      </Link>
    </NavItem>
  );
};

export default PostItem;
