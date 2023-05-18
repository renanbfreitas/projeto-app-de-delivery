import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from './Button';
import { getOrderInfo, updateOrderStatus } from '../Utils/axios';
import '../Styles/components/customerDetailsOrder.css';

export default function CustomerDetailsOrder() {
  const [orderInfo, setOrderInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeliveredBtnDisabled, setIsDeliveredBtnDisabled] = useState(true);
  const { id: orderId } = useParams();
  const sellerNameId = 'customer_order_details__element-order-details-label-seller-name';
  const dateId = 'customer_order_details__element-order-details-label-order-date';
  const statusId = 'customer_order_details__element-order-details-label-delivery-status';

  const requestOrder = async () => {
    const order = await getOrderInfo(`/orders/getOrder/${orderId}`);
    if (order.status === 'Em Trânsito') { setIsDeliveredBtnDisabled(false); }
    setOrderInfo(order);
  };

  useEffect(() => {
    requestOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  useEffect(() => {
    if (orderInfo) setIsLoading(false);
  }, [orderInfo]);

  const checkOrderDelivered = async () => {
    setIsDeliveredBtnDisabled(true);
    await updateOrderStatus(
      `/orders/update/${orderId}`,
      { status: 'Entregue' },
    );
    const newOrderInfo = { ...orderInfo, status: 'Entregue' };
    setOrderInfo(newOrderInfo);
  };

  if (isLoading) return <p className="pVendedora">Carregando...</p>;
  return (
    <div>
      <p className="pVendedora">Detalhe do Pedido</p>
      <div>
        <div>
          <div>
            <span
              className="pVendedora"
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              {`Pedido ${orderId};`}
            </span>
            <span
              className="pVendedora"
              data-testid={ sellerNameId }
            >
              {`P. Vend: ${orderInfo.seller.name}`}
            </span>
            <span
              className="pVendedora"
              data-testid={ dateId }
            >
              {orderInfo.saleDate}
            </span>
            <span
              className="pVendedora"
              data-testid={ statusId }
            >
              {orderInfo.status}
            </span>
            <Button
              className="buttonMarcarComoEntregue"
              id="deliver_order"
              onClick={ () => checkOrderDelivered() }
              text="MARCAR COMO ENTREGUE"
              dataTestId="customer_order_details__button-delivery-check"
              disabled={ isDeliveredBtnDisabled }
            />
          </div>
        </div>
        <div
          id="table_head"
        >
          <span className="itemCustomer">Item</span>
          <span className="descricaoCustomer">Descrição</span>
          <span className="qtdCustomer">Quantidade</span>
          <span className="valorUnitCustomer">Valor Unitário</span>
          <span className="subTotalCustomer">Sub-total</span>
        </div>
        <div>
          {orderInfo.products.map((p, i) => (
            <div key={ i }>
              <span
                className="number"
                data-testid={
                  `customer_order_details__element-order-table-item-number-${i}`
                }
              >
                {i}
              </span>
              <span
                className="name"
                data-testid={ `customer_order_details__element-order-table-name-${i}` }
              >
                {i}
              </span>
              <span
                className="qtd"
                data-testid={
                  `customer_order_details__element-order-table-quantity-${i}`
                }
              >
                {p.SalesProducts.quantity}
              </span>
              <span
                className="unitPrice"
                data-testid={
                  `customer_order_details__element-order-table-unit-price-${i}`
                }
              >
                {p.price}
              </span>
              <span
                className="totalPrice"
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${i}`
                }
              >
                {(Number(p.price) * p.SalesProducts.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div
          className="buttonVerCarrinho"
          data-testid="customer_order_details__element-order-total-price"
        >
          {orderInfo.totalPrice.replace('.', ',')}
        </div>
      </div>
    </div>
  );
}
