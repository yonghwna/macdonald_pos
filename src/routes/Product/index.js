import React from "react";
import Burger from "../../components/Burger";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DeleteButton } from "../../components/components";

export default function Product() {
  const navigate = useNavigate();
  const { productId } = useParams();
  console.log("🚀 ~ Product ~ params:", productId);
  const fetchTodo = () => {
    return fetch(
      `http://localhost:8080/products/api/products/${productId}`
    ).then((response) => response.json());
  };
  const {
    data: hamburger,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product"], // 쿼리 키
    queryFn: fetchTodo, // 데이터를 가져오는 함수
  });
  console.log(hamburger);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error...</h1>;
  }
  return (
    <>
      <DeleteButton
        onClick={() => {
          navigate("/products");
        }}
      >
        {"<-"}
      </DeleteButton>
      <Burger
        id={hamburger.id}
        detail={true}
        image={hamburger.image}
        ingredients={hamburger.ingredients}
        name={hamburger.name}
        price={hamburger.price}
      />
    </>
  );
}
