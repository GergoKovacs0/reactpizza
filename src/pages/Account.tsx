import React, { useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import Order from '../types/Order';
import OrderComponent from '../components/Order';
import apiClient from '../services/apiClient';

const Account: React.FC = () => {
    const [username, setUsername] = useState('');
    const [rendelesek, setRendelesek] = useState<Order[]>();

    useEffect(() => {
        const username = sessionStorage.getItem('username') || '';
        setUsername(username);

        apiClient.get('/rendelesek').then((response) => {
            setRendelesek(response.data);
        });
    }, []);

    return (
        <Container className="d-flex justify-content-between mt-5">
            <Col className="d-flex flex-column align-items-center">
                <img src="https://placehold.co/500x500/png" alt="" className="img" />
                <h2>{username}</h2>
            </Col>
            <Col>
                <h1 className="text-center mt-5">Rendelések:</h1>
                <Container>
                    {rendelesek?.map((rend) => (
                        <OrderComponent order={rend} />
                    ))}
                </Container>
            </Col>
        </Container>
    );
};

export default Account;
