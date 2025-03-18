import React, { useState } from 'react';
import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [formError, setFormError] = useState({
        usernameError: '',
        passwordError: '',
        loginError: '',
    });

    const setError = (name: string, value: string) => {
        setFormError((prev) => {
            const newFormError = { ...prev, [name]: value };
            console.log(newFormError);
            return newFormError;
        });
    };
    const validateField = (name: string, value: string) => {
        let error = '';
        switch (name) {
            case 'username':
                if (!value.trim()) error = 'A felhasználónév kötelező!';
                else if (value.length < 3)
                    error = 'A felhasználónévnek minimum 3 karakternek kell lennie!';
                break;
            case 'password':
                if (!value) error = 'A jelszó kötelező!';
                else if (value.length < 5) error = 'A jelszónak minimum 5 karakternek kell lennie!';
                break;
            default:
                break;
        }
        return error;
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            const usernameError = validateField('username', username);
            const passwordError = validateField('password', password);
            setError('usernameError', usernameError);
            setError('passwordError', passwordError);

            if (usernameError || passwordError) {
                return;
            }

            const response = await apiClient.post('/login', {
                username,
                password,
            });

            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
            navigate('/');
        } catch (error: any) {
            console.error(error.status);
            if (error.status === 401) {
                setError('loginError', 'Rossz felhasználó név vagy jelszó!');
                console.log('Rossz felhasználó név vagy jelszó!');
                return;
            }
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
        >
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <h1 className="text-center mb-4">Bejelentkezés</h1>
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Felhasználó név:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Felhasználó név"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        isInvalid={!!formError.usernameError}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formError.usernameError}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className="mt-3">
                                    <Form.Label>Jelszó:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Jelszó"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={!!formError.passwordError}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formError.passwordError}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        hidden
                                        isInvalid={!!formError.loginError}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formError.loginError}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 mt-4">
                                    Bejelentkezés
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
