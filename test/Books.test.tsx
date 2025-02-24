import '@testing-library/jest-dom';

import { getAllBooksFailure, getAllBooksRequest, getAllBooksSuccess } from '@/app/actions/types';
import BooksGroup from '@/app/books/group/[groupName]/page';
import { bookGroups, QueryTypes } from '@/app/books/constants';
import Books from '@/app/books/page';
import BooksContainer from '@/app/components/Book/BooksContainer';
import GroupBooksContainer from '@/app/components/Book/GroupBooksContainer';
import rootReducer, { RootState } from '@/app/reducers';
import rootSaga from '@/app/sagas';
import { getAllBooks } from '@/app/sagas/book';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Provider, useSelector } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware, { runSaga } from 'redux-saga';

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
  useSelector: jest.fn(
    (selector) => selector({ book: { books: mockBooks, groupBooks: mockBooks, isGetBooksByGroupLoading: false, pageSize: 10 } }), // mockBooks를 반환
  ),
}));

sagaMiddleware.run(rootSaga);

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockRouter,
  useParams: jest.fn(),
}));

jest.mock('axios');

describe('Books', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.clearActions();
    jest.resetModules();

    render(
      <Provider store={store}>
        <Books />
      </Provider>,
    );
  });

  it('should render bookContainer Component', () => {
    expect(screen.getByTestId('books-container')).toBeInTheDocument();
  });

  it('should dispatch getAllBooksRequest, when it is rendered', async () => {
    // mockDispatch will be called
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1));

    const dispatchedAction = mockDispatch.mock.calls[0][0];

    expect(dispatchedAction).toEqual(getAllBooksRequest(1, 20));
  });

  it('should dispatch GET_ALL_BOOKS_SUCCESS, when getAllBooksAPI is successful', async () => {
    const mockResponse = { data: { books: mockBooks, count: 20 } };
    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const dispatchedActions: any[] = [];

    const fakeAction = getAllBooksRequest(1, 20);

    await runSaga(
      {
        dispatch: (action) => dispatchedActions.push(action),
      },
      getAllBooks,
      fakeAction,
    ).toPromise();

    expect(dispatchedActions[0].type).toEqual('GET_ALL_BOOKS_SUCCESS');
    expect(dispatchedActions[0]).toEqual(getAllBooksSuccess(mockResponse.data.books, mockResponse.data.count));
  });

  it('should dispatch GET_ALL_BOOKS_FAILURE, when getAllBooksAPI failed', async () => {
    const mockErrorResponse = {
      response: {
        data: {
          message: 'Error loading books',
        },
      },
    };

    (axios.get as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

    const dispatchedActions: any[] = [];
    const fakeAction = getAllBooksRequest(1, 20);

    await runSaga(
      {
        dispatch: (action) => dispatchedActions.push(action),
      },
      getAllBooks,
      fakeAction,
    ).toPromise();

    expect(dispatchedActions[0]).toEqual(getAllBooksFailure(mockErrorResponse.response.data.message));
  });
});

describe('BooksContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.clearActions();
    jest.resetModules();

    render(
      <Provider store={store}>
        <BooksContainer books={mockBooks} title="All Books" booksPerPage={20} />
      </Provider>,
    );
  });

  it('should render at least one BookCard, when the component is rendered with books data ', () => {
    const bookCards = screen.getAllByTestId('book-card');
    expect(bookCards.length).toBeGreaterThan(0);
  });

  it('should render the correct number of BookCard components', () => {
    expect(screen.getAllByTestId('book-card').length).toBe(mockBooks.length);
  });
});

describe('Books Group page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.clearActions();
    jest.resetModules();
  });

  it('should render GroupBooksContainer Component', () => {
    (useParams as jest.Mock).mockReturnValue({ groupName: 'ItemNewAll' });

    render(
      <Provider store={store}>
        <BooksGroup />
      </Provider>,
    );

    expect(screen.getByTestId('book-group-container')).toBeInTheDocument();
  });
});

describe('GroupBooksContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.clearActions();
    jest.resetModules();

    (useParams as jest.Mock).mockReturnValue({ groupName: 'ItemNewAll' });
    const { groupName } = useParams();
    const title = bookGroups[groupName as QueryTypes];
    const { groupBooks, isGetBooksByGroupLoading } = useSelector((store: RootState) => store.book);

    const mockHandleSeeMore = jest.fn();

    render(
      <Provider store={store}>
        <GroupBooksContainer books={groupBooks} title={title} handleSeeMore={mockHandleSeeMore} isGetBooksByGroupLoading={isGetBooksByGroupLoading} />
      </Provider>,
    );
  });
  it('should render group-container, when GroupBooksContainer Component is called', () => {
    const { groupName } = useParams();
    const title = bookGroups[groupName as QueryTypes];

    expect(title).toBe('새로 나온 책');
    expect(screen.getByTestId('group-container')).toBeInTheDocument();
  });

  it('should show two book cards', () => {
    expect(screen.getAllByTestId('book-card').length).toBe(mockBooks.length);
  });
});
