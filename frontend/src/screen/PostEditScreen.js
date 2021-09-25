import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
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
    <>
      <Link to="/dashboard" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Post</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="author">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" placeholder="Enter Author" value={author} onChange={(e) => setAuthor(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control as="textarea" rows={8} placeholder="Enter Body" value={body} onChange={(e) => setBody(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default PostEditScreen;
