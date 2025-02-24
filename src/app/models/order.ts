import { CartItem } from './cart';

export interface ShippingInfo {
  name: string;
  zipCode: string;
  address1: string;
  address2: string;
  phone: string;
  email: string;
}

export interface ShippingInfoError {
  zipCode: string;
}

export interface CardInfo {
  cardType: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

export interface OrderContent {
  shipInfo: ShippingInfo;
  orderedItems: CartItem[];
  totalPrice: number;
}
export interface OrderHistory {
  order_number: string;
  created_at: string;
  title: string;
  total_price: number;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  book_id: number;
  quantity: number;
  title: string;
}
