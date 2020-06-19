import React, { useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { Redirect, useHistory, Link } from "react-router-dom";
import data from "../../constants";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  let history = useHistory();

  //   if (props.isAuth && props.token) {
  //     history.replace("/home");
  //   }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const sendEmailForgot = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    axios
      .post(data.baseUrl + "/api/reset_password", {
        email: email,
      })
      .then((res) => {
        console.log(res);
        history.replace("/check_email");
      })
      .catch((err) => {
        alert("There is no account with this email!");
      });
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
            <div className="col-md-4 col-lg-3 col-sm-2 col-xs-0"></div>
            <div className="col-md-6 col-lg-6 col-sm-8 col-xs-12">
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
                  <br />

                  <h1
                    className="text-center"
                    style={{
                      color: "#404B69",
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}
                  >
                    Wachtwoord vergeten
                  </h1>
                  <br />
                  <h4
                    style={{
                      fontSize: "14px",
                      textAlign: "center",
                      color: "#4A4A4A",
                    }}
                  >
                    Vul je e-mail adres in en ontvang een link om je wachtwoord
                    te herstellen.
                  </h4>
                  <br />
                  <br />
                  <form onSubmit={sendEmailForgot}>
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
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                       
                        marginTop: "15px",
                        marginBottom: "15px",
                        backgroundColor: "#477A78",
                        borderColor: "#477A78",
                      }}
                    >
                      Versturen
                    </button>
                    <br />
                    <Link to="/login" style={{ color: "white" }}>
                      Terug naar aanmelden
                    </Link>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-sm-2 col-xs-0"></div>
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

export default ForgotPassword;
