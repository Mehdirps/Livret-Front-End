/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import OrdersTable from '../../components/dashboard/shop/OrdersTable';
import Loading from '../../components/Loading';

const Order = () => {
    const token = useSelector(state => state.user.token);
    const [orders, setOrders] = useState(null);

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
                }else{
                    setOrders([]);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [token]);

    if (!orders) {
        return (
            <Loading />
        );
    }

    return (
        <div className="container mt-5">
            <h1>Liste des Commandes</h1>
            <OrdersTable orders={orders} />
        </div>
    );
};

export default Order;
