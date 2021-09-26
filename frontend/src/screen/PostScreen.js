import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listPostDetails } from "../actions/postActions";

const PostScreen = ({ match, history }) => {
  const postId = match.params.id;
  const dispatch = useDispatch();

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  useEffect(() => {
    if (!post || !post.title || post._id !== postId) {
      dispatch(listPostDetails(postId));
    }
  }, [dispatch, post, postId, history]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container">
          <h1>{post.title}</h1>
          <p>{post.author}</p>
          <p>{post.body}</p>
        </div>
      )}
    </Fragment>
  );
};

export default PostScreen;
