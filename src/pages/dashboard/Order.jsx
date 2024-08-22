import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import OrdersTable from '../../components/dashboard/shop/OrdersTable';

const Order = () => {
    const token = useSelector(state => state.user.token);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'dashboard/userOrders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    setOrders(data.orders);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [token]);

    return (
        <div className="container mt-5">
            <h1>Liste des Commandes</h1>
            <OrdersTable orders={orders} />
        </div>
    );
};

export default Order;
