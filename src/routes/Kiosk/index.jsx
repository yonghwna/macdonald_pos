import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Title,
  ItemContainer,
  ItemName,
  ItemPrice,
  ReceiptItem,
  ReceiptTotal,
  PaymentButton,
  ModalOverlay,
  ModalContent,
  QuantityButton,
  CloseButton,
  ReceiptContainer,
} from "../../components/components";
import { useBillReducer } from "../../hook/bill";

// state 초기 상태

const BurgerShop = () => {
  const [initialState, state, dispatch] = useBillReducer();

  //모달 on/off
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  //영수증 상태
  const [receipts, setReceipts] = useState([]);
  const handleItemClick = (itemKey) => {
    setSelectedItem(itemKey);
    //수정 할 때를 대비해서 주문서에서 해당 아이템 갯수 가져오기
    setQuantity(state.items[itemKey].count || 1);
    setShowModal(true);
  };

  //수량 선택 후 확인
  const handleConfirm = () => {
    dispatch({ type: "SET_ITEM_COUNT", item: selectedItem, count: quantity });
    setShowModal(false);
  };
  //결제. 로컬스토리지에 저장

  const handlePayment = () => {
    const newReceipt = {
      date: new Date().toLocaleString(),
      id: uuidv4(),
      items: Object.keys(state.items)
        .filter((key) => state.items[key].count > 0)
        .map((key) => ({
          name: state.items[key].name,
          count: state.items[key].count,
          price: state.items[key].price * state.items[key].count,
        })),
      total: state.total,
    };
    const storedReceipts = JSON.parse(localStorage.getItem("receipts")) || [];
    const updatedReceipts = [...storedReceipts, newReceipt];
    setReceipts(updatedReceipts);
    localStorage.setItem("receipts", JSON.stringify(updatedReceipts));
    dispatch({
      type: "INITIAL_STATE",
      item: { ...initialState.items },
      count: 0,
    });
  };
  return (
    <>
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
    </>
  );
};
export default BurgerShop;
