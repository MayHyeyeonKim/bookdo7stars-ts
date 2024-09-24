import '@testing-library/jest-dom';
import { getBookRequest } from '@/app/actions/types';
import Book from '@/app/book/[bookId]/page';
import rootReducer from '@/app/reducers';
import rootSaga from '@/app/sagas';
import { render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'next/navigation';
import { Provider } from 'react-redux';
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
  });

  it('should dispatch getBookRequest when it is rendered', async () => {
    (useParams as jest.Mock).mockReturnValue({ bookId: '123' });
    // useParams에서 bookId를 설정
    // mockUseParams.mockReturnValue({ bookId: '123' });

    render(
      <Provider store={store}>
        <Book />
      </Provider>,
    );

    // waitFor을 사용하여 dispatch가 호출되기를 기다림
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1));

    const dispatchedAction = mockDispatch.mock.calls[0][0];
    expect(dispatchedAction).toEqual(getBookRequest('123'));
  });
});
