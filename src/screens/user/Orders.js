import React, { useState } from "react";
import { Container, ProgressBar, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { Redirect, useHistory, Link } from "react-router-dom";
import data from "../../constants";
import "../../App.css";

const Orders = (props) => {
  let history = useHistory();
  let [orders, setOrders] = useState([]);
  // current clicked order
  let [pickedOrder, setPickedOrder] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addToCart = () => {
    var newProducts = [];
    // console.log(pickedOrder.products);

    for (let i = 0; i < pickedOrder.products.length; i++) {
      for (let j = 1; j <= pickedOrder.products[i].quantity; j++) {
        newProducts = [...newProducts, pickedOrder.products[i].product];
      }
    }

    console.log(newProducts);
    props.setCart(newProducts);
    localStorage.setItem("cart", JSON.stringify(newProducts));
  };

  //   if (props.isAuth && props.token) {
  //     history.replace("/home");
  //   }

  if (!props.user.id) {
    window.location.replace("/login");
  }

  if (orders.length < 1) {
    axios
      .get(data.baseUrl + "/api/auth/my_orders", {
        params: {
          token: props.token,
        },
      })
      .then((res) => {
        console.log(res);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <img
        src="./burger-bg.png"
        style={{ width: "100%", position: "absolute" }}
      />
      <div className="container text-left">
        <div className="row" style={{ paddingTop: "140px" }}>
          <div className="col-md-12">
            <h1 style={{ color: "white" }}>MIJN BESTELLINGEN</h1>
            <br />
            <br />

            {orders.map((order) => {
              return (
                <div
                  className="card"
                  style={{
                    border: "0.1px solid #838383",
                    borderRadius: "1px",
                    marginBottom: "40px",
                  }}
                >
                  <div
                    className="card-body"
                    style={{
                      backgroundColor: "#323232",
                      color: "white",
                      fontSize: "24px",
                      padding: "30px 30px",
                    }}
                  >
                    {new Date(order.created_at).getDay()}/
                    {new Date(order.created_at).getMonth()}/
                    {new Date(order.created_at).getFullYear()}
                    <tag className="float-right">
                      € {order.total}
                      <button
                        className="btn btn-warning"
                        style={{
                          backgroundColor: "#F2A83B",
                          color: "white",
                          marginLeft: "30px",
                          marginTop: "-5px",
                          padding: "5px 30px",
                        }}
                        onClick={() => {
                          setPickedOrder(order);
                          handleShow();
                        }}
                      >
                        Bekijken
                      </button>
                    </tag>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          closeButton={false}
          style={{ background: "#1C1C1C", color: "white", border: "0px" }}
        >
          <Modal.Title>
            <div className="text-center">
              {new Date(pickedOrder.created_at).getDay()}/
              {new Date(pickedOrder.created_at).getMonth()}/
              {new Date(pickedOrder.created_at).getFullYear()}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ background: "#1C1C1C", color: "white", border: "0px" }}
        >
          {!pickedOrder.products
            ? ""
            : pickedOrder.products.map((product) => {
                return (
                  <div>
                    <hr
                      style={{
                        display: "block",
                        height: "1px",
                        border: "0",
                        borderTop: "1px solid #ccc",
                        margin: "0",
                        marginTop: "-2px",
                        padding: "0",
                      }}
                    />
                    <h2
                      className="text-left"
                      style={{
                        fontSize: "18px",
                        color: "white",
                        padding: "20px 20px 10px 20px",
                      }}
                    >
                      {product.product.name}
                      <tag className="text-warning"> x</tag> {product.quantity}
                      <b className="float-right">€{product.product.price}</b>
                    </h2>
                    <hr
                      style={{
                        display: "block",
                        height: "1px",
                        border: "0",
                        borderTop: "1px solid #ccc",
                        margin: "0",
                        padding: "0",
                      }}
                    />
                  </div>
                );
              })}
          <br />
          <div style={{ textAlign: "right", marginRight: "85px" }}>
            <tag style={{ fontSize: "24px" }}>Totaal:</tag>
            <tag
              style={{
                fontSize: "20px",
                padding: "5px 10px",
                border: "1px solid white",
                borderRadius: "5px",
                marginLeft: "20px",
              }}
            >
              €{(Math.round(pickedOrder.total * 100) / 100).toFixed(2)}
            </tag>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ background: "#1C1C1C", color: "white", border: "0px" }}
        >
          <Button
            variant="warning"
            onClick={() => {
              handleClose();
              addToCart();
            }}
            style={{
              backgroundColor: "#F2A83B",
              color: "white",
              width: "290px",
              margin: "auto",
              marginBottom: "20px",
            }}
          >
            Opnieuw bestellen
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    backgroundColor: "#C4C4C4",
  },
};

export default Orders;
