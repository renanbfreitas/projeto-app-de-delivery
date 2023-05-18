import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser, logout } from '../Utils/LocalStorage';
import '../Styles/components/navbar.css';

export default function Navbar() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const user = getUser();
    setUserRole(user.role);
    return setUserName(user?.name);
  }, []);

  return (
    <nav>
      {userRole === 'customer' && (
        <NavLink
          className="produtos"
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS

        </NavLink>

      )}
      { (userRole === 'customer' || userRole === 'seller') && (
        <NavLink
          className="pedidos"
          to={ `/${userRole}/orders` }
          data-testid="customer_products__element-navbar-link-orders"
        >
          { userRole === 'customer' ? 'MEUS PEDIDOS' : 'PEDIDOS' }
        </NavLink>
      )}
      <p
        className="nomeCliente"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { userName }
      </p>
      <NavLink
        className="sair"
        to="/login"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => logout() }
      >
        SAIR
      </NavLink>
    </nav>
  );
}
