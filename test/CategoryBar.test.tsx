import '@testing-library/jest-dom';
import CategoryBar from '@/app/components/CategoryBar';
import rootSaga from '@/app/sagas';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

// 모의 데이터 생성
const mockCategories = [
  {
    id: 1,
    name: 'Category 1',
    children: [
      { id: 2, name: 'Subcategory 1-1' },
      { id: 3, name: 'Subcategory 1-2' },
    ],
  },
  {
    id: 4,
    name: 'Category 2',
    children: [],
  },
];

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
  category: { categories: mockCategories }, // 초기값 설정
});

const mockRouter = jest.fn();
sagaMiddleware.run(rootSaga);
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockRouter,
}));
jest.mock('axios');

describe('CategoryBar', () => {
  it('toggles category visibility when the menu icon is clicked', () => {
    render(
      <Provider store={store}>
        <CategoryBar />
      </Provider>,
    );

    const menuIcon = screen.getByTestId('menu-icon');
    fireEvent.click(menuIcon);

    // 카테고리가 표시되는지 확인
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('filters categories based on search input', async () => {
    render(
      <Provider store={store}>
        <CategoryBar />
      </Provider>,
    );

    const menuIcon = screen.getByTestId('menu-icon');
    fireEvent.click(menuIcon);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: '1' } });

    // 검색 후 결과를 기다림
    await waitFor(() => {
      expect(screen.getByText('Category 1')).toBeInTheDocument();
      expect(screen.queryByText('Category 2')).toBeInTheDocument();
    });
  });
});
