import React, { useEffect, useState } from 'react';
import Order from '../types/Order';
import { Card } from 'react-bootstrap';
import apiClient from '../services/apiClient';
import Pizza from '../types/Pizza';

interface OrderProps {
    order: Order;
}

const OrderComponent: React.FC<OrderProps> = ({ order }) => {
    const [pizza, setPizza] = useState<Pizza[]>([]);
    useEffect(() => {
        apiClient.get('/pizzak').then((response) => {
            setPizza(response.data);
        });
    }, []);

    const getPizzaName = (id: number) => {
        return pizza.find((p) => p.id === id)?.nev;
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>#ID</Card.Title>
                <Card.Text className="d-flex justify-content-between">
                    <h2>{getPizzaName(order.pizzaId)}</h2>
                    <h2>{order.mennyiseg} db</h2>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default OrderComponent;
