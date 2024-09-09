import React, { useEffect, useState } from "react";
import {
  DeleteButton,
  PastReceipt,
  PastReceiptItem,
  PastReceiptsContainer,
  ReceiptHeader,
  PastReceiptTotal,
} from "../../components/components";
// Past Receipt Container

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
    <>
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
    </>
  );
};
export default Income;
