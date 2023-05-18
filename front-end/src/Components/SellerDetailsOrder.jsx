import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from './Button';
import { getOrderInfo, updateOrderStatus } from '../Utils/axios';

export default function SellerDetailsOrder() {
  const [orderInfo, setOrderInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrepareDisabled, setIsPrepareDisabled] = useState(false);
  const [isDispatchDisabled, setIsDispatchDisabled] = useState(true);
  const { id: orderId } = useParams();
  const dateId = 'seller_order_details__element-order-details-label-order-date';
  const statusId = 'seller_order_details__element-order-details-label-delivery-status';

  const requestOrder = async () => {
    const order = await getOrderInfo(`/orders/getOrder/${orderId}`);
    if (order.status !== 'Pendente') {
      setIsPrepareDisabled(true);
    }
    if (order.status === 'Preparando') {
      setIsDispatchDisabled(false);
    }
    setOrderInfo(order);
  };

  useEffect(() => {
    requestOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  useEffect(() => {
    if (orderInfo) setIsLoading(false);
  }, [orderInfo]);

  const prepareOrder = async () => {
    setIsPrepareDisabled(true);
    await updateOrderStatus(
      `/orders/update/${orderId}`,
      { status: 'Preparando' },
    );
    setIsDispatchDisabled(false);
    const newOrderInfo = { ...orderInfo, status: 'Preparando' };
    setOrderInfo(newOrderInfo);
  };

  const dispatchOrder = async () => {
    setIsDispatchDisabled(true);
    await updateOrderStatus(
      `/orders/update/${orderId}`,
      { status: 'Em Trânsito' },
    );
    const newOrderInfo = { ...orderInfo, status: 'Em Trânsito' };
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
              data-testid="seller_order_details__element-order-details-label-order-id"
            >
              {`Pedido ${orderId};`}
            </span>
            <span
              data-testid={ dateId }
            >
              {orderInfo.saleDate}
            </span>
            <span
              data-testid={ statusId }
            >
              {orderInfo.status}
            </span>
            <Button
              id="prepare_order"
              onClick={ () => prepareOrder() }
              text="PREPARAR PEDIDO"
              dataTestId="seller_order_details__button-preparing-check"
              disabled={ isPrepareDisabled }
            />
            <Button
              id="deliver_order"
              onClick={ () => dispatchOrder() }
              text="SAIU PARA ENTREGA"
              dataTestId="seller_order_details__button-dispatch-check"
              disabled={ isDispatchDisabled }
            />
          </div>
        </div>
        <div
          className="pVendedora"
          id="table_head"
        >
          <span>Item</span>
          <span>Descrição</span>
          <span>Quantidade</span>
          <span>Valor Unitário</span>
          <span>Sub-total</span>
        </div>
        <div>
          {orderInfo.products.map((p, i) => (
            <div key={ i }>
              <span
                data-testid={
                  `seller_order_details__element-order-table-item-number-${i}`
                }
              >
                {i}
              </span>
              <span
                data-testid={ `seller_order_details__element-order-table-name-${i}` }
              >
                {i}
              </span>
              <span
                data-testid={
                  `seller_order_details__element-order-table-quantity-${i}`
                }
              >
                {p.SalesProducts.quantity}
              </span>
              <span
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${i}`
                }
              >
                {p.price}
              </span>
              <span
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${i}`
                }
              >
                {(Number(p.price) * p.SalesProducts.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div data-testid="seller_order_details__element-order-total-price">
          {orderInfo.totalPrice.replace('.', ',')}
        </div>
      </div>
    </div>
  );
}
