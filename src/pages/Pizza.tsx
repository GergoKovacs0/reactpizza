import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Image } from 'react-bootstrap';
import { useParams } from 'react-router';
import Pizza from '../types/Pizza';
import apiClient from '../services/apiClient';
import { Slide, toast } from 'react-toastify';
import { text } from 'stream/consumers';

const PizzaPage: React.FC = () => {
    const { id } = useParams();

    const [pizza, setPizza] = useState<Pizza>({} as Pizza);
    const [isLoaded, setIsLoaded] = useState(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [secretCode, setSecretCode] = useState<string>('');

    useEffect(() => {
        apiClient
            .get(`/pizzak/${id}`)
            .then((response) => {
                setPizza(response.data);
                setIsLoaded(true);
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

    const handleOrderSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const kosar = localStorage.getItem('kosar');
        if (!kosar) {
            localStorage.setItem('kosar', JSON.stringify([{ ...pizza, quantity }]));
            return;
        }

        try {
            const kosarArray = JSON.parse(kosar);
            if (Array.isArray(kosarArray) && kosarArray.some((item) => item.nev === pizza.nev)) {
                toast.info('Ez a pizza már a kosárban van!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Slide,
                });
            } else {
                kosarArray.push({ ...pizza, quantity });
                localStorage.setItem('kosar', JSON.stringify(kosarArray));
                toast.success('Pizza hozzáadva a kosárhoz!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Slide,
                });
            }
        } catch (error) {
            toast.error('Hiba történt a kosár ellenőrzése során!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Slide,
            });
        }
    };

    const handleUpdateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (secretCode !== 'balazslabszore') {
            return;
        }
        const result = apiClient.put(`/pizzak/${id}`, {
            nev: name,
            leiras: description,
            ar: price,
            imageUrl: pizza.imageUrl,
        });

        toast.promise(result, {
            pending: 'Firssítés folyamatban 🕒',
            success: 'Sikeres frissítés 🎉',
            error: 'Hiba történt a frissítés során 😔',
        });
    };

    return (
        <Container>
            {!isLoaded ? null : (
                <Container>
                    <h1>{pizza.nev}</h1>
                    <Row>
                        <Col style={{ maxWidth: '400px' }}>
                            <Image
                                src={`http://localhost:8021/api/kepek/${pizza.imageUrl}`}
                                alt={pizza.nev}
                                fluid
                            />
                        </Col>
                        <Col>
                            <p>{pizza.leiras}</p>
                            <Form onSubmit={handleOrderSubmit}>
                                <Form.Group>
                                    <Form.Label>Mennyiség</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Kosárba
                                </Button>
                            </Form>
                        </Col>
                        <Col>
                            <Form onSubmit={handleUpdateSubmit}>
                                <Form.Group>
                                    <Form.Label>Név</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Leírás</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Ár</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Titkod kód</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={secretCode}
                                        onChange={(e) => setSecretCode(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Frissítés
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            )}
        </Container>
    );
};

export default PizzaPage;
