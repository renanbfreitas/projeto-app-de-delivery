import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { getUser } from '../Utils/LocalStorage';
import ProductList from '../Components/ProductList';
import DetailsOrders from '../Components/DetailsOrders';

function Checkout() {
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
      <DetailsOrders />
    </div>
  );
}

export default Checkout;
