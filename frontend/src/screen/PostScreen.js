import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listPostDetails } from "../actions/postActions";
import Moment from "react-moment";

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
          <div style={{ width: "800px", marginBottom: "100px" }}>
            <h1 style={{ marginTop: "80px", fontSize: "50pt" }}>{post.title}</h1>
            <h3 style={{ fontWeight: "400", color: "#444", marginTop: "10px" }}>{post.author}</h3>
            <h5 style={{ fontWeight: "400", color: "#444", marginTop: "10px" }}>
              Date Created: <Moment format="DD-MM-YYYY">{post.date}</Moment>
            </h5>
            <p style={{ marginTop: "100px", whiteSpace: "pre-line" }}>{post.body}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PostScreen;
