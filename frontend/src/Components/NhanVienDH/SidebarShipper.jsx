import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import '../Admins/admin.css'
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
    faMoneyBill1Wave,
    faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import {
    faRectangleXmark,
} from "@fortawesome/free-regular-svg-icons";
function Sidebar(props) {
    const [user, setUser] = useState([]);
    const userId = getCookie("userId");
    const [requested, setRequested] = useState(false);
    const Navigate = useNavigate();

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
                    Navigate("/shipper")
                },
                3000
            );
            console.log("User is not logged in.");
        }
    }, [userId, requested]);
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
    // const curent = localStorage.shipper ? JSON.parse(localStorage.shipper) : null
    if (!requested || !user[0]) {
        return null;
    }
    console.log(user);
    return (
        <Col xs={3} className="pt-3 ps-3" style={{ background: "rgb(11,42,73)" }} >
            <Link to="/shipper/allorder">
                <img src='/image/Logo/3.jpg' alt='...' className='mb-4' style={{ borderRadius: "50%", width: "150px" }}></img>
            </Link>
            <div style={{ position: "sticky", top: 0 }} className='pt-3'>
                <div className='d-flex'>
                    <img src={`/image/Avt/${user[0].nv_avt}`} alt='...' className='mb-4' style={{ borderRadius: "50%", width: "50px" }} />
                    <div className='text-white text-start mx-2'>
                        <span className='h6'>Họ tên: {user[0].nv_hoten}</span>
                        <br></br>
                        <span > Tài khoản: {user[0].nv_email}</span>
                    </div>
                </div>
                <div>
                    <Link to={'/shipper/allorder'} className='name menuItem'><Icon icon={faMoneyBill1Wave} className='iconItem' /> Danh sách đơn hàng</Link>
                    <Link to={'/shipper/orderdelivered'} className='name menuItem'><Icon icon={faMoneyBillTransfer} className='iconItem' /> Đơn hàng cần giao</Link>
                    <Link to={'/shipper/status/success'} className='name menuItem'><Icon icon={faMoneyBill1Wave} className='iconItem' /> Đơn hàng đã giao</Link>
                    <Link to={'/shipper/orderdestroy'} className='name menuItem'><Icon icon={faRectangleXmark} className='iconItem' /> Đơn hàng giao không thành công</Link>
                </div>
            </div>
        </Col >
    );
}

export default Sidebar;