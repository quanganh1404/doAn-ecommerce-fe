import React, { useContext, useState } from "react";
import { Store } from "../../utils/Store";
import axios from "axios";
function Logout() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  
  useState(() => {
    async function fetchData() {
      await axios.get(`http://localhost:8080/auth/${userInfo._id}`);
    }
    dispatch({ type: "USER_LOGOUT" });
    fetchData();
  }, []);

return <div>{(window.location.href = "http://localhost:3000/")}</div>;
}

export default Logout;
