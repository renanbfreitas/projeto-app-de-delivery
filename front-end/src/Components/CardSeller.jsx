import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CardSeller({ id, status, saleDate,
  totalPrice, deliveryAddress, deliveryNumber }) {
  const data = new Date(saleDate);
  const dia = data.getDate();
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear();
  const formatedData = `${dia}/${mes}/${ano}`;

  return (
    <div>
      <Link to={ `/seller/orders/${id}` }>
        <div
          data-testid={ `seller_orders__element-order-id-${id}` }
        >
          {id}
        </div>

        <div
          data-testid={ `seller_orders__element-delivery-status-${id}` }
        >
          {status}
        </div>

        <div
          data-testid={ `seller_orders__element-order-date-${id}` }
        >
          {formatedData}
        </div>

        <div
          data-testid={ `seller_orders__element-card-price-${id}` }
        >
          {(totalPrice).replace('.', ',')}
        </div>
        <div
          data-testid={ `seller_orders__element-card-address-${id}` }
        >
          {deliveryAddress}
          ,
          {' '}
          {deliveryNumber}

        </div>
      </Link>
    </div>
  );
}

CardSeller.propTypes = {
  id: PropTypes.number,
  saleDate: PropTypes.Date,
  status: PropTypes.string,
  totalPrice: PropTypes.string,
  devliveryAdress: PropTypes.number,
  deliveryNumber: PropTypes.number,
}.isRequired;

export default CardSeller;
