import React, { useEffect, useState } from "react";
import { ItemContainer } from "../../components/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import axios from "axios";
const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffc72c; /* McDonald's yellow */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #da291c; /* McDonald's red */
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  display: block;
  color: #333;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #da291c;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #da291c;
  border-radius: 5px;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #da291c; /* McDonald's red */
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b12418;
  }
`;
export default function ProductManagement() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    ingredients: "",
    price: "",
  });
  const fetchTodo = () => {
    return fetch("http://localhost:8080/products/api/products").then(
      (response) => response.json()
    );
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"], // 쿼리 키
    queryFn: fetchTodo, // 데이터를 가져오는 함수
  });
  //리듀서는 리듀서에 액션에 따른 함수들을 설정했다. 그리고 디스패치로 액션을 전달했지
  //리액트 쿼리는 뮤테이션에 fetch함수를 전달하고 해당 뮤테이션.함수로 실행시켯다
  const addMenu = async (newMenu) => {
    const response = await axios.post(
      "http://localhost:8080/products/api/products",
      newMenu
    );
    return response.data;
  };
  const useMutationEx = useMutation({
    //MutationFn의 반환값이 onSuccess, onError 콜백함수의 인수로 전달됨.
    mutationFn: addMenu,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["products"]);
      alert("New Burger Added!");
    },
    onError: () => {
      console.log("Mutation Error");
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newMenu = {
      ...formData,
      ingredients: formData.ingredients.split(",").map((item) => item.trim()),
    }; //?
    useMutationEx.mutate(newMenu);
    setFormData({
      name: "",
      image: "",
      ingredients: [],
      price: "",
    });
  };

  // const updateTodoStatus = async (todo) => {
  //   const response = await axios.put(
  //     `http://localhost:8080/api/todo/${todo.id}`,
  //     {
  //       status: !todo.status,
  //     }
  //   );
  //   return response.data;
  // };
  // const updateTodoMutation = useMutation({
  //   mutationFn: updateTodoStatus,
  //   onSuccess: (data) => {
  //     console.log("Mutation Success");
  //     queryClient.invalidateQueries({ queryKey: ["todos"] });
  //   },
  //   onError: () => {
  //     console.log("Mutation Error");
  //   },
  // });
  // const onCheckHandler = (todo) => {
  //   updateTodoMutation.mutate(todo);
  // };

  const deleteMenu = async (menu) => {
    await axios.delete(
      `http://localhost:8080/products/api/products/${menu.id}`
    );
  };
  const deleteMenuMutation = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      console.log("Delete Success");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      console.log("Delete Error");
    },
  });
  const deleteHandler = (menu) => {
    deleteMenuMutation.mutate(menu);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return (
    // <div style={{ overflowY: "scroll" }}>
    //   <form action="submit" onSubmit={onSubmitHandler}>
    //     <input
    //       type="text"
    //       onChange={(e) => {
    //         setTodo(e.target.value);
    //       }}
    //     />
    //     <button>Add Todo</button>
    //   </form>
    //   <h3>이번 주 할 일 리스트</h3>
    //   {data.map((todo) => (
    //     <p key={todo.id}>
    //       <input
    //         type="checkbox"
    //         checked={todo.status}
    //         onChange={() => onCheckHandler(todo)}
    //       />
    //       {todo.text}
    //       <button onClick={() => deleteHandler(todo)}>x</button>
    //     </p>
    //   ))}
    // </div>
    <FormWrapper>
      <FormTitle>New McDonald's Burger</FormTitle>
      <form action="submit" onSubmit={onSubmitHandler}>
        <FormField>
          <Label htmlFor="name">Burger Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Big Mac"
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="image">Image URL</Label>
          <Input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="e.g. https://image-url.com"
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="ingredients">Ingredients (comma separated)</Label>
          <TextArea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="e.g. Beef Patty, Lettuce, Cheese, Pickles"
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="price">Price (₩)</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 5000"
            required
          />
        </FormField>

        <SubmitButton type="submit">Add Burger</SubmitButton>
      </form>
    </FormWrapper>
  );
}
