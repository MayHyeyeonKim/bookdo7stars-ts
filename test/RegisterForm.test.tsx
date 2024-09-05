import '@testing-library/jest-dom';
import { registerRequest } from '@/app/actions/types';
import RegisterForm from '@/app/components/RegisterForm';
import rootReducer from '@/app/reducers';
import rootSaga from '@/app/sagas';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
  reducer: rootReducer,
});
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();
const mockRouter = jest.fn();

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockRouter,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => mockUseSelector,
}));

sagaMiddleware.run(rootSaga);

let nameInput: HTMLInputElement,
  emailInput: HTMLInputElement,
  passwordInput: HTMLInputElement,
  confirmPasswordInput: HTMLInputElement,
  addressInput: HTMLInputElement,
  mobileInput: HTMLInputElement,
  policy: HTMLFormElement,
  registerButton: HTMLButtonElement;

describe('RegisterForm', () => {
  // Redux-Saga Middleware
  beforeEach(() => {
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>,
    );
    // mockUseSelector.mockReturnValue({ isRegisterDone: true, isRegisterError: '' });
    // get all input fields
    nameInput = screen.getByLabelText('name');
    emailInput = screen.getByLabelText('email');
    passwordInput = screen.getByLabelText('password');
    confirmPasswordInput = screen.getByLabelText('confirmPassword');
    addressInput = screen.getByLabelText('address');
    mobileInput = screen.getByLabelText('mobile');
    // checkbok
    policy = screen.getByRole('checkbox');
    // button
    registerButton = screen.getByRole('button', { name: 'Register', hidden: true });

    store.clearActions();
    jest.clearAllMocks();
  });

  it('should render all input fields, checkbox and button for register', () => {
    // all fields are expected in the document
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(mobileInput).toBeInTheDocument();
    expect(policy).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('should dispatch register request when register-button is clicked', () => {
    // give information to all fields and click register button

    fireEvent.change(nameInput, { target: { value: 'Joon' } });
    fireEvent.change(emailInput, { target: { value: 'joon@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(policy);
    fireEvent.click(registerButton);

    // Check that mockDispatch was called
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    // get the first dispatched action
    const dispatchedAction = mockDispatch.mock.calls[0][0];

    expect(dispatchedAction).toEqual(
      registerRequest({
        name: 'Joon',
        email: 'joon@gmail.com',
        password: 'password123',
        address: '',
        mobile: '',
      }),
    );
  });

  it('should render a warning message, if a mandatory field is not filled', () => {
    fireEvent.change(emailInput, { target: { value: 'joon@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(policy);
    fireEvent.click(registerButton);
    expect(nameInput).toHaveAttribute('aria-invalid', 'true');

    expect(screen.getByText('This is a mandatory field.')).toBeInTheDocument();
  });
  it('should render another warning message, if a checkbox is not checked', () => {
    fireEvent.change(emailInput, { target: { value: 'joon@gmail.com' } });
    fireEvent.change(emailInput, { target: { value: 'joon@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);
    expect(policy).not.toBeChecked();

    expect(screen.getByText('You should agree the Policy.')).toBeInTheDocument();
  });
});
