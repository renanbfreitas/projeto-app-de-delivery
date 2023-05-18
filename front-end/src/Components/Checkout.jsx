import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { checkoutOrder, getSellers, setToken } from '../Utils/axios';
import '../Styles/pages/checkout.css';

function Checkout() {
  const [sellerId, setSellerId] = useState(2);
  const [sellers, setSellers] = useState([]);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const history = useHistory();

  const products = JSON.parse(localStorage.getItem('cartItems')) || [];
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const sumPrices = products.reduce((acc, curr) => (curr.price * curr.quantity) + acc, 0);

  useEffect(() => {
    const requestSellers = async () => {
      const response = await getSellers('/orders/sellers');
      return setSellers(response);
    };
    requestSellers();
  }, []);

  async function finishOrder() {
    setToken(userInfo.token);
    const orderInfo = {
      sellerId,
      status: 'Pendente',
      deliveryAddress: address,
      deliveryNumber: number,
      totalPrice: sumPrices,
      products,
    };

    try {
      const order = await checkoutOrder('/orders/finish', orderInfo);

      history.push(`/customer/orders/${order.id}`);
      // localStorage.removeItem('cartItems');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2 className="tituloPg">Detalhes e Endereço para Entrega</h2>
      <form>
        <div className="pVendedora">
          <label htmlFor="input-seller">
            {' '}
            P. Vendedora Responsável:
            <select
              className="pVendedora1"
              data-testid="customer_checkout__select-seller"
              onChange={ ({ target }) => setSellerId(target.value) }
            >
              {sellers.map(({ id, name }, index) => (
                <option key={ index } value={ id }>{name}</option>
              ))}

            </select>
          </label>
        </div>
        <div className="endereco">
          <label htmlFor="input-address">
            Endereço
            <input
              className="endereco1"
              type="text"
              id="input-address"
              data-testid="customer_checkout__input-address"
              onChange={ ({ target }) => setAddress(target.value) }
            />
          </label>
        </div>
        <div className="numero">
          <label htmlFor="input-number">
            Número
            <input
              className="numero1"
              type="text"
              id="input-number"
              data-testid="customer_checkout__input-address-number"
              onChange={ ({ target }) => setNumber(target.value) }
            />
          </label>
        </div>
        <button
          className="finalizaPedido"
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ () => finishOrder() }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}

export default Checkout;
