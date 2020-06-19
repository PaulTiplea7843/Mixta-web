import React from "react";
import CartEmpty from "./CartEmpty";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import {
  faTrashAlt,
  faTrashRestoreAlt,
} from "@fortawesome/free-solid-svg-icons";

const ModalContent = (props) => {
  if (props.cart.length == 0) {
    return <CartEmpty />;
  }

  var total = 0;
  for (let i = 0; i <= props.cart.length - 1; i++) {
    total += props.cart[i].price;
    // console.log(props.cart[i]);
    // console.log(total);
  }

  // Bestel nu toggle animation
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <button
        className="btn"
        style={{
          marginTop: "30px",
          width: "100%",
          padding: "20px 0px",
          backgroundColor: "#F2A83B",
          color: "white",
          fontWeight: "bold",
        }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  const removeItem = (index) => {
    let newProds = props.cart.filter((product, i) => {
      if (i == index) {
        return false;
      }
      return true;
    });
    props.setCart(newProds);
  };

  return (
    <div
      className="col-md-12 "
      style={{
        minHeight: "60vh",
        backgroundColor: "#1C1C1C",
        textAlign: "center",
      }}
    >
      <br />
      <br />
      <br />
      {props.cart.map((product, index) => {
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
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ marginRight: "20px", cursor: "pointer" }}
                onClick={() => removeItem(index)}
              />
              {product.name} <b className="float-right">€{product.price}</b>
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
      <div
        className="float-right text-white"
        style={{
          display: "inline-block",
          marginTop: "20px",
          paddingRight: "10px",
        }}
      >
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
          €{(Math.round(total * 100) / 100).toFixed(2)}
        </tag>
      </div>
      <br />
      <Accordion defaultActiveKey="0">
        <div className="cart">
          <div className="card-header">
            <CustomToggle eventKey="1">Bestel nu</CustomToggle>
          </div>
          <Accordion.Collapse eventKey="1">
            <div className="card-body">Hello! I'm another body</div>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </div>
  );
};

export default ModalContent;
