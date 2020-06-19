import React, { useState } from "react";
import ReactCodeInput from "react-verification-code-input";
import "../../Postcode.css";
import { Redirect, useHistory, Link } from "react-router-dom";
import axios from "axios";
import data from "../../constants";
import { Container, ProgressBar } from "react-bootstrap";

const PostCode = (props) => {
  const [postcode, setPostcode] = useState("");
  let history = useHistory();

  const changePostcode = (e) => {
    // console.log(e);
    setPostcode(e);
  };

  const handleSubmit = () => {
    if (postcode.length < 4) {
      alert("Please enter your postcode");
    } else {
      axios
        .post(data.baseUrl + "/api/post_code", {
          token: props.token,
          postcode: postcode,
        })
        .then((res) => {
          history.replace("/order_details");
        })
        .catch((err) => {
          alert("We dont ship here! Sorry");
        });
    }
  };

  return (
    <div>
      <div>
        <img
          src="./burger-bg.png"
          style={{ width: "100%", position: "absolute" }}
        />
        <div className="container">
          <div className="">
            <div className="row" style={{ paddingTop: "140px" }}>
              <div className="col-md-2 col-lg-2 col-sm-2 col-xs-0"></div>
              <div className="col-md-8 col-lg-8 col-sm-8 col-xs-12">
                <div
                  className="card"
                  style={{
                    backgroundColor: "#131313",
                  }}
                >
                  <ProgressBar
                    now={66}
                    style={{
                      borderBottomRightRadius: "0",
                      borderBottomLeftRadius: "0",
                      height: "5px",
                    }}
                    variant="warning"
                  />
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
                        color: "#F2A83B",
                        fontWeight: "bold",
                        fontSize: "36px",
                      }}
                    >
                      GEEF UW POSTCODE IN
                    </h1>
                    <h4
                      style={{
                        fontSize: "24px",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      En bestel bij een restaurant bij u in de buurt.
                    </h4>
                    <div
                      className="text-center postcode"
                      style={{
                        marginLeft: "10px",
                        marginTop: "30px",
                        marginBottom: "10px",
                      }}
                    >
                      <ReactCodeInput onChange={changePostcode} fields={4} />
                    </div>
                    <br />
                    <br />
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        maxWidth: "200px",
                        marginTop: "0",
                        marginBottom: "15px",
                        backgroundColor: "#F2A83B",
                        borderColor: "#F2A83B",
                      }}
                    >
                      Aanmelden
                    </button>
                    <br />
                    <Link to="/login" style={{ color: "white" }}>
                      Terug naar vorige stap
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-2 col-lg-2 col-sm-2 col-xs-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCode;
