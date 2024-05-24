import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Header.css"
function Header(props) {
    const Navigate = useNavigate()
    // const curentAccount = localStorage.currentAccount ? JSON.parse(localStorage.currentAccount) : null
    const curentAccount = localStorage["currentAccount"] ? JSON.parse(localStorage["currentAccount"]) : null
    const logout = () => {
        localStorage.removeItem("currentAccount");
        Navigate("/login");
    };
    return (
        <div className='header-navbar'>
            <Nav fill variant="tabs" defaultActiveKey="/" className='align-items-center'>
                <Nav.Item>
                    <Nav.Link eventKey="link-0" as={NavLink} to={'/'} className='logo-header'>
                        <img src='/image/Logo/3.jpg' alt='...' />
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" as={NavLink} to={'/'}>Main</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" as={NavLink} to={'/products'}>Products</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" as={NavLink} to={'/contact'}>contacts </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <NavDropdown title="About us" menuVariant="dark">
                        <NavDropdown.Item as={NavLink} to={'/blog'}>blog</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to={'/abouts'}> about us</NavDropdown.Item>
                    </NavDropdown>
                </Nav.Item>
                {
                    curentAccount !== null ?
                        <Nav.Item>
                            <NavDropdown title={`Hi, ${curentAccount.user_name}`} menuVariant="dark">
                                <NavDropdown.Item as={NavLink} to={'/bill'}>Bill</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={'/view/pet'}>Pet</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={'/book/pet'}>Book pet</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={'/cart'}> Cart</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={'/myinfo'}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>

                        :
                        <Nav.Item>
                            <Nav.Link eventKey="link-4" as={NavLink} to={'/login'}>Login </Nav.Link>
                        </Nav.Item>
                }
            </Nav>
        </div>

    );
}

export default Header;