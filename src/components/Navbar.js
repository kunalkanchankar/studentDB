import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/" style={{ margin: "10px", color: "#fff" }}>Home</Link>
      <Link to="/services" style={{ margin: "10px", color: "#fff" }}>Services</Link>
      <Link to="/history" style={{ margin: "10px", color: "#fff" }}>Order History</Link>
      <Link to="/help" style={{ margin: "10px", color: "#fff" }}>Help</Link>
    </nav>
  );
}

export default Navbar;