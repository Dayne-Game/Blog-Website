import React, { Fragment, useEffect } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import PostItem from "../components/PostItem";

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
      <div className="header-panel">
        <h1>My Blog Website</h1>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col sm="8" className="mt-3">
            <p>
              To start creating Posts you will need to Register! When you
              register you will have access to your Dashboard where you can
              create and edit your posts!
            </p>
          </Col>
          <Col sm="4" className="mt-3">
            <h3>Latest Posts</h3>
            <Nav vertical>
              {posts.slice(0, 5).map((p) => (
                <PostItem post={p} />
              ))}
            </Nav>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default HomeScreen;
