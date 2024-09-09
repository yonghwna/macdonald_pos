import React from "react";

export default function Game() {
  const orderList = JSON.parse(localStorage.getItem("receipts"));
  console.log(orderList);
  return <div>Game</div>;
}
