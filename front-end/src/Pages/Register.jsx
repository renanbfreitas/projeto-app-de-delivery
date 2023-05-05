import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { registerRequest } from '../Utils/axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const verifyFields = () => {
    const maxNameLength = 12;
    const minPasswordLength = 6;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

  const handleRegister = async () => {
    const registerInfo = { name, email, password };

    try {
      await registerRequest('/register', registerInfo);

      return history.push('/customer/products');
    } catch (error) {
      return setErrorMessage(error.message);
    }
  };

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
          onClick={ () => handleRegister() }
          text="Login"
          dataTestId="common_register__button-register"
          disabled={ isDisabled }
        />
      </form>
      {
        errorMessage && (
          <p data-testid="common_register__element-invalid_register">
            {errorMessage}
          </p>
        )
      }
    </div>
  );
}

export default Register;
