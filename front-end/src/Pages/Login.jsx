/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { loginRequest, setToken } from '../Utils/axios';
import { getUser } from '../Utils/LocalStorage';
import verifyFields from '../Utils/verifyFields';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isIncorrectValues, setIsIncorrectValues] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [toRegister, setToRegister] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setIsLogged(true);
      setUserRole(user.role);
    }
  }, []);

  useEffect(() => {
    setIsDisable(!verifyFields(null, email, password));
  }, [email, password]);

  const handleLogin = async () => {
    const loginInfo = {
      email,
      password,
    };
    try {
      const { message } = await loginRequest('/login', loginInfo);
      setToken(message.token);
      localStorage.setItem('user', JSON.stringify(message));
      const userget = getUser();
      setUserRole(userget.role);
      setIsLoading(false);
      return setIsLogged(true);
    } catch (error) {
      setIsIncorrectValues(true);
      return setErrorMessage(error.message);
    }
  };

  return (
    <div>
      {isLoading && !isLogged && <p>Carregando...</p>}
      {isLogged && userRole === 'customer' && <Redirect to="/customer/products" />}
      {isLogged && userRole === 'seller' && <Redirect to="/seller/orders" />}

      <form>
        <Input
          type="email"
          placeholder="email@email.com"
          label="Email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          dataTestId="common_login__input-email"
          id="email-input"
          value={ email }
        />
        <Input
          type="password"
          placeholder="*******"
          label="Password"
          onChange={ ({ target: { value } }) => setPassword(value) }
          dataTestId="common_login__input-password"
          id="password-input"
          value={ password }
        />
        <Button
          onClick={ handleLogin }
          text="Login"
          dataTestId="common_login__button-login"
          disabled={ isDisable }
        />
        <Button
          onClick={ () => setToRegister(true) }
          text="Ainda não tenho conta"
          dataTestId="common_login__button-register"
          disabled={ false }
        />
      </form>
      {
        isIncorrectValues
        && (
          <p data-testid="common_login__element-invalid-email">
            { errorMessage }
          </p>
        )
      }
      {toRegister && <Redirect to="/register" />}
    </div>
  );
}

export default Login;
