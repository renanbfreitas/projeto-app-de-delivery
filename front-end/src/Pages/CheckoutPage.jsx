import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { getUser } from '../Utils/LocalStorage';
import ProductList from '../Components/ProductList';
import Checkout from '../Components/Checkout';

function CheckoutPage() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user || !user.token) return setIsLogged(true);
  }, []);

  return (
    <div>
      {isLogged && <Redirect to="/login" />}
      <Navbar />
      <ProductList />
      <Checkout />
    </div>
  );
}

export default CheckoutPage;
