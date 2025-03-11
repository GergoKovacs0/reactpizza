import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pizzak from './pages/Pizzak';
import Pizza from './pages/Pizza';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation';

import { Slide, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import Kosar from './pages/Kosar';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <>
        <ToastContainer
            position="top-right"
            autoClose={false}
            limit={1}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="colored"
            transition={Slide}
        />
        <Navigation />
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/pizzak" element={<Pizzak />} />
                    <Route path="/pizza/:id" element={<Pizza />} />
                    <Route path="/kosar" element={<Kosar />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
