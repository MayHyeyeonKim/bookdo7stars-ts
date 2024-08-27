import { mockBooks } from '@/app/models/book';

import BookCard from './BookCard';

const BooksContainer = () => {
  const books = mockBooks;
  return (
    <div>
      BooksContainer
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
};

export default BooksContainer;
