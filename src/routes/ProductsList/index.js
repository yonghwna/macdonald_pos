import React from "react";
import { useQuery } from "@tanstack/react-query";
import Burger from "../../components/Burger";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
const HamburgerList = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  overflow-y: scroll;
`;
export default function ProductsList() {
  const fetchTodo = () => {
    return fetch("http://localhost:8080/products/api/products").then(
      (response) => response.json()
    );
  };
  const {
    data: hamburgerList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"], // 쿼리 키
    queryFn: fetchTodo, // 데이터를 가져오는 함수
  });
  console.log(hamburgerList);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error...</h1>;
  }

  return (
    <>
      <h1>BurgerList</h1>
      <HamburgerList>
        {hamburgerList.map((hamburger) => (
          <Link to={`/products/${hamburger.id}`} key={hamburger.id}>
            <Burger
              id={hamburger.id}
              image={hamburger.image}
              ingredients={hamburger.ingredients}
              price={hamburger.price}
              name={hamburger.name}
            />
          </Link>
        ))}
      </HamburgerList>
    </>
  );
}
