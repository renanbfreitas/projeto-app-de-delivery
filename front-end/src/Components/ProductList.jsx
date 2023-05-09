import React, { useEffect, useState } from 'react';
import { getProductsCart, removeProduct } from '../Utils/LocalStorage';

export default function ProductList() {
  const [cartProduct, setCartProducts] = useState([]);
  useEffect(() => {
    const cart = getProductsCart() || [];
    setCartProducts(cart);
  }, []);

  const sumPrices = cartProduct
    .reduce((acc, curr) => (curr.price * curr.quantity) + acc, 0);

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {cartProduct.map((product, index) => (
            <tr key={ product.id }>
              <th
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </th>

              <th
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                {product.productName}
              </th>

              <th
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                {product.quantity}
              </th>

              <th
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {(product.price).replace('.', ',')}
              </th>

              <th
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                R$
                {' '}
                {(product.price * product.quantity).toFixed(2).replace('.', ',')}
                {' '}

              </th>
              <th
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              >
                <button
                  type="button"
                  onClick={ () => { setCartProducts(removeProduct(product.id)); } }
                >
                  Eliminar
                </button>
              </th>
            </tr>

          ))}
        </tbody>
      </table>
      <button
        data-testid="customer_checkout__element-order-total-price"
        type="button"
      >
        R$
        {' '}
        {sumPrices.toFixed(2).replace('.', ',')}
      </button>
    </div>
  );
}
