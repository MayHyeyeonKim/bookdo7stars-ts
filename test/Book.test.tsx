import { getBookRequest } from '@/app/actions/types';
import Book from '@/app/book/[bookId]/page';
import BookOverview from '@/app/components/BookDetail/BookOverview';
import rootReducer from '@/app/reducers';
import rootSaga from '@/app/sagas';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { mockBooks } from './mocks/Books';
const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
  reducer: rootReducer,
});
const mockDispatch = jest.fn();
const mockRouter = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn((selector) => selector({ book: { book: mockBooks[0] } })),
}));

sagaMiddleware.run(rootSaga);

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: () => mockRouter,
  useSearchParams: () => ({
    get: jest.fn((key) => {
      if (key === 'section') return 'bookIntro';
      return null;
    }),
  }),
}));

describe('Book', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.clearActions();
    jest.resetModules();
  });

  it('should render bookOverview and bookDetail Component', () => {
    (useParams as jest.Mock).mockReturnValue({ bookId: '123' });
    render(
      <Provider store={store}>
        <Book />
      </Provider>,
    );
    expect(screen.getByTestId('book-overview-box')).toBeInTheDocument();
    expect(screen.getByTestId('book-detail-box')).toBeInTheDocument();
    //closed it
  });

  it('should dispatch getBookRequest when it is rendered', async () => {
    (useParams as jest.Mock).mockReturnValue({ bookId: '123' });
    render(
      <Provider store={store}>
        <Book />
      </Provider>,
    );
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1));

    const dispatchedAction = mockDispatch.mock.calls[0][0];
    expect(dispatchedAction).toEqual(getBookRequest('123'));
    //closed it
  });
  //closed describe
});

describe('BookOverview', () => {
  // 책이 있으면 BookBasicInfo가 렌더링된다
  // 책이 없으면 에러메세지가 나와야 한다.
  it('should render BookBasicInfo when book is provided', () => {
    const mockBook = mockBooks[0];
    render(<BookOverview book={mockBook} />);

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(mockBook.author)).toBeInTheDocument();
    expect(screen.getByText(mockBook.publisher)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });

  it('should show error message when book is not provided', () => {
    render(<BookOverview book={null} />);
    expect(screen.getByText('Unable to retrieve book information')).toBeInTheDocument();
  });
});
