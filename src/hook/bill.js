import { useReducer } from "react";
// Reducer 함수
export function billReducer(state, action) {
  switch (action.type) {
    case "SET_ITEM_COUNT":
      return {
        items: {
          ...state.items,
          [action.item]: {
            ...state.items[action.item],
            count: action.count,
          },
        },
        total: Object.keys(state.items).reduce(
          (total, key) =>
            total +
            state.items[key].price *
              (key === action.item ? action.count : state.items[key].count),
          //수량이 바뀌는 items는 action.count로 계산한다.
          0
        ),
      };
    case "INITIAL_STATE":
      return {
        id: null,
        items: action.item,
        total: action.count,
      };
    default:
      return state;
  }
}
export const useBillReducer = () => {
  //state와 dispatch 반환
  const initialState = {
    items: {
      burger: { name: "Burger", price: 4000, count: 0 },
      fries: { name: "Fries", price: 2000, count: 0 },
      drink: { name: "Drink", price: 2000, count: 0 },
    },
    total: 0,
  };
  const [state, dispatch] = useReducer(billReducer, initialState);
  function billReducer(state, action) {
    switch (action.type) {
      case "SET_ITEM_COUNT":
        return {
          items: {
            ...state.items,
            [action.item]: {
              ...state.items[action.item],
              count: action.count,
            },
          },
          total: Object.keys(state.items).reduce(
            (total, key) =>
              total +
              state.items[key].price *
                (key === action.item ? action.count : state.items[key].count),
            //수량이 바뀌는 items는 action.count로 계산한다.
            0
          ),
        };
      case "INITIAL_STATE":
        return {
          id: null,
          items: action.item,
          total: action.count,
        };
      default:
        return state;
    }
  }
  return [initialState, state, dispatch];
};
