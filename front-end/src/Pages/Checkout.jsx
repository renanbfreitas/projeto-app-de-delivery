import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Button from '../Components/Button';
import { getUser } from '../Utils/LocalStorage';
import ProductList from '../Components/ProductList';
import { checkoutOrder } from '../Utils/axios';

function Checkout() {
  const [isLogged, setIsLogged] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const user = getUser();
    if (!user || !user.token) return setIsLogged(true);
  }, []);

  const handleCheckout = async () => {
    const orderInfo = JSON.parse(localStorage.getItem('cartItems'));
    console.log(orderInfo);
    try {
      const { message: orderId } = await checkoutOrder('/checkoutorder', orderInfo);

      return history.push(`/customer/orders/${orderId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {isLogged && <Redirect to="/login" />}
      <Navbar />
      <ProductList />
      <Button
        onClick={ handleCheckout }
        text="FINALIZAR PEDIDO"
        dataTestId="customer_checkout__button-submit-order"
        disabled={ false }
      />
    </div>
  );
}

export default Checkout;
