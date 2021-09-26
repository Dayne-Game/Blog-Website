import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listPosts } from "../actions/postActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { loading, error, posts } = postList;

  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container">
          <div style={{ width: "600px", float: "left" }}>
            <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>
              How it works.
            </h2>
            <p>
              This websites allow users to register (sign up) and create posts
              that can be read by other users.
              <br />
              <br />
              This website is built using the MERN Stack. Uses MongoDB as the
              document database, Express JS for REST API, React JS for the
              Front-end and NodeJS.
            </p>
          </div>
          <div style={{ width: "350px", float: "right" }}>
            <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>
              Top 5 Posts
            </h2>
            {posts.slice(0, 5).map((post) => (
              <Link key={post._id} to={`/post/${post._id}`}>
                <div className="post-item">
                  <p>{post.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default HomeScreen;
