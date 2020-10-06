import React from 'react'
import SalesCategoryChart from '../charts/SalesCategoryChart';
import OrdersList from './OrdersList';

const Orders = () => {
    return (
        <div>
            <SalesCategoryChart/>
            <OrdersList/>
        </div>
    )
}

export default Orders
