import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Pizza from '../types/Pizza';
import { useNavigate } from 'react-router-dom';

interface PizzaCardProps {
    pizza: Pizza;
}

const PizzaCard: React.FC<PizzaCardProps> = ({ pizza }) => {
    const navigate = useNavigate();
    return (
        <Card style={{ width: '18rem' }} onClick={() => navigate(`/pizza/${pizza.id}`)}>
            <Card.Img variant="top" src={`http://localhost:8021/api/kepek/${pizza.imageUrl}`} />
            <Card.Body>
                <Card.Title>{pizza.nev}</Card.Title>
                <Card.Text>{pizza.leiras}</Card.Text>
                <Card.Text>{pizza.ar} Ft</Card.Text>
                <Button variant="primary">Rendelés</Button>
            </Card.Body>
        </Card>
    );
};

export default PizzaCard;
