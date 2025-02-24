import {
  MAKE_AN_ORDER_REQUEST,
  MAKE_AN_ORDER_SUCCESS,
  MAKE_AN_ORDER_FAILURE,
  GET_ORDER_HISTORY_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
} from '../actions/constants';
import { OrderActionTypes } from '../actions/types';

interface OrderState {
  orderNumber: string | null;
  isMakeAnOrderLoading: boolean;
  isMakeAnOrderDone: boolean;
  isMakeAnOrderError: string;
  isGetOrderHistoryRequestLoading: boolean;
  isGetOrderHistoryRequestDone: boolean;
  isGetOrderHistoryRequestError: string;
  orderHistory: Array<any>;
  count: number;
}
const initialOrderState: OrderState = {
  orderNumber: null,
  isMakeAnOrderLoading: false,
  isMakeAnOrderDone: false,
  isMakeAnOrderError: '',
  isGetOrderHistoryRequestLoading: false,
  isGetOrderHistoryRequestDone: false,
  isGetOrderHistoryRequestError: '',
  orderHistory: [],
  count: 0,
};
function orderReducer(state = initialOrderState, action: OrderActionTypes): OrderState {
  switch (action.type) {
    case MAKE_AN_ORDER_REQUEST:
      return { ...state, isMakeAnOrderLoading: true };

    case MAKE_AN_ORDER_SUCCESS: {
      console.log('ordernumber', action.payload);
      return { ...state, isMakeAnOrderLoading: false, isMakeAnOrderDone: true, orderNumber: action.payload };
    }

    case MAKE_AN_ORDER_FAILURE:
      return { ...state, isMakeAnOrderLoading: false, isMakeAnOrderError: action.error };
    case GET_ORDER_HISTORY_REQUEST:
      return { ...state, isGetOrderHistoryRequestLoading: true };
    case GET_ORDER_HISTORY_SUCCESS:
      console.log('payload', action);
      return { ...state, isGetOrderHistoryRequestLoading: false, isGetOrderHistoryRequestDone: true, orderHistory: action.payload, count: action.count };
    case GET_ORDER_HISTORY_FAILURE:
      return { ...state, isGetOrderHistoryRequestError: action.error };
    default:
      return state;
  }
}

export default orderReducer;
