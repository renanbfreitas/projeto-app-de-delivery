import React, { useEffect, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isIncorrectValues, setIsIncorrectValues] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  // const [errorMessage, setErrorMessage] = useState('');

  const verifyFields = () => {
    const maxNameLength = 12;
    const minPasswordLength = 6;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(`name: ${name.length <= maxNameLength}`);
    console.log(`email: ${regexEmail.test(email)}`);
    console.log(`password: ${password.length >= minPasswordLength}`);
    return (
      regexEmail.test(email)
      && password.length >= minPasswordLength
      && name.length >= maxNameLength
    );
  };

  useEffect(() => {
    const checkInputs = verifyFields();
    setIsDisabled(!checkInputs);
  }, [name, email, password]);

  // const handleLogin = async () => {
  //   const loginInfo = { email, password };

  //   try {
  //     const token = await loginRequest('/login', loginInfo);
  //     console.log(token.token);
  //     setToken(token.token);
  //     return setIsLogged(true);
  //   } catch (error) {
  //     setIsIncorrectValues(true);
  //     return setErrorMessage(error.response.data.message);
  //   }
  // };

  return (
    <div>
      <form>
        <Input
          type="text"
          placeholder="Name"
          label="Name"
          onChange={ ({ target: { value } }) => setName(value) }
          dataTestId="common_register__input-name"
          id="name-input"
          value={ name }
        />
        <Input
          type="email"
          placeholder="email@email.com"
          label="Email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          dataTestId="common_register__input-email"
          id="email-input"
          value={ email }
        />
        <Input
          type="password"
          placeholder="*******"
          label="Password"
          onChange={ ({ target: { value } }) => setPassword(value) }
          dataTestId="common_register__input-password"
          id="password-input"
          value={ password }
        />
        <Button
          onClick={ () => {} }
          text="Login"
          dataTestId="common_register__button-register"
          disabled={ isDisabled }
        />
      </form>
      {/* {
        isIncorrectValues
        && (
          <p data-testid="common_login__element-invalid-email">
            {errorMessage}
          </p>
        )
      } */}
    </div>
  );
}

export default Register;
