import React, { useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { Redirect, useHistory, Link } from "react-router-dom";
import data from "../../constants";

const CheckEmail = (props) => {
  let history = useHistory();

  //   if (props.isAuth && props.token) {
  //     history.replace("/home");
  //   }

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
                  <br />
                  <h1
                    className="text-center"
                    style={{
                      color: "#F2A83B",
                      fontWeight: "bold",
                      fontSize: "24px",
                      color: "#404B69",
                    }}
                  >
                    Geslaagd 🎉
                  </h1>
                  <br />

                  <h4
                    style={{
                      fontSize: "14px",
                      textAlign: "center",
                      color: "#4A4A4A",
                    }}
                  >
                    We hebben je aanvraag goed ontvangen! Kijk je mailbox na
                    voor verdere instructies.
                  </h4>
                  <br />
                  <Link to="/login">
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
                      Aanmelden
                    </button>
                    <br />
                  </Link>
                  <br />
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
    backgroundColor: "#C4C4C4",
  },
};

export default CheckEmail;
