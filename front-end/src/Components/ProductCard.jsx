/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { addProductCart, getProductsCart } from '../Utils/LocalStorage';
import '../Styles/components/productCard.css';

export default function ProductCard(product) {
  const { id, productName, price, urlImage, forceRender } = product;
  const [quantity, setQuantity] = useState(0);

  useEffect(() => addProductCart({ ...product, quantity }), [quantity]);
  const changeCart = async ({ target }) => {
    const products = getProductsCart() || [];
    if (target.name === 'add') {
      const productFromCart = products
        .find(({ id: idProd }) => idProd === id) || { ...product, quantity };
      productFromCart.quantity = quantity;
      forceRender((prev) => prev + 1);
      return setQuantity((prev) => Number(prev) + 1);
    }
    const productFromCart = products
      .find(({ id: idProd }) => idProd === id) || { ...product, quantity };
    productFromCart.quantity = quantity;
    forceRender((prev) => prev + 1);
    return setQuantity((prev) => Number(prev) - 1);
  };

  const handleChange = async ({ target }) => {
    setQuantity(Number(target.value));
    forceRender((prev) => prev + 1);
  };

  return (
    <div className="Produto">
      <h3
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {productName}
      </h3>
      <img
        className="ProdutoImage"
        src={ urlImage }
        alt={ productName }
        style={ { width: '50px' } }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p>
        R$
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { Number(price).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
        </span>
      </p>
      <Button
        onClick={ changeCart }
        dataTestId={ `customer_products__button-card-rm-item-${id}` }
        disabled={ quantity <= 0 }
        nameButton="sub"
        text="-"
      />
      <input
        className="buttonQtd"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        name="input_card_quantity"
        onChange={ handleChange }
        id={ `product-${id}` }
        min="0"
        value={ quantity }
      />
      <Button
        onClick={ changeCart }
        dataTestId={ `customer_products__button-card-add-item-${id}` }
        disable={ false }
        nameButton="add"
        text="+"
      />
    </div>
  );
}
ProductCard.propTypes = {
  id: PropTypes.number,
  price: PropTypes.number,
  productName: PropTypes.string,
  urlImage: PropTypes.string,
  forceRender: PropTypes.func,
}.isRequired;
