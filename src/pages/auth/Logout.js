import React, { useContext, useState } from "react";
import { Store } from "../../utils/Store";
import axios from "axios";
function Logout() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useState(() => {
    async function fetchData() {
      await axios.get(`${process.env.REACT_APP_BE_HOST}/auth/${userInfo._id}`);
    }
    dispatch({ type: "USER_LOGOUT" });
    fetchData();
  }, []);

  return (
    <div>{(window.location.href = `${process.env.REACT_APP_FE_HOST}/`)}</div>
  );
}

export default Logout;
