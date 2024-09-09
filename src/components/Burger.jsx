import React from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  background-color: #222;
  color: white;
  padding: 20px;
  font-family: Arial, sans-serif;
  width: 600px;
  height: 300px;
  position: relative;
  display: flex;
  justify-content: space-between;
`;
const Description = styled.div``;
const BurgerIcon = styled.img`
  width: 300px;
  height: 300px;
  background-color: #f4a460;
  border-radius: 50%;
  opacity: 1;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 10px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  z-index: 3;
`;

const IngredientsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
  z-index: 3;
`;

const IngredientItem = styled.li`
  font-size: 14px;
  margin-bottom: 5px;
  &:before {
    content: "• ";
    color: #f4a460;
  }
  z-index: 3;
`;

const PriceList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  z-index: 3;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: bold;
  z-index: 3;
`;

const Burger = ({ ingredients = [], image, price, name, id, detail }) => {
  return (
    <MenuContainer>
      <BurgerIcon src={image} />
      <Description>
        <Title>{name}</Title>
        {detail && (
          <>
            <IngredientsList>
              {ingredients.map((ingredient) => (
                <IngredientItem key={ingredient}>{ingredient}</IngredientItem>
              ))}
            </IngredientsList>
            <PriceList>
              <Price>{`$${price}`}</Price>
            </PriceList>
          </>
        )}
      </Description>
    </MenuContainer>
  );
};

export default Burger;
