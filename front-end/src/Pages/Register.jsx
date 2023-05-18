import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { registerRequest, setToken } from '../Utils/axios';
import verifyFields from '../Utils/verifyFields';
import '../Styles/pages/register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    setIsDisabled(!verifyFields(name, email, password));
  }, [name, email, password]);

  const handleRegister = async () => {
    const registerInfo = { name, email, password };

    try {
      const { message } = await registerRequest('/register', registerInfo);

      setToken(message.token);
      localStorage.setItem('user', JSON.stringify(message));

      return history.push('/customer/products');
    } catch (error) {
      return setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <form className="formRegister">
        <div>
          <Input
            className="nameRegister"
            type="text"
            placeholder="Name"
            label="Name"
            onChange={ ({ target: { value } }) => setName(value) }
            dataTestId="common_register__input-name"
            id="name-input"
            value={ name }
          />
        </div>
        <div>
          <Input
            className="emailRegister"
            type="email"
            placeholder="email@email.com"
            label="Email"
            onChange={ ({ target: { value } }) => setEmail(value) }
            dataTestId="common_register__input-email"
            id="email-input"
            value={ email }
          />
        </div>
        <div>
          <Input
            className="passwordRegister"
            type="password"
            placeholder="*******"
            label="Password"
            onChange={ ({ target: { value } }) => setPassword(value) }
            dataTestId="common_register__input-password"
            id="password-input"
            value={ password }
          />
        </div>
        <div>
          <Button
            onClick={ () => handleRegister() }
            text="Login"
            dataTestId="common_register__button-register"
            disabled={ isDisabled }
          />
        </div>
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
