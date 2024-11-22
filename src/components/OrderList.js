// src/components/OrderList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    // Función para obtener todas las órdenes
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error al obtener las órdenes:', error);
            alert('Error al obtener las órdenes. Revisa la consola para más detalles.');
        }
    };

    // Función para eliminar una orden
    const deleteOrder = async (orderId) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar la orden con ID ${orderId}?`)) {
            try {
                await axios.delete(`http://localhost:8080/api/orders/${orderId}`);
                alert('Orden eliminada exitosamente.');
                // Actualizar el estado local eliminando la orden
                setOrders(prevOrders => prevOrders.filter(order => order.orderId !== orderId));
            } catch (error) {
                console.error('Error al eliminar la orden:', error);
                alert('Error al eliminar la orden. Revisa la consola para más detalles.');
            }
        }
    };

    // Obtener las órdenes al montar el componente
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h2>Lista de Órdenes</h2>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={fetchOrders}>Actualizar Lista</button>
                <Link to="/create-order" style={{ marginLeft: '10px' }}>
                    <button>Crear Nueva Orden</button>
                </Link>
            </div>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer ID</th>
                        <th>Employee ID</th>
                        <th>Order Date</th>
                        <th>Required Date</th>
                        <th>Shipped Date</th>
                        <th>Ship Via</th>
                        <th>Freight</th>
                        <th>Ship Name</th>
                        <th>Ship Address</th>
                        <th>Ship City</th>
                        <th>Ship Region</th>
                        <th>Ship Postal Code</th>
                        <th>Ship Country</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.customerId}</td>
                                <td>{order.employeeId}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{new Date(order.requiredDate).toLocaleDateString()}</td>
                                <td>{order.shippedDate ? new Date(order.shippedDate).toLocaleDateString() : 'N/A'}</td>
                                <td>{order.shipVia}</td>
                                <td>{order.freight}</td>
                                <td>{order.shipName}</td>
                                <td>{order.shipAddress}</td>
                                <td>{order.shipCity}</td>
                                <td>{order.shipRegion || 'N/A'}</td>
                                <td>{order.shipPostalCode}</td>
                                <td>{order.shipCountry}</td>
                                <td>
                                    {/* Botón para editar la orden */}
                                    <Link to={`/edit-order/${order.orderId}`}>
                                        <button>Editar</button>
                                    </Link>
                                    {/* Botón para eliminar la orden */}
                                    <button onClick={() => deleteOrder(order.orderId)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="15">No hay órdenes disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
