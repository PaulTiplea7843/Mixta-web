import React, { useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { Redirect, useHistory, Link } from "react-router-dom";
import data from "../../constants";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [place, setPlace] = useState("");
  const [checked, setChecked] = useState(false);

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

  const changeRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const changeStreet = (e) => {
    setStreet(e.target.value);
  };

  const changePostcode = (e) => {
    setPostcode(e.target.value);
  };

  const changePlace = (e) => {
    setPlace(e.target.value);
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }

    if (!password) {
      alert("Please enter your password");
      return;
    }

    if (!repeatPassword || password != repeatPassword) {
      alert("Please repeat your password");
      return;
    }

    if (!name) {
      alert("Please enter your name");
      return;
    }

    if (!lastName) {
      alert("Please enter your lastName");
      return;
    }

    if (!phone) {
      alert("Please enter your phone");
      return;
    }

    if (!street) {
      alert("Please enter your street");
      return;
    }

    if (!postcode) {
      alert("Please enter your postcode");
      return;
    }

    if (!place) {
      alert("Please enter your place");
      return;
    }

    if (checked == false) {
      alert("Please accept Terms and Conditions");
      return;
    }

    axios
      .post(data.baseUrl + "/api/auth/register", {
        name,
        last_name: lastName,
        phone,
        email,
        password,
        street,
        postcode,
        place,
      })
      .then((res) => {
        console.log(res.data.access_token);
        props.setToken(res.data.access_token);
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("auth", true);

        axios
          .post(data.baseUrl + "/api/auth/me", {
            token: res.data.access_token,
          })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            props.setUser(res.data);
          })
          .catch((err) => console.log(err));

        props.setAuth(true);
        history.replace("/postcode");
      })
      .catch((err) => {
        console.log(err);
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
            <div className="col-md-2 col-lg-3 col-sm-2 col-xs-0"></div>
            <div
              className="col-md-8 col-lg-6 col-sm-8 col-xs-12"
              style={{ marginBottom: "50px" }}
            >
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
                    Maak je account aan
                  </h1>
                  <br />

                  <br />
                  <form onSubmit={registerSubmit}>
                    <div className="form-group">
                      <h6 style={{ fontSize: "12px", textAlign: "left" }}>
                        E-mail adres
                      </h6>
                      <input
                        className="form-control"
                        type="email"
                        placeholder=""
                        onChange={changeEmail}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <h6 style={{ fontSize: "12px", textAlign: "left" }}>
                        wachtwoord
                      </h6>
                      <input
                        className="form-control"
                        type="password"
                        placeholder=""
                        onChange={changePassword}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <h6 style={{ fontSize: "12px", textAlign: "left" }}>
                        Herhaal wachtwoord
                      </h6>
                      <input
                        className="form-control"
                        type="password"
                        onChange={changeRepeatPassword}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <h6 style={{ fontSize: "12px", textAlign: "left" }}>
                        Naam
                      </h6>
                      <input
                        className="form-control"
                        type="text"
                        onChange={changeName}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <h6 style={{ fontSize: "12px", textAlign: "left" }}>
                        Voornaam
                      </h6>
                      <input
                        className="form-control"
                        type="text"
                        onChange={changeLastName}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <h6 style={{ fontSize: "12px", textAlign: "left" }}>
                        GSM-nummer
                      </h6>
                      <input
                        className="form-control"
                        type="text"
                        onChange={changePhone}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <h6 style={{ fontSize: "12px", textAlign: "left" }}>
                        Straat en huisnummer
                      </h6>
                      <input
                        className="form-control"
                        type="text"
                        onChange={changeStreet}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <h6 style={{ fontSize: "12px", textAlign: "left" }}>
                        Postcode
                      </h6>
                      <input
                        className="form-control"
                        type="text"
                        onChange={changePostcode}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <h6 style={{ fontSize: "12px", textAlign: "left" }}>
                        Plaats
                      </h6>
                      <input
                        className="form-control"
                        type="text"
                        onChange={changePlace}
                        style={styles.input}
                      />
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <tag
                        style={{
                          fontSize: "14px",
                          color: "#767676",
                          textAlign: "left",
                          maxWidth: "87%",
                          float: "right",
                        }}
                        className="text-left"
                      >
                        Bij het aanmaken van dit account verklaar ik akkoord met
                        de algemene voorwaarden
                      </tag>
                      <input
                        type="radio"
                        style={{
                          border: "5px solid #0DFF92",
                          marginRight: "20px",
                          float: "right",
                        }}
                        onChange={() => {
                          setChecked(true);
                        }}
                        name="groupOptions"
                        value="online"
                      />
                      <br />
                      <br />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                       
                        marginTop: "15px",
                        backgroundColor: "#477A78",
                        borderColor: "#477A78",
                      }}
                    >
                      Registeer
                    </button>
                    <br />
                    <br />
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

export default Register;
