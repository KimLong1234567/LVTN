import React from 'react';
import Header from './Admins/Header';
import { Outlet } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from './Admins/Sidebar'; 
function Layout(props) {
    return (
        <div>
            <Container fluid className='customContainer'>
                <Row className='customRow' style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Col xs={9}>
                    <Header />
                    <Outlet />
                </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Layout;