import React, { useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { Redirect, useHistory, Link } from "react-router-dom";
import data from "../../constants";

const Info = (props) => {
  if (!props.user) {
    window.location.replace("/");
  }
  const [verified, setVerified] = useState(false);

  // check auth user
  if (!verified) {
    axios
      .post(data.baseUrl + "/api/auth/me", {
        token: props.token,
      })
      .then((res) => {
        setVerified(true);
      })
      .catch((err) => {
        localStorage.clear();
        window.location.replace("/login");
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please enter your name");
      return;
    }

    if (!lastName) {
      alert("Please enter your last name");
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

    axios
      .post(data.baseUrl + "/api/auth/update_me", {
        token: props.token,
        name,
        last_name: lastName,
        phone,
        street,
        postcode,
        place,
      })
      .then((res) => {
        console.log(res);
        props.setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Your informations have been updated");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  };

  const [name, setName] = useState(props.user.name);
  const [lastName, setLastName] = useState(props.user.last_name);
  const [phone, setPhone] = useState(props.user.phone);
  const [street, setStreet] = useState(props.user.street);
  const [postcode, setPostcode] = useState(props.user.postcode);
  const [place, setPlace] = useState(props.user.place);

  let history = useHistory();

  if (props.isAuth && props.token) {
    history.replace("/home");
  }

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
                  backgroundColor: "#131313",
                }}
              >
                <ProgressBar
                  now={33}
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
                    ACCOUNT WIJZIGEN
                  </h1>
                  <br />
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Naam"
                        onChange={changeName}
                        style={styles.input}
                        value={name}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Voornaam"
                        onChange={changeLastName}
                        style={styles.input}
                        value={lastName}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="GSM-nummer"
                        onChange={changePhone}
                        style={styles.input}
                        value={phone}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Straat en huisnummer"
                        onChange={changeStreet}
                        style={styles.input}
                        value={street}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Postcode"
                        onChange={changePostcode}
                        style={styles.input}
                        value={postcode}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Plaats"
                        onChange={changePlace}
                        style={styles.input}
                        value={place}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        maxWidth: "200px",
                        marginTop: "15px",
                        backgroundColor: "#F2A83B",
                        borderColor: "#F2A83B",
                      }}
                    >
                      Opslaan
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
    backgroundColor: "#C4C4C4",
  },
};

export default Info;
