import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/Home';
import { BrowserRouter } from 'react-router-dom';

test('check if the page renders', async () => {
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>,
    );
    const carouselElement = await screen.findByTestId('container');
    expect(carouselElement).toBeInTheDocument();
});
