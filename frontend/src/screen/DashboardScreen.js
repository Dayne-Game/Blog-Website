import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Nav, Card, Button } from "react-bootstrap";
import { userListPosts, createPost } from "../actions/postActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link, Route } from "react-router-dom";
import UserPostSearch from "../components/UserPostSearch";
import Moment from "react-moment";
import Paginate from "../components/Paginate";
import { POST_CREATE_RESET } from "../constants/postConstants";

const DashboardScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const userPostList = useSelector((state) => state.userPostList);
  const { loading, error, posts, page, pages } = userPostList;

  const postCreate = useSelector((state) => state.postCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, post: createdPost } = postCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: POST_CREATE_RESET });

    if (!userInfo) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/post/edit/${createdPost._id}`);
    } else {
      dispatch(userListPosts(keyword, pageNumber));
    }
  }, [dispatch, history, keyword, pageNumber, successCreate, createdPost, userInfo]);

  const createPostHandler = () => {
    dispatch(createPost());
  };

  return (
    <Fragment>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Card>
          <Fragment>
            <Card.Header>
              <div className="d-flex justifiy-content-between">
                <Nav className="me-auto d-flex align-items-center">
                  <Nav.Item style={{ marginRight: "10px", lineHeight: "50px" }}>
                    <h3 style={{ paddingTop: "8px" }}>Your Posts</h3>
                  </Nav.Item>
                  <Nav.Item>
                    <Button onClick={createPostHandler} className="btn btn-info">
                      Create a Post
                    </Button>
                  </Nav.Item>
                </Nav>
                <Route render={({ history }) => <UserPostSearch history={history} />} />
              </div>
            </Card.Header>
            <Card.Body>
              {posts.length === 0 ? (
                <p>There looks to be no posts! Either your Search couldn't find anthing, ot you need to start creating posts!</p>
              ) : (
                <Fragment>
                  <p>Number of posts: {posts.length}</p>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date Created</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr key={post._id}>
                          <td>
                            <Link to={`/post/${post._id}`}>{post.title}</Link>
                          </td>
                          <td>{post.author}</td>
                          <td>
                            <Moment format="DD-MM-YYYY">{post.date}</Moment>
                          </td>
                          <td>
                            <Link to={`/post/edit/${post._id}`} className="btn-sm btn btn-info" style={{ marginRight: "10px" }}>
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Paginate pages={pages} page={page} isAdmin={true} />
                </Fragment>
              )}
            </Card.Body>
          </Fragment>
        </Card>
      )}
    </Fragment>
  );
};

export default DashboardScreen;
