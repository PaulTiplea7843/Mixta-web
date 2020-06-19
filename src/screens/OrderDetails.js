import React, { useState } from "react";
import ReactCodeInput from "react-verification-code-input";
import { Redirect, useHistory, Link } from "react-router-dom";
import axios from "axios";
import data from "../constants";
import { Container, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faTrashRestoreAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const OrderDetails = (props) => {
  let history = useHistory();
  const [times, setTimes] = useState([]);

  const pickTime = (e) => {
    var value = e.target.value;
    console.log(value);
    props.setDeliveryTime(value);
    localStorage.setItem("deliveryTime", value);
  };

  const spawnHours = () => {
    var date = new Date();
    date = new Date(date.getTime() + 30 * 60000);
    if (times.length == 0) {
      if (date.getMinutes() <= 30) {
        var diff = 30 - date.getMinutes();

        date = new Date(date.getTime() + diff * 60000);
        console.log(times);
        console.log("da1");

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        var new_times = [...times, date_element];
        console.log(date);
        console.log("da");
        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        console.log(date);
        console.log("da");

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        console.log(date);
        console.log("da");

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        console.log(date);
        console.log("da");
        setTimes(new_times);
      } else {
        var diff = 60 - date.getMinutes();

        date = new Date(date.getTime() + diff * 60000);
        console.log(times);
        console.log("da1");

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        var new_times = [...times, date_element];
        console.log(date);
        console.log("da");
        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        console.log(date);
        console.log("da");

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        console.log(date);
        console.log("da");

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        console.log(date);
        console.log("da");
        setTimes(new_times);
      }
    }
  };

  const updateLocalStorage = () => {
    localStorage.setItem("type", props.type);
    localStorage.setItem("time", props.time);
    localStorage.setItem("deliveryTime", props.deliveryTime);

    spawnHours();
  };
  // update localstorage
  updateLocalStorage();
  const handleSubmit = () => {
    if (props.time == "0") {
      //ok - asap case
    } else {
      if (props.deliveryTime == "0") {
        alert("Please choose a time interval");
        return;
      }
    }

    updateLocalStorage();

    window.location.replace("/home");
  };

  console.log(times);

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
                    now={100}
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
                      KIES UW BESTELWIJZE
                    </h1>
                    <div
                      className="text-center postcode"
                      style={{
                        marginLeft: "10px",
                        marginTop: "30px",
                        marginBottom: "10px",
                      }}
                    ></div>

                    <div
                      className="row"
                      style={{ width: "70%", margin: "auto" }}
                    >
                      <div
                        className=" col-md-6 col-sm-6 col-xs-6"
                        style={{ padding: "0px", paddingRight: "5px" }}
                      >
                        {props.type == 1 ? (
                          <button
                            className="btn btn-warning btn-block"
                            style={{
                              marginRight: "20px",
                              color: "white",
                              backgroundColor: "#F2A83B",
                            }}
                            onClick={() => {
                              props.setType(1);
                            }}
                          >
                            Afhaal
                          </button>
                        ) : (
                          <button
                            className="btn btn-warning btn-block"
                            style={{
                              marginRight: "20px",
                              backgroundColor: "black",
                              color: "white",
                              // borderColor: "#F2A83B",
                              border: "none",
                            }}
                            onClick={() => {
                              props.setType(1);
                            }}
                          >
                            Afhaal
                          </button>
                        )}
                      </div>
                      <div
                        className=" col-md-6 col-sm-6 col-xs-6"
                        style={{ padding: "0px" }}
                      >
                        {props.type == 2 ? (
                          <button
                            className="btn btn-warning btn-block"
                            style={{
                              marginRight: "20px",
                              color: "white",
                              backgroundColor: "#F2A83B",
                            }}
                            onClick={() => {
                              props.setType(2);
                            }}
                          >
                            Levering
                          </button>
                        ) : (
                          <button
                            className="btn btn-warning btn-block"
                            style={{
                              marginRight: "20px",
                              backgroundColor: "black",
                              color: "white",
                              // borderColor: "#F2A83B",
                              border: "none",
                            }}
                            onClick={() => {
                              props.setType(2);
                            }}
                          >
                            Levering
                          </button>
                        )}
                      </div>
                    </div>

                    {/* ORDER TIME */}
                    <br />
                    <div
                      className="row"
                      style={{ width: "70%", margin: "auto" }}
                    >
                      <div
                        className=" col-md-6 col-sm-6 col-xs-6"
                        style={{ padding: "0px", paddingRight: "5px" }}
                      >
                        {props.time == "0" ? (
                          <button
                            className="btn btn-warning btn-block"
                            style={{
                              marginRight: "20px",
                              color: "white",
                              backgroundColor: "#F2A83B",
                            }}
                            onClick={() => {
                              props.setTime("0");
                            }}
                          >
                            Zo snel mogelijk
                          </button>
                        ) : (
                          <button
                            className="btn btn-warning btn-block"
                            style={{
                              marginRight: "20px",
                              backgroundColor: "black",
                              color: "white",
                              // borderColor: "#F2A83B",
                              border: "none",
                            }}
                            onClick={() => {
                              props.setTime("0");
                            }}
                          >
                            Zo snel mogelijk
                          </button>
                        )}
                      </div>
                      <div
                        className=" col-md-6 col-sm-6 col-xs-6"
                        style={{ padding: "0px" }}
                      >
                        {props.time == "1" ? (
                          <div>
                            <button
                              className="btn btn-warning btn-block"
                              style={{
                                marginRight: "20px",
                                color: "white",
                                backgroundColor: "#F2A83B",
                              }}
                              onClick={() => {
                                props.setTime("1");
                                spawnHours();
                              }}
                            >
                              Later vandaag
                            </button>
                          </div>
                        ) : (
                          <button
                            className="btn btn-warning btn-block"
                            style={{
                              marginRight: "20px",
                              backgroundColor: "black",
                              color: "white",
                              // borderColor: "#F2A83B",
                              border: "none",
                            }}
                            onClick={() => {
                              props.setTime("1");
                              spawnHours();
                            }}
                          >
                            Later vandaag
                          </button>
                        )}
                      </div>
                    </div>
                    <br />
                    {props.time == "1" ? (
                      <div
                        className="row"
                        style={{
                          width: "70%",
                          margin: "auto",
                        }}
                      >
                        <div
                          className="col-md-2 col-sm-2 col-xs-3"
                          style={{
                            textAlign: "center",
                            paddingTop: "7px",
                            backgroundColor: "white",
                            marginRight: "-0px",
                            borderTopLeftRadius: "5px",
                            borderBottomLeftRadius: "5px",
                          }}
                        >
                          <FontAwesomeIcon icon={faClock} />
                        </div>
                        <div
                          className="col-md-10 col-sm-10 col-xs-9"
                          style={{ padding: "0px" }}
                        >
                          <select
                            className="form-control"
                            name="hour"
                            style={{
                              borderTopLeftRadius: "0px",
                              borderBottomLeftRadius: "0px",
                              border: "0px",
                            }}
                            onChange={pickTime}
                          >
                            {props.deliveryTime != "0" ? (
                              <option hidden>
                                {new Date(props.deliveryTime).getHours()}:
                                {new Date(props.deliveryTime).getMinutes() < 10
                                  ? new Date(props.deliveryTime).getMinutes() +
                                    "0"
                                  : new Date(props.deliveryTime).getMinutes()}
                              </option>
                            ) : (
                              <option hidden>Choose</option>
                            )}
                            {times.map((date) => {
                              return (
                                <option value={date.value}>
                                  {date.hour + ":"}
                                  {date.minutes == 0 ? "00" : date.minutes}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
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
                    <Link to="/postcode" style={{ color: "white" }}>
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

export default OrderDetails;
