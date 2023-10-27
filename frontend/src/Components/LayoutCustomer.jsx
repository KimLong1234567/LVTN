import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Customers/Footer';
import Header from './Customers/Header';
function LayoutCustomer(props) {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default LayoutCustomer;