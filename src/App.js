// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import EditOrder from './components/EditOrder';
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Gestión de Órdenes</h1>
                <Routes>
                    <Route path="/" element={<OrderList />} />
                    <Route path="/create-order" element={<OrderForm />} />
                    <Route path="/edit-order/:id" element={<EditOrder />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
