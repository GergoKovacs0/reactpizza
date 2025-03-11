import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const token = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    return token && password ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
