import React from "react";
import { NavLink } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="pagination">
        {[...Array(pages).keys()].map((x) => (
          <NavLink
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/dashboard/${x + 1}`
            }
          >
            {x + 1}
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Paginate;
