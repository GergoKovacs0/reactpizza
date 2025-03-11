import React from 'react';
import Order from '../types/Order';
import { Row } from 'react-bootstrap';

interface OrderLineProps {
    order: Order;
}

const OrderLine: React.FC<OrderLineProps> = ({ order }) => {
    return (
        <Row className="bg-light p-2 mb-2">
            <p>
                {order.pizzaId} - {order.mennyiseg}
            </p>
        </Row>
    );
};

export default OrderLine;
