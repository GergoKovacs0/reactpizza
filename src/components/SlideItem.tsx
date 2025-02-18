import React, { forwardRef } from 'react';
import Pizza from '../types/Pizza';
import { Carousel } from 'react-bootstrap';

interface SlideItemProps {
    pizza: Pizza;
}

const SlideItem = forwardRef<HTMLDivElement, SlideItemProps>(({ pizza }, ref) => {
    return (
        <Carousel.Item ref={ref} style={{ minHeight: '400px' }}>
            <img src={`http://localhost:8021/api/kepek/${pizza.imageUrl}`} alt={pizza.nev} />
            <Carousel.Caption>
                <h3>{pizza.nev}</h3>
            </Carousel.Caption>
        </Carousel.Item>
    );
});

export default SlideItem;
