import React, { Fragment } from "react";

const HomeScreen = () => {
  return (
    <Fragment>
      <div className="container">
        <div style={{ width: "600px", float: "left" }}>
          <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>How it works.</h2>
          <p>
            This websites allow users to register (sign up) and create posts that can be read by other users.
            <br />
            <br />
            This website is built using the MERN Stack. Uses MongoDB as the document database, Express JS for REST API, React JS for the Front-end and NodeJS.
            <br/>
			<br />
			<a href="https://www.google.com/maps?q=-37.55890800,175.91638600">Click Here Dayne!</a>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeScreen;
