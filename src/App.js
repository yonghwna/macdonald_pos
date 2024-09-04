import React, { useReducer, useState } from "react";
import styled from "styled-components";

// Updated Container to prevent overflow and ensure proper sizing
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffe600; // McDonald's signature yellow
  padding: 20px;
  height: 100vh; // Full height of the viewport
  width: 100vw; // Full width of the viewport
  overflow: hidden; // Prevent overflow and hide scrollbars
  box-sizing: border-box; // Ensures padding is included in the element's total width and height
`;

// Updated Title for alignment without overflow
const Title = styled.h1`
  font-size: 3em;
  color: #d52b1e; // McDonald's red
  margin-bottom: 20px; // Reduced margin to prevent vertical scroll
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

// Updated ItemContainer to adjust for screen size
const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%; // Adjusted width to prevent horizontal scroll
  max-width: 500px; // Cap maximum width for larger screens
  margin: 10px 0;
  padding: 15px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// Make item name and price bigger
const ItemName = styled.span`
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
`;

const ItemPrice = styled.span`
  font-size: 1.5em;
  color: #888;
`;

// Updated TotalAmount to make it more prominent
const TotalAmount = styled.div`
  margin-top: 40px;
  font-size: 2em;
  font-weight: bold;
  color: #d52b1e;
`;

// Updated ModalContent to be in line with the McDonald's theme
const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
`;

const QuantityButton = styled.button`
  background-color: #d52b1e; // McDonald's red
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
  font-size: 1.2em;

  &:hover {
    background-color: #b22017;
  }
`;

const CloseButton = styled.button`
  background-color: #333;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
  margin-top: 20px;

  &:hover {
    background-color: #555;
  }
`;
// Modal for quantity selection
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
// Updated ReceiptContainer to adjust for screen size
const ReceiptContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  width: 90%; // Adjusted width to prevent horizontal scroll
  max-width: 500px; // Cap maximum width for larger screens
  border: 1px dashed #333; // Dashed border to simulate a receipt edge
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Courier New", Courier, monospace; // Monospaced font for receipt feel
  text-align: left;
`;

const ReceiptItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #333;
`;

const ReceiptTotal = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: #d52b1e;
  border-top: 1px dashed #333;
  padding-top: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;
const PaymentButton = styled.button`
  background-color: #d52b1e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #b22017;
  }
`;

// Past Receipt Container
const PastReceiptsContainer = styled.div`
  margin-left: 20px;
  overflow-y: auto;
  max-height: 80vh;
`;

const PastReceipt = styled.div`
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

// Initial state for the reducer
const initialState = {
  items: {
    burger: { name: "Burger", price: 4000, count: 0 },
    fries: { name: "Fries", price: 2000, count: 0 },
    drink: { name: "Drink", price: 2000, count: 0 },
  },
  total: 0,
};

// Reducer function to handle actions
function reducer(state, action) {
  switch (action.type) {
    case "SET_ITEM_COUNT":
      return {
        items: {
          ...state.items,
          [action.item]: {
            ...state.items[action.item],
            count: action.count,
          },
        },
        total: Object.keys(state.items).reduce(
          (total, key) =>
            total +
            state.items[key].price *
              (key === action.item ? action.count : state.items[key].count),
          //수량이 바뀌는 items는 action.count로 계산한다.
          0
        ),
      };
    case "INITIAL_STATE":
      return {
        items: action.item,
        total: action.count,
      };
    default:
      return state;
  }
}

const BurgerShop = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const [showModal, setShowModal] = useState(false);
  //두 개의 상태로 쓰는게 좋을까 객체로 묶어서 쓰는게 좋을까?
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [receipts, setReceipts] = useState([]);

  const handleItemClick = (itemKey) => {
    setSelectedItem(itemKey);
    setQuantity(state.items[itemKey].count || 1);
    setShowModal(true);
  };

  const handleConfirm = () => {
    dispatch({ type: "SET_ITEM_COUNT", item: selectedItem, count: quantity });
    setShowModal(false);
  };
  const handlePayment = () => {
    const newReceipt = {
      items: Object.keys(state.items)
        .filter((key) => state.items[key].count > 0)
        .map((key) => ({
          name: state.items[key].name,
          count: state.items[key].count,
          price: state.items[key].price * state.items[key].count,
        })),
      total: state.total,
    };

    setReceipts([...receipts, newReceipt]);

    // Reset item counts
    dispatch({
      type: "INITIAL_STATE",
      item: { ...initialState.items },
      count: 0,
    });
  };
  return (
    <Container>
      <Title>🍔 Macdonald's 🍟</Title>
      {Object.keys(state.items).map((itemKey) => {
        const item = state.items[itemKey];
        return (
          <ItemContainer key={itemKey} onClick={() => handleItemClick(itemKey)}>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>{item.price}원</ItemPrice>
          </ItemContainer>
        );
      })}

      {/* Receipt Section */}
      <ReceiptContainer>
        {Object.keys(state.items).map((itemKey) => {
          const item = state.items[itemKey];
          if (item.count > 0) {
            return (
              <ReceiptItem key={itemKey}>
                <span>
                  {item.name} x {item.count}
                </span>
                <span>{item.price * item.count}원</span>
              </ReceiptItem>
            );
          }
          return null;
        })}

        <ReceiptTotal>
          <span>Total:</span>
          <span>{state.total}원</span>
        </ReceiptTotal>
        <PaymentButton onClick={handlePayment}>Payment</PaymentButton>
      </ReceiptContainer>

      {/* Modal for selecting quantity */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>Select Quantity</h2>
            <div>
              <QuantityButton
                onClick={() => setQuantity(quantity >= 1 ? quantity - 1 : 0)}
              >
                -
              </QuantityButton>
              <span>{quantity}</span>
              <QuantityButton onClick={() => setQuantity(quantity + 1)}>
                +
              </QuantityButton>
            </div>
            <QuantityButton onClick={handleConfirm}>Confirm</QuantityButton>
            <CloseButton onClick={() => setShowModal(false)}>Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
      <PastReceiptsContainer>
        {receipts.map((receipt, index) => (
          <PastReceipt key={index}>
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
export default BurgerShop;
