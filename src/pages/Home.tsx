import React, { useEffect, useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import Pizza from '../types/Pizza';
import apiClient from '../services/apiClient';
import SlideItem from '../components/SlideItem';
import '../styles/CarouselCustom.css'; // Import the custom CSS file
import { Slide, toast } from 'react-toastify';
import errorToast from '../components/toasts/LoadingErrorToast';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [pizzak, setPizzak] = useState<Pizza[]>([] as Pizza[]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        apiClient
            .get('/pizzak')
            .then((response) => {
                setPizzak(response.data);
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
                console.error(error);
                setIsLoaded(false);
            });
    }, []);

    return (
        <Container data-testid="container">
            {isLoaded ? (
                <Carousel data-bs-theme="dark" data-testid="carousel">
                    {pizzak.map((pizza) => (
                        // <SlideItem pizza={pizza} key={pizza.id} />
                        <Carousel.Item style={{ minHeight: '400px' }}>
                            <img
                                src={`http://localhost:8021/api/kepek/${pizza.imageUrl}`}
                                alt={pizza.nev}
                            />
                            <Carousel.Caption>
                                <h3>{pizza.nev}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <>Loading</>
            )}
        </Container>
    );
};

export default Home;
