import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, Success } from "../utils";
import "./Product.css";

function Products() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loggedIn, setLoggendIn] = useState("");
  useEffect(() => {
    setLoggendIn(localStorage.getItem("loggedIn"));
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/products", {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    Success("User logged out sucessfully.");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="container">
      <h2>welcome : {loggedIn}</h2>
      <br />

      <div>
        {data.map((item, index) => (
          <ul key={index}>
            <li>{item.name}</li>
            <li>{item.price}</li>
          </ul>
        ))}
      </div>

      <button onClick={handleLogout} className="product-btn">
        Logout
      </button>

      <ToastContainer />
    </div>
  );
}

export default Products;
