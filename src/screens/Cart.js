import React, { useState } from "react";
import CartEmpty from "../components/CartEmpty";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import data from "../constants";
import AdressesComponent from "../components/AdressesComponent";
import { Modal } from "react-bootstrap";

import {
  faTrashAlt,
  faTrashRestoreAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Cart = (props) => {
  var [adresses, setAdresses] = useState([]);
  const user = props.user;
  const [name, setName] = useState(user ? user.name : "");
  const [lastName, setLastName] = useState(user ? user.last_name : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [street, setStreet] = useState(user ? user.street : "");
  const [postcode, setPostcode] = useState(user ? user.postcode : "");
  const [place, setPlace] = useState(user ? user.place : "");
  const [payUrl, setPayUrl] = useState("");
  // const [street, setStreet] = useState("street");
  // const [postcode, setPostcode] = useState("postcode");
  // const [place, setPlace] = useState("place");
  // const [show, setShow] = useState(false);
  const [paying, setPaying] = useState(0);
  const [payingId, setPayingId] = useState(0);

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

  const [show, setShow] = useState([]);

  if (payingId != 0 && paying == 1) {
    const checkk = () => {
      axios
        .get(data.baseUrl + "/api/auth/order_status/" + payingId)
        .then((res) => {
          if (res.data.status == 1) {
            setPaying(0);
            setPayingId(0);
            clearInterval(checkorder);
            alert("Thank you for your order");
            window.location.reload();
          }
        })
        .catch((err) => {});
    };

    var checkorder = setInterval(function () {
      checkk();
    }, 7000);
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

  if (props.cart.length == 0) {
    return <CartEmpty />;
  }

  let ok = 0;
  for (let i = 0; i <= props.cart.length; i++) {
    if (props.cart[i] && props.cart[i].quantity > 0) {
      ok = 1;
    }
  }

  if (ok == 0) {
    return <CartEmpty />;
  }

  console.log(props.cart);

  const addQuantity = (id) => {
    let products = props.cart;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id == id) {
        localStorage.setItem("cart", JSON.stringify(products));

        props.setCart([...products]);
        products[i].quantity++;
        break;
      }
    }

    // props.setCart(products);
  };

  const decreaseQuantity = (id) => {
    let products = props.cart;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id == id) {
        products[i].quantity--;
        break;
      }
    }

    props.setCart([...products]);

    localStorage.setItem("cart", JSON.stringify(products));
    // props.setCart(products);
  };

  var total = 0;
  for (let i = 0; i <= props.cart.length - 1; i++) {
    total += props.cart[i].price * props.cart[i].quantity;
    // console.log(props.cart[i]);
    // console.log(total);
  }

  const checkData = () => {
    if (name && lastName && phone && street && postcode && place) {
      return true;
    } else {
      return false;
    }
  };

  if (!checkData() && props.user.id) {
    window.location.reload();
  }

  function sendOrder() {
    if (props.cart.length == 0) {
      alert("Please add products in your cart!");
    }
    // if (!props.paymentType) {
    //   alert("Please select a payment method");
    //   return;
    // }

    if (!checkData()) {
      alert("Please complete your adress details");
      return;
    }

    // adress took from logged in user !!! at least thats what I hope :)
    console.log("#######SEND ORDER INFO############");

    const paymentType = props.paymentType;
    const deliveryType = props.type;
    const time = props.time; // if 0 = asap / if 1 => pick time interval
    const deliveryTime = props.deliveryTime;

    console.log("name: " + name);
    console.log("lastName: " + lastName);
    console.log("phone: " + phone);
    console.log("street: " + street);
    console.log("postcode: " + postcode);
    console.log("place: " + place);
    console.log("paymentType: " + paymentType);
    console.log("deliveryType: " + deliveryType);
    console.log("time: " + time);
    console.log("deliveryTime: " + deliveryTime);

    // Sauces to be added!
    const products = props.cart;
    console.log(props.cart);

    console.log("##################################");

    axios
      .post(data.baseUrl + "/api/create_order", {
        // user token
        token: props.token,
        // order details
        paymentType: "online",
        deliveryType: "2",
        time: "0",
        deliveryTime: "0",
        // user details
        name,
        lastName,
        phone,
        street,
        postcode,
        place,
        products: props.cart,
        extra: 5,
        options: [
          {
            id: 1,
            quantity: 1,
          },
        ],
      })
      .then((res) => {
        console.log(res);
        if (res.data.payment_type == "online") {
          // open payment modal <3
          // setPayUrl(res.data.payment_url);
          setPaying(1);
          // alert(res.data.order_id);
          setPayingId(res.data.order_id);
          window.open(res.data.payment_url, "_blank");
          // handleShow();
        } else {
          // pay on delivery => redirect to thank you page / alert smth?
          alert("Thank you for your order!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getAdresses = () => {
    if (adresses.length == 0) {
      axios
        .get(data.baseUrl + "/api/auth/my_adresses", {
          params: {
            token: props.token,
          },
        })
        .then((res) => {
          console.log(res.data.adresses);
          setAdresses(res.data.adresses);
          // setCategories(res.data.categories);
          // console.log(categories);
        });
    }
    setTimeout(function () {
      document.getElementById("bestel_nu").style.display = "none";
    }, 300);

    document.getElementById("levering").style.marginTop = "50px";
  };

  const removeItem = (index) => {
    let newProds = props.cart.filter((product, i) => {
      if (i == index) {
        return false;
      }
      return true;
    });
    props.setCart(newProds);
    localStorage.setItem("cart", JSON.stringify(newProds));
  };

  return (
    <div
      className="col-md-5 col-lg-3 col-sm-0 col-xs-0  d-none d-sm-none  d-md-block"
      style={{
        // Height: "80vh",
        minHeight: "100%",
        backgroundColor: " #477A78",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "30px",
          paddingTop: "20px",
          color: "white",
          // fontFamily: "SF Compact Display",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "24px",
          lineHeight: "29px",
        }}
      >
        MIJN BESTELLING
      </h1>
      <br />
      <br />
      {props.cart.map((product, index) => {
        if (product.quantity > 0) {
          return (
            <div>
              <div className="card row col-md-12 col-0" style={{ padding: "0px" }}>
             
              
                

                <div className="row " style={{ width: "100%" }}>
                  <span className="col-lg-1 col-md-1 col-sm-1"
                    style={{
                      display: "inline-block",
                      marginLeft:"14.26px",
                      float: "left",
                      marginTop: "15px",
                      width: "30%",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        border: "1px solid black",
                        padding: "6px 10px",
                        borderRadius: "8px",
                      }}
                    >
                      <span>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            addQuantity(product.id);
                          }}
                        >
                          +
                        </span>
                        <br />
                        {product.quantity} <br />
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            decreaseQuantity(product.id);
                          }}
                        >
                          -
                        </span>{" "}
                      </span>
                    </span>
                  </span>
                  <span className="col-lg-4 col-md-2 col-sm-2" style={{ display: "inline-block" }}>
                    <img
                      src={product.imageUrl}
                      style={{
                        marginTop:"3px",
                        height: "115px",
                        maxWidth:"115px",
                                               float:"left"
                      }}
                    />
                    <br />
                  </span>
                  <span className="col-lg-5 col-md-8 col-sm-8" style={{ display: "inline-block" }}>
                    <tag style={{float:"right",marginLeft:"14px" }}>
                      <br />
                      {product.name}
                      {/* {product.id} */}
                      <br />
                      <span style={{ color: " #477A78", textAlign: "left" }}>
                        €{product.price}
                      </span>
                      <br />
                      <br />
                    </tag>
                  </span>

                  <span className="col-lg-1 col-md-1 col-sm-1"
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "15px",
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    removeItem(index);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
                </div>

                {/* <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ marginRight: "20px", cursor: "pointer" }}
                onClick={() => removeItem(index)}
              />
              <h2
                className="text-left"
                style={{
                  fontSize: "14px",
                  color: "white",
                  padding: "2px 20px 2px 20px",
                }}
              >
                {product.name} x {product.quantity}
                <b className="float-right">€{product.price}</b>
              </h2> */}
              </div>
              
              <br />
            </div>
          );
        }
        return "";
      })}
      <br />
      {props.cart.map((product, index) => {
        if (product.quantity > 0) {
          return (
            <div>
              <h2
                className="text-left"
                style={{
                  fontSize: "14px",
                  color: "white",
                  padding: "2px 20px 2px 20px",
                }}
              >
                {product.name} x {product.quantity}
                <b className="float-right">
                  €{Math.round(product.price * product.quantity * 100) / 100}
                </b>
              </h2>
            </div>
          );
        }
        return "";
      })}

      <br />
      <hr
        style={{
          display: "block",
          height: "1px",
          border: "0",
          borderTop: "1px solid #ccc",
          margin: "0",
          marginTop: "5px",
          width: "90%",
          margin: "auto",
          // padding: "20px",
        }}
      />
      <div
        className="text-white"
        style={{
          // display: "inline-block",
          marginTop: "20px",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      >
        <tag style={{ fontSize: "14px" }} className="float-left">
          Totaal:
        </tag>
        <tag style={{ fontSize: "20px" }} className="float-right">
          €{(Math.round(total * 100) / 100).toFixed(2)}
        </tag>
      </div>
      <br />
      <div className="text-center" style={{ marginTop: "40px" }}>
        <div style={{ width: "80%", marginLeft: "10%" }}>
          <button
            className="btn"
            style={{
              marginTop: "30px",
              width: "100%",
              backgroundColor: "white",
              color: " #477A78",
              fontWeight: "bold",
            }}
            onClick={() => {
              handleShow(0);
            }}
          >
            Bestel nu
          </button>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
      {/* 
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <iframe src={payUrl} style={{ width: "100%", height: "400px" }} />
          </Modal.Body>
        </Modal> */}

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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <h6 style={{ fontSize: "12px", textAlign: "left" }}>
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
                          <h6 style={{ fontSize: "12px", textAlign: "left" }}>
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
                          <h6 style={{ fontSize: "12px", textAlign: "left" }}>
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
                          <h6 style={{ fontSize: "12px", textAlign: "left" }}>
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
                          <h6 style={{ fontSize: "12px", textAlign: "left" }}>
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
                          <h6 style={{ fontSize: "12px", textAlign: "left" }}>
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
                          onClick={sendOrder}
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
      </Modal>
      {/* MODAL END */}
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

export default Cart;
