// src/components/OrderForm.js

import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
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
            const response = await axios.post('http://localhost:8080/api/orders', dataToSend);
            alert(`Orden creada exitosamente con ID ${response.data.orderId}`);
            // Limpiar el formulario
            setFormData({
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
        } catch (error) {
            console.error('Error al crear la orden:', error);
            alert('Error al crear la orden. Revisa la consola para más detalles.');
        }
    };

    return (
        <div>
            <h2>Crear Nueva Orden</h2>
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
                <button type="submit">Crear Orden</button>
            </form>
        </div>
    );
};

export default OrderForm;
