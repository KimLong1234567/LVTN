import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import '../Admins/admin.css'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
    faMoneyBill1Wave,
    faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import {
    faRectangleXmark,
} from "@fortawesome/free-regular-svg-icons";
function Sidebar(props) {
    const curent = localStorage.shipper ? JSON.parse(localStorage.shipper) : null
    return (
        <Col xs={3} className="pt-3 ps-3" style={{ background: "rgb(11,42,73)"}} >
            <Link to="/shipper/allorder">
                <img src='/image/Logo/logo.png' alt='...' className='mb-4' style={{ borderRadius: "50%", width: "150px" }}></img>
            </Link>
            <div style={{ position: "sticky", top: 0 }} className='pt-3'>
                <div className='d-flex'>
                    <img src={`/image/Avt/${curent.avt}`} alt='...' className='mb-4' style={{ borderRadius: "50%", width: "50px" }} />
                    <div className='text-white text-start mx-2'>
                        <span className='h6'>Họ tên: {curent.hoten}</span>
                        <br></br>
                        <span > Tài khoản: {curent.email}</span>
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