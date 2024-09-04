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
