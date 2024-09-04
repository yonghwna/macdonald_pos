import styled from "styled-components";

// Updated Container to prevent overflow and ensure proper sizing
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffe600; // McDonald's signature yellow
  padding: 20px;
  height: 100%; // Full height of the viewport
  width: 100%; // Full width of the viewport
  overflow: hidden; // Prevent overflow and hide scrollbars
  box-sizing: border-box; // Ensures padding is included in the element's total width and height
`;

// Updated Title for alignment without overflow
export const Title = styled.h1`
  font-size: 3em;
  color: #d52b1e; // McDonald's red
  margin-bottom: 20px; // Reduced margin to prevent vertical scroll
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

// Updated ItemContainer to adjust for screen size
export const ItemContainer = styled.div`
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
export const ItemName = styled.span`
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
`;

export const ItemPrice = styled.span`
  font-size: 1.5em;
  color: #888;
`;

// Updated ModalContent to be in line with the McDonald's theme
export const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
`;

export const QuantityButton = styled.button`
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

export const CloseButton = styled.button`
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
export const ModalOverlay = styled.div`
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
export const ReceiptContainer = styled.div`
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

export const ReceiptItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #333;
`;

export const ReceiptTotal = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: #d52b1e;
  border-top: 1px dashed #333;
  padding-top: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;
export const PaymentButton = styled.button`
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
