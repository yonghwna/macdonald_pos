import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 80%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
  }

  ${(props) => (props.use === "edit" ? "border:none" : "")}
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function InputForm({ addTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter your task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </Form>
  );
}

export default InputForm;
