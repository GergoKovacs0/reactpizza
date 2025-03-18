import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container, Col } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';
import { VscAccount } from 'react-icons/vsc';

const Navigation: React.FC = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        const password = sessionStorage.getItem('password');
        if (username && password) {
            setLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        setLoggedIn(false);
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Nyusziful Pizzazó</Navbar.Brand>

                <Nav className="me-auto d-flex justify-content-between" style={{ width: '100%' }}>
                    <Col className="d-flex">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/pizzak">Pizzák</Nav.Link>
                    </Col>
                    {isLoggedIn ? (
                        <>
                            <Nav.Link href="/kosar">
                                <FaShoppingCart />
                            </Nav.Link>
                            <Nav.Link onClick={handleLogout}>
                                <MdOutlineLogout />
                            </Nav.Link>
                            <Nav.Link href="/felhasználó">
                                <VscAccount />
                            </Nav.Link>
                        </>
                    ) : (
                        <Nav.Link href="/login">Bejelentkezés</Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navigation;
