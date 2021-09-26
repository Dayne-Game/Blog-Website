import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPosts } from "../actions/postActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link, Route } from "react-router-dom";
import PostSearch from "../components/PostSearch";
import Moment from "react-moment";
import PostPaginate from "../components/PostPaginate";

const PostsScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { loading, error, posts, page, pages } = postList;

  console.log(posts);

  useEffect(() => {
    dispatch(listPosts(keyword, pageNumber));
  }, [dispatch, history, keyword, pageNumber]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container">
          <h1 style={{ marginTop: "40px", marginBottom: "10px" }}>Posts</h1>
          <p>Here you will see posts that have been created by other users, for you to read here.</p>
          <div className="dashboard-header-container">
            <Route render={({ history }) => <PostSearch history={history} />} />
          </div>
          <p style={{ marginTop: "20px" }}>After Searching, do a blank search to see all your posts again</p>
          {posts.length === 0 ? (
            <p>There looks to be no posts! Either your Search couldn't find anything, or you need to start creating posts!</p>
          ) : (
            <Fragment>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Date</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
              <PostPaginate pages={pages} page={page} isAdmin={true} />
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default PostsScreen;
