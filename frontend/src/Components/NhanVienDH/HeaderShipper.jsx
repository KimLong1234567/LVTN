import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import '../Admins/admin.css'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
function HeaderShipper(props) {
    const Navigate = useNavigate();
    const curentAdmin = localStorage.shipper && JSON.parse(localStorage.shipper)
    useEffect(() => {
        if (!curentAdmin) {
            Navigate("/shipper")
        }
        // eslint-disable-next-line 
    },[]);
    const logout = async () => {
        await Navigate("/shipper");
        localStorage.removeItem("shipper");
    };
    return (
        <div>
            <Navbar bg="light" variant="dark" className='d-flex flex-row-reverse pt-3 mx-0 px-4'>
                <Dropdown >
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className='avt-admin px-4'>
                        <span className='fw-bold'>Hello! {curentAdmin.hoten} </span>
                        <img src={"/image/Avt/" + curentAdmin?.avt} alt='...'></img>
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item>
                            <Link onClick={()=>logout()} className='text-danger'>Đăng xuất    <Icon icon={faRightFromBracket} /></Link>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>
        </div>
    );
}

export default HeaderShipper;