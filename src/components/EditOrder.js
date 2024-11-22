// src/components/EditOrder.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditOrder = () => {
    const { id } = useParams(); // Obtener el OrderID de la URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerId: '',
        employeeId: '',
        orderDate: '',
        requiredDate: '',
        shippedDate: '',
        shipVia: '',
        freight: '',
        shipName: '',
        shipAddress: '',
        shipCity: '',
        shipRegion: '',
        shipPostalCode: '',
        shipCountry: ''
    });

    // Función para obtener los datos de la orden existente
    const fetchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/orders/${id}`);
            const order = response.data;
            setFormData({
                customerId: order.customerId || '',
                employeeId: order.employeeId || '',
                orderDate: order.orderDate ? order.orderDate.split('T')[0] : '',
                requiredDate: order.requiredDate ? order.requiredDate.split('T')[0] : '',
                shippedDate: order.shippedDate ? order.shippedDate.split('T')[0] : '',
                shipVia: order.shipVia || '',
                freight: order.freight || '',
                shipName: order.shipName || '',
                shipAddress: order.shipAddress || '',
                shipCity: order.shipCity || '',
                shipRegion: order.shipRegion || '',
                shipPostalCode: order.shipPostalCode || '',
                shipCountry: order.shipCountry || ''
            });
        } catch (error) {
            console.error('Error al obtener la orden:', error);
            alert('Error al obtener la orden. Revisa la consola para más detalles.');
        }
    };

    // Obtener la orden al montar el componente
    useEffect(() => {
        fetchOrder();
        // eslint-disable-next-line
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convertir los campos de fecha a formato adecuado si están presentes
        const dataToSend = { ...formData };
        if (dataToSend.orderDate) dataToSend.orderDate = new Date(dataToSend.orderDate);
        if (dataToSend.requiredDate) dataToSend.requiredDate = new Date(dataToSend.requiredDate);
        if (dataToSend.shippedDate) dataToSend.shippedDate = new Date(dataToSend.shippedDate);
        if (dataToSend.employeeId) dataToSend.employeeId = parseInt(dataToSend.employeeId);
        if (dataToSend.shipVia) dataToSend.shipVia = parseInt(dataToSend.shipVia);
        if (dataToSend.freight) dataToSend.freight = parseFloat(dataToSend.freight);

        try {
            await axios.put(`http://localhost:8080/api/orders/${id}`, dataToSend);
            alert('Orden actualizada exitosamente.');
            navigate('/'); // Redireccionar a la lista de órdenes
        } catch (error) {
            console.error('Error al actualizar la orden:', error);
            alert('Error al actualizar la orden. Revisa la consola para más detalles.');
        }
    };

    return (
        <div>
            <h2>Editar Orden ID: {id}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Customer ID:</label>
                    <input
                        type="text"
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Employee ID:</label>
                    <input
                        type="number"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Order Date:</label>
                    <input
                        type="date"
                        name="orderDate"
                        value={formData.orderDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Required Date:</label>
                    <input
                        type="date"
                        name="requiredDate"
                        value={formData.requiredDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Shipped Date:</label>
                    <input
                        type="date"
                        name="shippedDate"
                        value={formData.shippedDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Ship Via:</label>
                    <input
                        type="number"
                        name="shipVia"
                        value={formData.shipVia}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Freight:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="freight"
                        value={formData.freight}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Ship Name:</label>
                    <input
                        type="text"
                        name="shipName"
                        value={formData.shipName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Ship Address:</label>
                    <input
                        type="text"
                        name="shipAddress"
                        value={formData.shipAddress}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Ship City:</label>
                    <input
                        type="text"
                        name="shipCity"
                        value={formData.shipCity}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Ship Region:</label>
                    <input
                        type="text"
                        name="shipRegion"
                        value={formData.shipRegion}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Ship Postal Code:</label>
                    <input
                        type="text"
                        name="shipPostalCode"
                        value={formData.shipPostalCode}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Ship Country:</label>
                    <input
                        type="text"
                        name="shipCountry"
                        value={formData.shipCountry}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Actualizar Orden</button>
            </form>
        </div>
    );
};

export default EditOrder;
