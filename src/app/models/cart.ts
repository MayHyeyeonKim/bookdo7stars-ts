import { Book } from './book';

export interface CartItem {
  id?: number;
  quantity: number;
  book: Book;
}
