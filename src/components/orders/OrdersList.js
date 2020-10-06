import React from 'react'
import ordersJson from '../orders.json';
import OrderItem from './OrderItem';

const orders = ordersJson.orders;

const OrdersList = () => {
    return (
        <div>
            {
               orders.map(o => (
                   <OrderItem key={o.id} order={o}/>
               ))
            }
        </div>
    )
}

export default OrdersList
