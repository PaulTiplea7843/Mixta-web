import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";
import "./Modal.css";
import axios from "axios";
import { Redirect, useHistory, Link } from "react-router-dom";
import data from "../../constants";

import {
  faArrowLeft,
  faTrashRestoreAlt,
  faUser,
  faPercent,
  faPaperPlane,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Settings = (props) => {
  const [show, setShow] = useState([]);

  //   if (!props.user) {
  //     window.location.replace("/");
  //   }
  const [verified, setVerified] = useState(false);

  // check auth user
  //   if (!verified) {
  //     axios
  //       .post(data.baseUrl + "/api/auth/me", {
  //         token: props.token,
  //       })
  //       .then((res) => {
  //         setVerified(true);
  //       })
  //       .catch((err) => {
  //         localStorage.clear();
  //         window.location.replace("/login");
  //       });
  //   }

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

  const handleClose = (index) => {
    let newShow = show;
    newShow[index] = false;

    setShow([...newShow]);
  };

  const handleShow = (index) => {
    let newShow = show;
    newShow[index] = true;

    setShow([...newShow]);
  };

  return (
    <div>
      <img
        src="./settings.png"
        style={{ width: "100%", position: "absolute" }}
      />
      <div className="container">
        <div className="">
          <div className="row" style={{ paddingTop: "120px" }}>
            <div className="col-md-12">
              <a href="/home">
                <h6 style={{ fontSize: "24px", color: "white" }}>
                  <FontAwesomeIcon icon={faArrowLeft} /> Terug naar het menu
                </h6>
              </a>
              <br />
              <br />
              <h1 style={{ color: "white" }}>Mijn profiel</h1>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div className="col-md-12" style={{ fontSize: "18px" }}>
            <p
              onClick={() => {
                handleShow(0);
              }}
              style={{ color: "#457877", cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />{" "}
              Profiel wijzigen
            </p>
          </div>
          {/* MODAL START */}
          <Modal
            show={show[0]}
            onHide={() => {
              handleClose(0);
            }}
            style={{ marginTop: "10%", width: "100%" }}
          >
            <Modal.Header
              style={{
                width: "100%",
                border: "none",
                paddingTop: "20px",
                paddingRight: "20px",
              }}
              closeButton
            >
              <Modal.Title
                style={{ fontSize: "24px", fontWeight: "bold", width: "100%" }}
              >
                <p className="text-center">Profiel wijzigen</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <div className="">
                  <div className="row">
                    <div
                      className="col-md-12 col-lg-12 col-sm-12 col-xs-12"
                      style={{ marginBottom: "" }}
                    >
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <h6
                                style={{ fontSize: "12px", textAlign: "left" }}
                              >
                                Naam
                              </h6>
                              <input
                                className="form-control"
                                type="text"
                                placeholder=""
                                onChange={changeName}
                                style={styles.input}
                                value={name}
                              />
                            </div>
                            <br />
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <h6
                                style={{ fontSize: "12px", textAlign: "left" }}
                              >
                                Voornaam
                              </h6>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Voornaam"
                                onChange={changeLastName}
                                style={styles.input}
                                value={lastName}
                              />
                            </div>
                            <br />
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <h6
                                style={{ fontSize: "12px", textAlign: "left" }}
                              >
                                GSM-nummer
                              </h6>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="GSM-nummer"
                                onChange={changePhone}
                                style={styles.input}
                                value={phone}
                              />
                            </div>
                            <br />
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <h6
                                style={{ fontSize: "12px", textAlign: "left" }}
                              >
                                Straat en huisnummer
                              </h6>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Straat en huisnummer"
                                onChange={changeStreet}
                                style={styles.input}
                                value={street}
                              />
                            </div>
                            <br />
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <h6
                                style={{ fontSize: "12px", textAlign: "left" }}
                              >
                                Postcode
                              </h6>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Postcode"
                                onChange={changePostcode}
                                style={styles.input}
                                value={postcode}
                              />
                            </div>
                            <br />
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <h6
                                style={{ fontSize: "12px", textAlign: "left" }}
                              >
                                Plaats
                              </h6>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Plaats"
                                onChange={changePlace}
                                style={styles.input}
                                value={place}
                              />
                            </div>
                            <br />
                          </div>

                          <div className="col-md-12 text-center">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{
                                width: "100%",
                                maxWidth: "200px",
                                marginTop: "15px",
                                backgroundColor: "#477A78",
                                borderColor: "#477A78",
                              }}
                            >
                              Opslaan
                            </button>
                          </div>
                        </div>
                        <br />
                        <br />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            {/* <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleClose(0);
                }}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleClose(0);
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer> */}
          </Modal>
          {/* MODAL END */}
          <br />
          <div className="col-md-12" style={{ fontSize: "18px" }}>
            <p
              onClick={() => {
                handleShow(1);
              }}
              style={{ color: "#457877", cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={faPercent}
                style={{ marginRight: "10px" }}
              />{" "}
              Klantenkaart
            </p>
          </div>
          {/* MODAL START */}
          <Modal
            show={show[1]}
            onHide={() => {
              handleClose(1);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal points</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleClose(1);
                }}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleClose(1);
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {/* MODAL END */}
          <br />
          <div className="col-md-12" style={{ fontSize: "18px" }}>
            <p
              onClick={() => {
                handleShow(2);
              }}
              style={{ color: "#457877", cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ marginRight: "10px" }}
              />{" "}
              Berichten
            </p>
          </div>
          {/* MODAL START */}
          <Modal
            show={show[2]}
            onHide={() => {
              handleClose(2);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal orders</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleClose(2);
                }}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleClose(2);
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {/* MODAL END */}
          <br />
          <div className="col-md-12" style={{ fontSize: "18px" }}>
            <a
              onClick={props.logout}
              style={{ color: "#457877", cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ marginRight: "10px" }}
              />
              Uitloggen
            </a>
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

export default Settings;
