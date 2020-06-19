import React, { useState } from "react";
import Axios from "axios";
import data from "../constants";
import { Link } from "react-router-dom";
import {ListGroup,ListGroupItem} from "react-bootstrap";


const Home = (props) => {
  var [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories"))
      ? JSON.parse(localStorage.getItem("categories"))
      : []
  );
  const [products, setProducts] = useState([]);
  const [pickedCat, setPickedCat] = useState(0);

  if (categories.length == 0) {
    Axios.get(data.baseUrl + "/api/categories").then((res) => {
      setCategories(res.data.categories);
      localStorage.setItem("categories", JSON.stringify(res.data.categories));
      // console.log(JSON.parse(localStorage.getItem("categories")));
      // console.log(categories);
    });
  }

  const pickCategory = (id) => {
    setPickedCat(id);
    Axios.get(data.baseUrl + "/api/category/" + id + "/products").then(
      (res) => {
        // console.log(res.data.products);
        setProducts(res.data.products);
        // console.log(products);
      }
    );
  };

  if (!pickedCat) {
    pickCategory(1);
    setPickedCat(1);
  }

  const addToCart = (product) => {
    // console.log(product);
    let products = props.cart;

    let ok = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == product.id) {
        products[i].quantity++;
        ok = 1;
        break;
      }
    }

    props.setCart([...products]);

    localStorage.setItem("cart", JSON.stringify(products));
    if (ok == 0) {
      props.setCart([...props.cart, product]);
      localStorage.setItem("cart", JSON.stringify([...props.cart, product]));
    }
    console.log(props.cart);
  };
  function openSauces(event){
    let selected=event.target;
   
    let cardSelected=selected.parentElement.parentElement;
    let productSauces=cardSelected.getElementsByClassName("sauces")[0];
    productSauces.style.display="inherit";   
}
function closeSauces(event){
let selected=event.target;
let element=selected.parentElement;
element.style.display="none";
}

  return (
    <div>
      <img
        src="./burger-bg.png"
        style={{ width: "100%", position: "absolute" }}
      />
      <div className="container mb-4">
        <div className="">
          <div className="row" style={{ paddingTop: "260px" }}>
            <div
              className="col-md-11"
              style={{
                margin: "auto",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                {categories.map((category) => {
                  if (category.id == pickedCat) {
                    return (
                      <button
                        className="btn"
                        onClick={() => pickCategory(category.id)}
                        style={styles.categoryPicked}
                      >
                        {category.name}
                      </button>
                    );
                  }
                  return (
                    <button
                      className="btn"
                      onClick={() => pickCategory(category.id)}
                      style={styles.category}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
              <h1 style={{ fontSize: "36px", padding: "20px 40px" }}>
                Voorgerechten
              </h1>
              <div
              // style={{
              //   height: "300px",
              //   overflowY: "scroll",
              //   overflowX: "hidden",
              // }}
              >
               {products.map((product) => {
                  return (
                    <div className="card" style={styles.prductCard}>
                    <div className="productContent">
                      <img
                       onClick={openSauces}
                        src={product.imageUrl}
                        style={{
                          maxHeight: "115px",
                          maxWidth: "115px",
                          margin: "-5px",
                          cursor:"pointer"
                        }}
                      />
                      <tag style={styles.prodData}>
                        {product.name}
                        <tag
                          className="float-right text-center"
                          style={{ color: "#4A4A4A", fontWeight: "bold" }}
                        >
                          <span
                            className="btn"
                            style={{
                              marginRight: "45px",
                              backgroundColor: "#477A78",
                              color: "white",
                              fontSize: "25px",
                              padding: "0px",
                              height: "40px",
                              paddingRight: "20px",
                              paddingLeft: "20px",
                              marginTop: "20px",
                            }}
                            onClick={() => {
                              addToCart(product);
                            }}
                          >
                            +
                          </span>
                        </tag>
                        <br />
                        <tag style={styles.prodDesc}>
                          {product.description}
                          <br /> <span style={{color:"#477A78"}}>€{product.price}</span>
                        </tag>
                      </tag>
                     
                      <div className="sauces" style={{width:"100%",background:"#E5E5E5",display:"none",padding:"1vw"}}>
                            <button style={{border:"none",background:"#E5E5E5",float:"right",outline:"0"}} onClick={closeSauces}>x</button>
                        <p style={{marginLeft:"115px",marginTop:"11px",
                                  fontStyle: "normal",
                                  fontWeight: "500",
                                  fontSize: "14px",
                                  lineHeight: "10px",
                                  color:"#4A4A4A"}}>Optie's</p>
                        <ListGroup >
                      <ListGroup.Item style={styles.sauces}> <input type="checkbox" style={{paddingBottom:"11px",marginLeft:"19px",marginRight:"16.28px"}}></input> <span style={{marginBottom:"12px"}}>Cras justo odio</span> <span style={styles.price}>$0.00</span></ListGroup.Item>
                      <ListGroup.Item style={styles.sauces}> <input type="checkbox" style={{paddingBottom:"11px",marginLeft:"19px",marginRight:"16.28px"}}></input> <span style={{marginBottom:"12px"}}>Cras justo odio</span> <span style={styles.price}>$0.00</span></ListGroup.Item>
                      <ListGroup.Item style={styles.sauces}> <input type="checkbox" style={{paddingBottom:"11px",marginLeft:"19px",marginRight:"16.28px"}}></input> <span style={{marginBottom:"12px"}}>Cras justo odio</span> <span style={styles.price}>$0.00</span></ListGroup.Item>
                      
                    </ListGroup>
                    <br />
                    <div>
                    <span style={{marginLeft:"96px",background:"white",border:" 0.6px solid #9B9B9B",boxSizing:"border-box",borderRadius:"5.2px",marginBottom:"33.52px"}}><span style={styles.quantity} className="substractQuantity">-</span><span className="productQuantity">1</span><span className="addQuatity" style={styles.quantity}>+</span></span>
                      <span style={{marginLeft:"23.68px",fontSize:"12px",}}>Totaal <span style={{color:"#477A78",fontSize:"24px",marginLeft:"9px",fontWeight:"500",}}>9.00$</span> <button className="btn btn-primary" style={{background:"#477A78",border:"none",marginLeft:"17px",}}>Voeg toe</button></span>
                      </div>
                      </div>

                    </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

let prductCard = {
  marginTop: "25px",
  padding: "-10px",
  background: "#FFFFFF",
                  boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.05)",
                  borderRadius: "8px", 
  display:"inline-block",
  width: "100%",
  cursor:"pointer",
 
  border: "none",
  
};

let prodDesc = {
  fontSize: "14px",
};

let prodData = {
position:"absolute",
  marginTop: "10px",
  marginLeft: "22.13px",
  fontSize: "18px",
  fontWeight: "500",
  color: "#4A4A4A",
  width: "100%",
  paddingRight: "100px",
  
};

const { innerWidth: width, innerHeight: height } = window;
// console.log(width)
if (width < 900) {
  prductCard = {
    marginTop: "25px",
    padding: "-10px",
    backgroundColor: "#696969",
    display: "inline-block",
    width: "100%",
    height: "80px",
  };
  prodDesc = {
    display: "none",
  };
  prodData.fontSize = "20px";
}

const styles = {
  category: {
    width: width < 900 ? "105px" : "205px",

    padding: "3px 20px",
    borderRadius: "8px",
    backgroundColor: "#FAFBFC",
    boxShadow:" 0px 8px 18px rgba(0, 0, 0, 0.05)",
    color: "black",
    textDecoration: "none",
    marginRight: "10px",
    marginBottom: "10px",
    textAlign: "center",
    border: "1px solid #477A78",
  },
  categoryPicked: {
    width: width < 900 ? "105px" : "205px",
    padding: "3px 20px",
    borderRadius: "8px",
    backgroundColor: "#477A78",
    color: "white",
    textDecoration: "none",
    marginRight: "10px",
    marginBottom: "10px",
    textAlign: "center",
  },
  btnAdd: {
    width: "120px",
    backgroundColor: "blue",
    padding: "3px 10px",
    borderRadius: "3px",
    backgroundColor: "#F2A83B",
    color: "white",
    textDecoration: "none",
    marginBottom: "-20px",
    marginRight: "-10px",
    fontSize: "16px",
  },
  sauces:
  {
    marginTop:"11px",
    marginLeft:"96px",
    width:"336px",
    jusitfyContent:"center",
    boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.05)",
borderRadius: "8px"
  },
  lastSauce:{
    marginTop:"11px",
    marginLeft:"96px",
    width:"336px",

    marginBottom:"37px"
  },
  price:
  {
    float:"right"
  },
  quantity:{
    cursor:"pointer",
    marginLeft:"16.58px",
    marginRight:"16.58px"
  },

  prductCard: prductCard,
  prodDesc: prodDesc,
  prodData: prodData,
};
export default Home;
