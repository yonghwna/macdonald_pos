import React from "react";
import styled from "styled-components";

const Heading = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: #333;
`;

function Title() {
  return <Heading>Todo List</Heading>;
}

export default Title;
