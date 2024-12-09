import '@testing-library/jest-dom';
import rootReducer from '@/app/reducers';
import rootSaga from '@/app/sagas';
import Search from '@/app/search/page';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
  reducer: rootReducer,
});

const mockRouter = jest.fn();
sagaMiddleware.run(rootSaga);
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockRouter,
}));
jest.mock('axios');

describe('SearchContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.clearActions();
    jest.resetModules();
    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );
  });
  it('should render SearchContainer ', () => {
    const textFields = screen.getAllByRole('textbox');
    expect(textFields.length).toEqual(4);
  });
});
