import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import Order from '../types/Order';
import { Container } from 'react-bootstrap';
import OrderLine from '../components/OrderLine';

const Rendelesek: React.FC = () => {
    const [rendelesek, setRendelesek] = useState<Order[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        apiClient
            .get('/rendelesek')
            .then((response) => {
                setRendelesek(response.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Container>
            <h1>Rendelések</h1>
            {isLoaded ? rendelesek.map((rendeles) => <OrderLine order={rendeles} />) : null}
        </Container>
    );
};

export default Rendelesek;
