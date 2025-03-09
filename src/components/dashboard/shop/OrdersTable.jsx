import React from 'react';

const OrdersTable = ({ orders }) => {
    
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID de la commande</th>
                        <th>Prix Total</th>
                        <th>Produits</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !orders || orders.length <= 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">Aucune commande trouvée</td>
                            </tr>
                        ) : (
                            orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.order_id}</td>
                                    <td>{order.total_price} €</td>
                                    <td>
                                        <ul>
                                            {order.products.map((product, index) => (
                                                <li key={index}>{product.name}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{new Date(order.created_at).toLocaleString()}</td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
