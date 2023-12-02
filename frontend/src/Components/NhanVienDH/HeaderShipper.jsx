import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";
import { toast } from "react-toastify";
import '../Admins/admin.css'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
function HeaderShipper(props) {
    const Navigate = useNavigate();
    // const curentAdmin = localStorage.shipper && JSON.parse(localStorage.shipper)
    const curentAdmin = localStorage["shipper"] ? JSON.parse(localStorage["shipper"]) : null
    const logout = async () => {
        localStorage.removeItem("shipper");
        await Navigate("/shipper");
    };

    return (
        <div>
            <Navbar bg="light" variant="dark" className='d-flex flex-row-reverse pt-3 mx-0 px-4'>
                <Dropdown >
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className='avt-admin px-4'>
                        <span className='fw-bold'>Hello! {curentAdmin.nv_hoten} </span>
                        <img src={"/image/Avt/" + curentAdmin.nv_avt} alt='...'></img>
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item>
                            <Link onClick={() => logout()} className='text-danger'>Log out   <Icon icon={faRightFromBracket} /></Link>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>
        </div >
    );
}

export default HeaderShipper;