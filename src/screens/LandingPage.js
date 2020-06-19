import React from "react";
import { Redirect, useHistory, Link } from "react-router-dom";

const LandingPage = () => {
  let history = useHistory();

  history.replace("/login");

  return <div>Landing page</div>;
};

export default LandingPage;
