import React, { useState } from "react";
import styled from "styled-components";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Input } from "./InputForm";
const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Text = styled.span`
  flex-grow: 1;
  margin-left: 10px;
  font-size: 1rem;
  color: #333;
  padding: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 10px;
  &:hover {
    color: #555;
  }
`;

function TodoList({ todos, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(null);
  const [newText, setNewText] = useState("");

  const handleEdit = (id, text) => {
    setIsEditing(id);
    setNewText(text);
  };

  const handleSave = (id) => {
    editTodo(id, newText);
    setIsEditing(null);
    setNewText("");
  };

  return (
    <List>
      {todos.map((todo) => (
        <ListItem key={todo.id}>
          {isEditing === todo.id ? (
            <>
              <Input
                use="edit"
                type="text"
                value={newText}
                onChange={(e) => {
                  setNewText(e.target.value);
                }}
              />
              <IconButton onClick={() => handleSave(todo.id)}>
                <FaEdit />
              </IconButton>
            </>
          ) : (
            <>
              <Text>{todo.text}</Text>
              <IconButton onClick={() => handleEdit(todo.id, todo.text)}>
                <FaEdit />
              </IconButton>
              <IconButton onClick={() => deleteTodo(todo.id)}>
                <FaTrashAlt />
              </IconButton>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default TodoList;
