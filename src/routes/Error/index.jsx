// ErrorPage.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled components for the error page
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffe600; // Matching the McDonald's theme
`;

const ErrorTitle = styled.h1`
  font-size: 4em;
  color: #d52b1e; // McDonald's red
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 30px;
`;

const GoBackButton = styled(Link)`
  background-color: #d52b1e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  text-decoration: none;

  &:hover {
    background-color: #b22017;
  }
`;

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <ErrorTitle>404</ErrorTitle>
      <ErrorMessage>
        Oops! The page you're looking for doesn't exist.
      </ErrorMessage>
      <GoBackButton to="/order">Go Back to Order Page</GoBackButton>
    </ErrorContainer>
  );
};

export default ErrorPage;
