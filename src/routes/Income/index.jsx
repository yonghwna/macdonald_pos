import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Updated Container to prevent overflow and ensure proper sizing
const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #ffe600; // McDonald's signature yellow
  padding: 20px;
  height: 100%; // Full height of the viewport
  width: 100%; // Full width of the viewport
  overflow: hidden; // Prevent overflow and hide scrollbars
  box-sizing: border-box; // Ensures padding is included in the element's total width and height
`;

// Past Receipt Container
const PastReceiptsContainer = styled.div`
  margin-left: 20px;
  overflow-y: auto;
  max-height: 80vh;
`;

const PastReceipt = styled.div`
  position: relative;
  margin-top: 20px;
  background-color: #fff;
  padding: 10px;
  width: 300px;
  border: 1px dashed #333;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Courier New", Courier, monospace;
`;

const PastReceiptItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 1em;
  color: #333;
`;

const PastReceiptTotal = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: #d52b1e;
  border-top: 1px dashed #333;
  padding-top: 5px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
`;
const ReceiptHeader = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 10px;
`;
const DeleteButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0px 10px;
  font-size: 1.5em;
  color: #d52b1e;
  &:hover {
    color: #b22017;
  }
`;
const Income = () => {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const storedReceipts = JSON.parse(localStorage.getItem("receipts")) || [];
    setReceipts(storedReceipts);
  }, []);
  const handleDelete = (id) => {
    // Filter out the receipt with the matching ID
    const updatedReceipts = receipts.filter((receipt) => receipt.id !== id);

    // Update state and localStorage
    setReceipts(updatedReceipts);
    localStorage.setItem("receipts", JSON.stringify(updatedReceipts));
  };
  return (
    <Container>
      <h1>Receipts Page</h1>
      <PastReceiptsContainer>
        {receipts.map((receipt) => (
          <PastReceipt key={receipt.id}>
            {/* Display the receipt ID and Date */}
            <DeleteButton onClick={() => handleDelete(receipt.id)}>
              X
            </DeleteButton>
            <ReceiptHeader>Receipt ID: {receipt.id}</ReceiptHeader>
            <ReceiptHeader>Date: {receipt.date}</ReceiptHeader>
            {receipt.items.map((item, idx) => (
              <PastReceiptItem key={idx}>
                <span>
                  {item.name} x {item.count}
                </span>
                <span>{item.price}원</span>
              </PastReceiptItem>
            ))}
            <PastReceiptTotal>
              <span>Total:</span>
              <span>{receipt.total}원</span>
            </PastReceiptTotal>
          </PastReceipt>
        ))}
      </PastReceiptsContainer>
    </Container>
  );
};
export default Income;
