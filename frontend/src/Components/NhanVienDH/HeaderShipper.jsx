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
    const [user, setUser] = useState([]);
    const userId = getCookie("userId");
    const [requested, setRequested] = useState(false);
    useEffect(() => {
        if (userId !== "") {
            axios
                .get(`http://localhost:5000/api/admins/${userId}`)
                .then((res) => {
                    setUser(res.data.data)
                    setRequested(true);  // Đã gọi request
                })
                .catch((error) => {
                    console.error("Error fetching cate: ", error);
                });

            console.log("User ID:", userId);
            console.log("User:", user);
        } else {
            toast.error('You not login yet', {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            setTimeout(
                function () {
                    // localStorage.setItem("kho", JSON.stringify({ ...res.data }))
                    Navigate("/admin/login")
                },
                3000
            );
            console.log("User is not logged in.");
        }
    }, [userId, requested]);
    const logout = async () => {
        await Navigate("/shipper");
        localStorage.removeItem("shipper");
    };
    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(";");

        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === " ") {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }

    return (
        <div>
            <Navbar bg="light" variant="dark" className='d-flex flex-row-reverse pt-3 mx-0 px-4'>
                <Dropdown >
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className='avt-admin px-4'>
                        <span className='fw-bold'>Hello! {user[0].nv_hoten} </span>
                        <img src={"/image/Avt/" + user[0].nv_avt} alt='...'></img>
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item>
                            <Link onClick={() => logout()} className='text-danger'>Đăng xuất    <Icon icon={faRightFromBracket} /></Link>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>
        </div >
    );
}

export default HeaderShipper;