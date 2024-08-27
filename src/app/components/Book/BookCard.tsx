import { Book } from '@/app/models/book';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return <div>{book.title}</div>;
};
export default BookCard;
