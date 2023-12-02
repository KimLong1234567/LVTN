import React from 'react';
import Header from './Admins/Header';
import { Outlet } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from './Admins/Sidebar';
function Layout(props) {
    class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false };
        }

        static getDerivedStateFromError(error) {
            return { hasError: true };
        }

        componentDidCatch(error, errorInfo) {
            logErrorToMyService(error, errorInfo);
        }

        render() {
            if (this.state.hasError) {
                return <h1>Something went wrong.</h1>;
            }

            return this.props.children;
        }
    }

    function logErrorToMyService(error, errorInfo) {
        // Thực hiện xử lý lỗi, ví dụ: gửi lỗi đến server
        console.error('Error logged to service:', error, errorInfo);
    }

    return (
        <div>
            <Container fluid className='customContainer'>
                <Row className='customRow' style={{ minHeight: '100vh' }}>
                    <Sidebar />
                    <Col xs={9}>
                        <ErrorBoundary>
                            <Header />
                        </ErrorBoundary>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Layout;