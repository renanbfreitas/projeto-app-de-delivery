import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CardOrder({ id, status, saleDate, totalPrice }) {
  const data = new Date(saleDate);
  const dia = data.getDate();
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear();
  const formatedData = `${dia}/${mes}/${ano}`;

  return (
    <div>
      <Link to={ `/customer/orders/${id}` }>
        <div>
          <span
            className="order"
            data-testid={ `customer_orders__element-order-id-${id}` }
          >
            {id}
          </span>
        </div>
        <div>
          <span
            className="status"
            data-testid={ `customer_orders__element-delivery-status-${id}` }
          >
            {status}
          </span>
        </div>
        <div>
          <p
            className="date"
            data-testid={ `customer_orders__element-order-date-${id}` }
          >
            {formatedData}
          </p>
        </div>
        <div>
          <p
            className="price"
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            {(totalPrice).replace('.', ',')}
          </p>
        </div>
      </Link>
    </div>
  );
}

CardOrder.propTypes = {
  id: PropTypes.number,
  saleDate: PropTypes.Date,
  status: PropTypes.string,
  totalPrice: PropTypes.string,
}.isRequired;

export default CardOrder;
