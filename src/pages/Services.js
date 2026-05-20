import React, { useState } from "react";
import axios from "axios";

function Services() {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleOrder = async () => {
  try {
    await axios.post("http://localhost:5000/api/orders", {
      foodName,
      price: Number(price),
      quantity: Number(quantity)
    });

    alert("Order Placed!");
  } catch (err) {
    console.error(err);   // 👈 SEE ERROR HERE
    alert("Error placing order");
  }
};

  return (
    <div>
      <h2>Order Food</h2>

      <input placeholder="Food Name" onChange={(e) => setFoodName(e.target.value)} />
      <br />

      <input placeholder="Price" type="number" onChange={(e) => setPrice(e.target.value)} />
      <br />

      <input placeholder="Quantity" type="number" onChange={(e) => setQuantity(e.target.value)} />
      <br />

      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
}

export default Services;