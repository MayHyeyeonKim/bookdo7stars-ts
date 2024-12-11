type InitialState = {};

export const initialState: InitialState = {};

function cartReducer(state = initialState, action: CartActionTypes): InitialState {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        // 이미 존재하는 아이템이면 수량 증가
        const updatedCartItems = state.cartItems.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + action.payload.quantity } : item,
        );
        return { ...state, cartItems: updatedCartItems };
      }

      // 새로운 아이템 추가
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    }

    case REMOVE_FROM_CART: {
      const updatedCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      return { ...state, cartItems: updatedCartItems };
    }

    case CLEAR_CART: {
      return { ...state, cartItems: [] }; // 장바구니 초기화
    }

    case UPDATE_QUANTITY: {
      const updatedCartItems = state.cartItems.map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item));
      return { ...state, cartItems: updatedCartItems };
    }

    default:
      return state; // 기본적으로 상태를 그대로 반환
  }
}

export { cartReducer };
