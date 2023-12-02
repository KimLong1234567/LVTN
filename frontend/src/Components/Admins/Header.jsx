import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import '../Admins/admin.css'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
function Header(props) {
    const Navigate = useNavigate();
    // const curentAdmin = localStorage.admin ? JSON.parse(localStorage.admin) : null
    const curentAdmin = localStorage["admin"] ? JSON.parse(localStorage["admin"]) : null
    // console.log(curentAdmin);
    const [adminCheck, setAdminCheck] = useState(curentAdmin);
    useEffect(() => {
        console.log("useEffect is running");
        if (!adminCheck) {
            console.log('da vao')
            Navigate("/admin/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },);
    const logout = async () => {
        await localStorage.removeItem("admin");
        setAdminCheck(null); // Set biến trung gian thành null khi logout
        Navigate("/admin/login");

    };
    return (
        <div>
            <Navbar style={{ background: "rgb(231,221,255)" }} variant="dark" className='d-flex flex-row-reverse pt-3 mx-0 px-4'>
                <Dropdown >
                    <Dropdown.Toggle variant='none' id="dropdown-basic" className='avt-admin px-4'>
                        <span className='fw-bold'>Hello {curentAdmin.nv_hoten}</span>
                        <img src={"/image/Avt/" + curentAdmin.nv_avt} alt='...' className='mx-1' ></img>
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item>
                            <Link to={'/admin/myinfo'} className='text-danger'>Info    <Icon icon={faCircleInfo} /></Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link onClick={() => logout()} className='text-danger'>Logout    <Icon icon={faRightFromBracket} /></Link>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>
        </div>
    );
}

export default Header;