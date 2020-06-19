import React from "react";

const CartEmpty = (props) => {
  return (
    <div
       className="col-lg-3 col-md-5 col-sm-0 col-xs-0  d-none d-sm-none  d-md-block"
      style={{
        Height: "40vh",
        minHeight: "40vh",
        backgroundColor: "#346C6B",
        textAlign: "center",
        overflowY: "display",
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
      <br />
      <h2
        style={{
          fontSize: "24px",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        NOG NIKS IN JE <br /> WINKELMANDJE
      </h2>
      <br />
      <img src="./empty-burger.png" />
      <br />
      <br />

      <h2
        style={{
          fontSize: "18px",
          color: "white",
          textAlign: "center",
          width: "260px",
          margin: "auto",
        }}
      >
        Log je hier links in of ga door als gast om te starten met bestellen
      </h2>
    </div>
  );
};

export default CartEmpty;
