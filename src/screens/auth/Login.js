import React, { useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { Redirect, useHistory, Link } from "react-router-dom";
import data from "../../constants";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  if (props.isAuth && props.token) {
    history.replace("/home");
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post(data.baseUrl + "/api/auth/login", {
          email,
          password,
        })
        .then((res) => {
          // access token
          console.log(res.data.access_token);
          props.setToken(res.data.access_token);
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("auth", true);

          axios
            .post(data.baseUrl + "/api/auth/me", {
              token: localStorage.getItem("token"),
            })
            .then((res) => {
              console.log(res.data);
              localStorage.setItem("user", JSON.stringify(res.data));
              props.setUser(res.data);
            })
            .catch((err) => console.log(err));

          props.setAuth(true);
          history.replace("/home");
        })
        .catch((res) => {
          alert("Bad credentials");
        });
    } else {
      if (!email) {
        alert("Please enter an email");
      }
      if (!password) {
        alert("Please enter a password");
      }
    }
  };

  return (
    <div>
      <img
        src="./burger-bg.png"
        style={{ width: "100%", position: "absolute" }}
      />
      <div className="container">
        <div className="">
          <div className="row" style={{ paddingTop: "140px" }}>
            <div className="col-md-2 col-lg-3 col-sm-2 col-xs-0"></div>
            <div className="col-md-8 col-lg-6 col-sm-8 col-xs-12">
              <div
                className="card"
                style={{
                  backgroundColor: "white",
                }}
              >
                <div
                  className="card-body"
                  style={{
                    paddingRight: "5vw",
                    paddingLeft: "5vw",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <h1
                    className="text-center"
                    style={{
                      color: "#404B69",
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}
                  >
                    INLOGGEN
                  </h1>
                  <h4
                    style={{
                      fontSize: "18px",
                      textAlign: "center",
                      color: "#4A4A4A",
                    }}
                  >
                    Nog geen account?{" "}
                    <a href="/register" style={{ color: "#56AAA8" }}>
                      Registeer je
                    </a>
                  </h4>
                  <br />
                  <form onSubmit={loginSubmit}>
                    <div className="form-group">
                      <h6 style={{ fontSize: "12px", textAlign: "left" }}>
                        E-mail adres
                      </h6>
                      <input
                        className="form-control"
                        type="email"
                        onChange={changeEmail}
                        style={styles.input}
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <h6 style={{ fontSize: "12px", textAlign: "left" }}>
                        Wachtwoord
                      </h6>
                      <input
                        className="form-control"
                        type="password"
                        onChange={changePassword}
                        style={styles.input}
                      />
                    </div>
                    <Link
                      to="/forgot_password"
                      style={{ paddingTop: "-65px", color: "#477A78" }}
                    >
                      Wachtwoord vergeten?
                    </Link>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                       
                        marginTop: "15px",
                        backgroundColor: "#477A78",
                        border: "none",
                      }}
                    >
                      Inloggen
                    </button>
                    <br />
                    <Link to="/home">
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{
                          width: "100%",
                         
                          marginTop: "15px",
                          backgroundColor: "#56AAA7",
                          borderColor: "#56AAA7",
                          marginBottom: "20px",
                        }}
                      >
                        Doorgaan als gast
                      </button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-3 col-sm-2 col-xs-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    border: "none",
    borderRadius: "5px",
    height: "45px",
  },
};

export default Login;
