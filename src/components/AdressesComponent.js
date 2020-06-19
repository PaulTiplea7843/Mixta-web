import React, { useState, useReducer } from "react";
import { Radio, Modal, Button } from "react-bootstrap";
import "./Radio.css";
import { Link } from "react-router-dom";

const AdressesComponent = (props) => {
  const adresses = props.adresses;
  const [dataValid, setDataValid] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkData = () => {
    if (
      props.name &&
      props.lastName &&
      props.phone &&
      props.street &&
      props.postcode &&
      props.place
    ) {
      setShow(false);
      setDataValid(true);

      return true;
    } else {
      alert("Please add an adress");
      return false;
    }
  };

  return (
    <div>
      <h1
        style={{
          fontSize: "24px",
          textAlign: "left",
          color: "#858585",
          paddingLeft: "15px",
        }}
        id="levering"
      >
        LEVERING
      </h1>
      <hr
        style={{
          display: "block",
          height: "1px",
          border: "0",
          borderTop: "1px solid #ccc",
          margin: "0",
          marginTop: "5px",
          padding: "0",
        }}
      />

      {props.user.id ? (
        <div>
          <div>
            <div
              style={{
                textAlign: "left",
                fontSize: "18px",
                color: "white",
                padding: "10px 20px 10px 20px",
              }}
            >
              <input
                type="radio"
                style={{ border: "5px solid #0DFF92", marginRight: "20px" }}
                checked
              />
              Primary adress
              {props.user.id ? (
                <tag style={{ paddingLeft: "33px", fontSize: "14px" }}>
                  {props.user.adress}
                </tag>
              ) : (
                ""
              )}
            </div>
            <hr
              style={{
                display: "block",
                height: "1px",
                border: "0",
                borderTop: "1px solid #ccc",
                margin: "0",
                marginTop: "5px",
                padding: "0",
              }}
            />
          </div>

          <div>
            <a href="/user_details" style={{ textDecoration: "none" }}>
              <div
                style={{
                  textAlign: "left",
                  fontSize: "18px",
                  color: "#F2A83B",
                  padding: "10px 20px 10px 23px",
                }}
              >
                {/* <input
            type="radio"
            style={{ border: "5px solid #0DFF92", marginRight: "20px" }}
            name="groupOptions"
          /> */}
                <tag style={{ fontSize: "25px" }}>+</tag> New adress
                <br />
              </div>
            </a>
            <hr
              style={{
                display: "block",
                height: "1px",
                border: "0",
                borderTop: "1px solid #ccc",
                margin: "0",
                marginTop: "5px",
                padding: "0",
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          {dataValid ? (
            <div>
              <div
                style={{
                  textAlign: "left",
                  fontSize: "18px",
                  color: "white",
                  padding: "10px 20px 10px 20px",
                }}
              >
                <input
                  type="radio"
                  style={{ border: "5px solid #0DFF92", marginRight: "20px" }}
                  checked
                />
                Primary adress
                <br />
                <tag style={{ paddingLeft: "33px", fontSize: "14px" }}>
                  {props.street} {props.postcode} {props.place}
                </tag>
              </div>
              <hr
                style={{
                  display: "block",
                  height: "1px",
                  border: "0",
                  borderTop: "1px solid #ccc",
                  margin: "0",
                  marginTop: "5px",
                  padding: "0",
                }}
              />
            </div>
          ) : (
            ""
          )}

          <a onClick={handleShow} style={{ textDecoration: "none" }}>
            <div
              style={{
                textAlign: "left",
                fontSize: "18px",
                color: "#F2A83B",
                padding: "10px 20px 10px 23px",
              }}
            >
              {/* <input
            type="radio"
            style={{ border: "5px solid #0DFF92", marginRight: "20px" }}
            name="groupOptions"
          /> */}
              <tag style={{ fontSize: "25px" }}>+</tag> New adress
              <br />
            </div>
          </a>
          <hr
            style={{
              display: "block",
              height: "1px",
              border: "0",
              borderTop: "1px solid #ccc",
              margin: "0",
              marginTop: "5px",
              padding: "0",
            }}
          />
          {/* Modal add adress */}
          <Modal show={show} onHide={handleClose} style={{}}>
            <Modal.Header
              style={{ background: "#1C1C1C", color: "white", border: "0px" }}
              closeButton
              closeButton={false}
            >
              <Modal.Title style={{ textAlign: "center", fontSize: "24px" }}>
                MIJN BESTELLING
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#1C1C1C", border: "0px" }}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Naam"
                  onChange={props.changeName}
                  style={styles.input}
                  value={props.name}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Voornaam"
                  onChange={props.changeLastName}
                  style={styles.input}
                  value={props.lastName}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="GSM-nummer"
                  onChange={props.changePhone}
                  style={styles.input}
                  value={props.phone}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Straat en huisnummer"
                  onChange={props.changeStreet}
                  style={styles.input}
                  value={props.street}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Postcode"
                  onChange={props.changePostcode}
                  style={styles.input}
                  value={props.postcode}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Plaats"
                  onChange={props.changePlace}
                  style={styles.input}
                  value={props.place}
                />
              </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#1C1C1C", border: "0px" }}>
              <Button
                variant="secondary"
                onClick={checkData}
                style={{ backgroundColor: "#F2A83B" }}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}

      <h1
        style={{
          fontSize: "24px",
          textAlign: "left",
          color: "#858585",
          paddingLeft: "15px",
          marginTop: "30px",
        }}
      >
        BETALING
      </h1>
      <hr
        style={{
          display: "block",
          height: "1px",
          border: "0",
          borderTop: "1px solid #ccc",
          margin: "0",
          marginTop: "5px",
          padding: "0",
        }}
      />
      <div
        style={{
          textAlign: "left",
          fontSize: "18px",
          color: "white",
          padding: "10px 20px 10px 20px",
        }}
      >
        <input
          type="radio"
          style={{ border: "5px solid #0DFF92", marginRight: "20px" }}
          name="groupOptions"
          value="offline"
          onClick={() => {
            props.setPaymentType("on delivery");
          }}
        />
        Betaling ter plaatse
        <br />
      </div>
      <hr
        style={{
          display: "block",
          height: "1px",
          border: "0",
          borderTop: "1px solid #ccc",
          margin: "0",
          marginTop: "5px",
          padding: "0",
        }}
      />
      <div
        style={{
          textAlign: "left",
          fontSize: "18px",
          color: "white",
          padding: "10px 20px 10px 20px",
        }}
      >
        <input
          type="radio"
          style={{ border: "5px solid #0DFF92", marginRight: "20px" }}
          name="groupOptions"
          value="online"
          onClick={() => {
            props.setPaymentType("online");
          }}
        />
        Online betalen
        <br />
      </div>
      <hr
        style={{
          display: "block",
          height: "1px",
          border: "0",
          borderTop: "1px solid #ccc",
          margin: "0",
          marginTop: "5px",
          padding: "0",
        }}
      />
      <button
        className="btn"
        style={{
          marginTop: "30px",
          width: "80%",
          padding: "20px 0px",
          backgroundColor: "#F2A83B",
          color: "white",
          fontWeight: "bold",
          marginBottom: "40px",
        }}
        onClick={() => {
          if (checkData() == true) {
            props.sendOrder();
          }
        }}
      >
        Nu bestellen
      </button>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    backgroundColor: "#C4C4C4",
  },
};

export default AdressesComponent;
