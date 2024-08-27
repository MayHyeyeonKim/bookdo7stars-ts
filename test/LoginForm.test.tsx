import '@testing-library/jest-dom';
import { loginFailure, loginRequest, LoginRequestAction, loginSuccess } from '@/app/actions/constants';
import LoginForm from '@/app/components/LoginForm';
import rootReducer from '@/app/reducers';
import rootSaga from '@/app/sagas';
import { login } from '@/app/sagas/user';
import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware, { runSaga } from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
  reducer: rootReducer,
});
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();
const mockRouter = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => mockUseSelector,
}));

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockRouter,
}));

sagaMiddleware.run(rootSaga);

jest.mock('axios');

let emailInput: HTMLInputElement, passwordInput: HTMLInputElement, loginButton: HTMLButtonElement;

describe('LoginForm', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );
    emailInput = screen.getByLabelText('email');
    passwordInput = screen.getByLabelText('password');
    loginButton = screen.getByRole('button', { name: 'Login' });

    store.clearActions();
    jest.clearAllMocks();
  });

  it('should render all input fields and button for login', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  //fireEvent는 돔 이벤트 시뮬레이션하는 것
  it('should dispatch login request when login button is clicked', () => {
    fireEvent.change(emailInput, { target: { value: 'maychu@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '0909' } });
    fireEvent.click(loginButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    const dispatchedAction = mockDispatch.mock.calls[0][0];

    expect(dispatchedAction).toEqual(
      loginRequest({
        email: 'maychu@gmail.com',
        password: '0909',
      }),
    );
  });

  it('should dispatch LOGIN_SUCCESS when login API is successful', async () => {
    const mockResponse = { data: { name: 'joon2', grade: 'bronze' } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const dispatchedActions: any[] = [];

    const fakeAction = loginRequest({ email: 'joon2@gmail.com', password: 'password12' });

    await runSaga(
      {
        dispatch: (action) => dispatchedActions.push(action),
      },
      login,
      fakeAction,
    ).toPromise();

    expect(dispatchedActions[0]).toEqual(loginSuccess(mockResponse.data));
  });

  it('should dispatch LOGIN_FAILURE when login API failed', async () => {
    const mockErrorResponse = {
      response: {
        data: {
          message: 'user not found',
        },
      },
    };
    (axios.post as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

    const dispatchedActions: any[] = [];

    const fakeAction = loginRequest({ email: 'joon2@gmail.com', password: 'password123' });

    await runSaga(
      {
        dispatch: (action) => dispatchedActions.push(action),
      },
      login,
      fakeAction,
    ).toPromise();

    expect(dispatchedActions[0]).toEqual(loginFailure(mockErrorResponse.response.data.message));
  });
});
