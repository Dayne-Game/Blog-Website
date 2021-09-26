import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userListPosts, createPost, deletePost } from "../actions/postActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link, Route } from "react-router-dom";
import UserPostSearch from "../components/UserPostSearch";
import Moment from "react-moment";
import { POST_CREATE_RESET } from "../constants/postConstants";
import Paginate from "../components/Paginate";

const DashboardScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const userPostList = useSelector((state) => state.userPostList);
  const { loading, error, posts, page, pages } = userPostList;

  const postCreate = useSelector((state) => state.postCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    post: createdPost,
  } = postCreate;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: successDelete } = postDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(posts);

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
  }, [
    dispatch,
    history,
    keyword,
    pageNumber,
    successCreate,
    createdPost,
    userInfo,
    successDelete,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      dispatch(deletePost(id));
    }
  };

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
        <div className="container">
          <div className="dashboard-greeting-container">
            <h1>Welcome {userInfo.name}</h1>
            <Link
              to="#"
              onClick={createPostHandler}
              className="create-post-button"
            >
              Create Post
            </Link>
          </div>
          <div className="dashboard-header-container">
            <Route
              render={({ history }) => <UserPostSearch history={history} />}
            />
          </div>
          <p style={{ marginTop: "20px" }}>
            After Searching, do a blank search to see all your posts again
          </p>
          {posts.length === 0 ? (
            <p>
              There looks to be no posts! Either your Search couldn't find
              anything, or you need to start creating posts!
            </p>
          ) : (
            <Fragment>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post._id}>
                      <td>
                        <Link to={`/post/${post._id}`} className="title-button">
                          {post.title}
                        </Link>
                      </td>
                      <td>{post.author}</td>
                      <td>
                        <Moment format="DD-MM-YYYY">{post.date}</Moment>
                      </td>
                      <td>
                        <Link
                          to={`/post/edit/${post._id}`}
                          className="edit-button"
                        >
                          EDIT
                        </Link>
                      </td>
                      <td>
                        <Link
                          to="#"
                          className="delete-button"
                          onClick={() => deleteHandler(post._id)}
                        >
                          DELETE
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Paginate pages={pages} page={page} isAdmin={true} />
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default DashboardScreen;
