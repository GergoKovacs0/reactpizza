import React, { useEffect, useState } from 'react';
import Pizza from '../types/Pizza';
import apiClient from '../services/apiClient';
import PizzaCard from '../components/PizzaCard';
import { Container, Row } from 'react-bootstrap';
import { Slide, toast } from 'react-toastify';

const Pizzak: React.FC = () => {
    const [pizzak, setPizzak] = useState<Pizza[]>([] as Pizza[]);
    const [alert, setAlert] = useState({ type: '', message: '' });
    useEffect(() => {
        apiClient
            .get('/pizzak')
            .then((response) => {
                setPizzak(response.data);
            })
            .catch((error) => {
                toast.error(
                    'Hiba lépett fel az oldal betöltése sorá kérlek próbálja újra később!',
                    {
                        position: 'top-right',
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                        transition: Slide,
                    },
                );
            });
    }, []);

    return (
        <>
            <Container className="mt-4">
                <Row className="g-4 justify-content-around">
                    {pizzak.map((pizza) => (
                        <PizzaCard key={pizza.id} pizza={pizza} />
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Pizzak;
