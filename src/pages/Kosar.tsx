import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import Pizza from '../types/Pizza';
import PizzaCard from '../components/PizzaCard';

const CartPage = () => {
    // Sample cart state
    const [cart, setCart] = useState<Array<Pizza & { quantity: number }>>([]);

    useEffect(() => {
        const kosar = JSON.parse(localStorage.getItem('kosar') || '[]');
        console.log(kosar);
        setCart(kosar);
    }, []);

    // Function to remove item from cart
    const removeFromCart = (id: number) => {
        setCart(cart?.filter((item) => item.id !== id));
    };

    // Function to calculate total price
    const getTotalPrice = () => {
        return cart?.reduce((total, item) => total + item.ar * item.quantity, 0);
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">
                {' '}
                <FaShoppingCart className="me-5" />
                Kosár
            </h2>

            {cart?.length === 0 ? (
                <Alert variant="info">A kosarad jelenleg üres!</Alert>
            ) : (
                <>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Pizza</th>
                                <th>Ár (Ft)</th>
                                <th>Mennyiség</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart?.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.nev}</td>
                                    <td>{item.ar} Ft</td>
                                    <td>{item.quantity}</td>
                                    <td className="d-flex justify-content-center">
                                        <Button
                                            variant="danger"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <MdDelete />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h4 className="mt-3">Total: {getTotalPrice()} Ft</h4>
                    <Button variant="primary" className="mt-3" disabled={cart?.length === 0}>
                        Fizetés most
                    </Button>
                </>
            )}
        </Container>
    );
};

export default CartPage;
