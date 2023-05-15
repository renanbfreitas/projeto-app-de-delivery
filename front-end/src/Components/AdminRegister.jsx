import React, { useEffect, useState } from 'react';
import { adminRegister } from '../Utils/axios';
import verifyFields from '../Utils/verifyFields';
import Button from './Button';
import Input from './Input';

function AdminRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsDisabled(!verifyFields(name, email, password));
  }, [name, email, password]);

  const handleRegister = async () => {
    const newUserInfo = { name, email, password, role };

    try {
      await adminRegister('/admin/register', newUserInfo);
    } catch ({ response: { data } }) {
      return setErrorMessage(data);
    }
  };

  return (
    <div>
      <span>Cadastrar novo usuário</span>
      <form>
        <Input
          type="text"
          placeholder="Nome"
          label="Nome"
          onChange={ ({ target: { value } }) => setName(value) }
          dataTestId="admin_manage__input-name"
          id="name-input"
          value={ name }
        />
        <Input
          type="email"
          placeholder="email@email.com"
          label="Email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          dataTestId="admin_manage__input-email"
          id="email-input"
          value={ email }
        />
        <Input
          type="password"
          placeholder="*******"
          label="Senha"
          onChange={ ({ target: { value } }) => setPassword(value) }
          dataTestId="admin_manage__input-password"
          id="password-input"
          value={ password }
        />
        <label htmlFor="userRoleSelect">
          Tipo
          <select
            name="userRoleSelect"
            id="userRoleSelect"
            data-testid="admin_manage__select-role"
            onChange={ ({ target: { value } }) => setRole(value) }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <Button
          onClick={ () => handleRegister() }
          text="Cadastrar"
          dataTestId="admin_manage__button-register"
          disabled={ isDisabled }
        />
      </form>
      {
        errorMessage && (
          <p data-testid="admin_manage__element-invalid-register">
            {errorMessage}
          </p>
        )
      }
    </div>
  );
}

export default AdminRegister;
