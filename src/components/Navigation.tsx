import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const Navigation: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Nyusziful Pizzazó</Navbar.Brand>

                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/pizzak">Pizzák</Nav.Link>
                    <Nav.Link href="/kosar">
                        <FaShoppingCart />
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navigation;
