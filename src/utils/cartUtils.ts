import { addToCartRequest, getItemsInCartRequest, setQuantityInLocalstorage } from '@/app/actions/types';
import { Book } from '@/app/models/book';
import { CartItemDto, CartItem } from '@/app/models/cart';
import { User } from '@/app/models/user';
import { AppDispatch } from '@/app/store/store';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export const addToCart = (cartItem: CartItemDto[], books: Book[], dispatch: AppDispatch, isAddToCartDone: boolean, user?: User) => {
  if (user) {
    dispatch(addToCartRequest(cartItem));
  } else {
    const storedCartItems = localStorage.getItem('cartItems');
    const cartItemsArray: CartItem[] = storedCartItems ? JSON.parse(storedCartItems) : [];

    const matchingAddedItemIndexes = cartItemsArray.map((cartItemArrayEl) => cartItem.findIndex((cartItemEl) => cartItemEl.bookId === cartItemArrayEl.book.id));

    if (matchingAddedItemIndexes.some((index) => index !== -1)) {
      console.log('한권이라도 기존 책');

      // matchedIndexes: -1이 아닌 인덱스만 추출
      const matchedIndexes = matchingAddedItemIndexes.reduce((result: number[], value, index) => {
        if (value !== -1) {
          result.push(index);
        }
        return result;
      }, []);

      // 기존 책의 수량 업데이트
      matchedIndexes.forEach((i) => (cartItemsArray[i].quantity += cartItem[matchingAddedItemIndexes[i]].quantity));

      // cartItem에서 matchedIndexes의 값과 비교하여 추가되지 않은 항목만 추출
      const unMatchedItems = cartItem.filter(
        (_, cartItemIndex) => !matchedIndexes.some((matchedIndex) => matchingAddedItemIndexes[matchedIndex] === cartItemIndex),
      );

      // unMatchedItems에서 새로운 책 추가
      unMatchedItems.forEach((item) => {
        const book = books.find((book) => book.id === item.bookId);
        if (book) {
          cartItemsArray.push({ id: uuidv4(), book: book, quantity: 1 });
        }
      });
    }
    if (matchingAddedItemIndexes.every((index) => index === -1)) {
      console.log('모두 새책');
      books.map((book) => {
        return cartItemsArray.push({ id: uuidv4(), book: book, quantity: 1 });
      });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
    if (cartItem.length === 1) {
      toast.success(`${books[0].title} is added to cart successfully`);
    } else {
      toast.success(`Selected books are added to cart successfully`);
    }
    dispatch(setQuantityInLocalstorage({ totalItems: cartItemsArray.length }));
  }
};
