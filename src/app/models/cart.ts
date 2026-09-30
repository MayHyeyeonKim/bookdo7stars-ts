import { Book } from './book';

export interface CartItem {
  id: string;
  quantity: number;
  book: Book;
}

export interface CartItemDto {
  bookId: number;
  quantity: number;
}
