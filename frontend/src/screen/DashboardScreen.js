import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const DashboardScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  return <h1>{userInfo.name}</h1>;
};

export default DashboardScreen;
