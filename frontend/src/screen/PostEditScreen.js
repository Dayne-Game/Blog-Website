import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listPostDetails, updatePost } from "../actions/postActions";
import { POST_UPDATE_RESET } from "../constants/postConstants";

const PostEditScreen = ({ match, history }) => {
  const postId = match.params.id;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  const postUpdate = useSelector((state) => state.postUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = postUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (successUpdate) {
        dispatch({ type: POST_UPDATE_RESET });
        history.push("/dashboard");
      } else {
        if (!post.title || post._id !== postId) {
          dispatch(listPostDetails(postId));
        } else {
          setTitle(post.title);
          setAuthor(post.author);
          setBody(post.body);
        }
      }
    }
  }, [dispatch, userInfo, history, postId, post, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePost({
        _id: postId,
        title,
        author,
        body,
      })
    );
  };

  return (
    <div className="container" style={{ paddingTop: "40px" }}>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Link to="/dashboard" className="back-button">
            Go Back
          </Link>
          <div className="post-form-container" style={{ marginTop: "30px" }}>
            <div className="form-header">
              <h1 style={{ marginBottom: "10px" }}>Create / Edit a Post</h1>
            </div>

            <form onSubmit={submitHandler}>
              <p>Title of Post</p>
              <input type="text" className="form-input" placeholder="Sample Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <p>Author of Post (Doesn't have to be your name)</p>
              <input type="text" className="form-input" placeholder="John Doe" value={author} onChange={(e) => setAuthor(e.target.value)} />
              <textarea name="body" className="form-input" rows="25" placeholder="Random Sample Text" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
              <button type="Submit" className="form-button">
                Submit
              </button>
            </form>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default PostEditScreen;
