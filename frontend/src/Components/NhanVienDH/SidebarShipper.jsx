import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import '../Admins/admin.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBill1Wave,
  faMoneyBillTransfer,
} from '@fortawesome/free-solid-svg-icons';
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
function Sidebar(props) {
  const curent = localStorage['shipper']
    ? JSON.parse(localStorage['shipper'])
    : null;
  // const curent = localStorage.shipper ? JSON.parse(localStorage.shipper) : null
  return (
    <Col xs={3} className="pt-3 ps-3" style={{ background: 'rgb(11,42,73)' }}>
      <Link to="/shipper/allorder">
        <img
          src="/image/Logo/3.jpg"
          alt="..."
          className="mb-4"
          style={{ borderRadius: '50%', width: '150px' }}
        ></img>
      </Link>
      <div style={{ position: 'sticky', top: 0 }} className="pt-3">
        <div className="d-flex">
          <img
            src={`/image/Avt/${curent.nv_avt}`}
            alt="..."
            className="mb-4"
            style={{ borderRadius: '50%', width: '50px' }}
          />
          <div className="text-white text-start mx-2">
            <span className="h6">Name: {curent.nv_hoten}</span>
            <br></br>
            <span> Email: {curent.nv_email}</span>
          </div>
        </div>
        <div>
          <Link to={'/shipper/allorder'} className="name menuItem">
            <Icon icon={faMoneyBill1Wave} className="iconItem" /> An order list
          </Link>
          {/* <Link to={'/shipper/orderdelivered'} className='name menuItem'><Icon icon={faMoneyBillTransfer} className='iconItem' /> Đơn hàng cần giao</Link> */}
          <Link to={'/shipper/status/success'} className="name menuItem">
            <Icon icon={faMoneyBill1Wave} className="iconItem" /> Orders
            fulfilled
          </Link>
          <Link to={'/shipper/orderdestroy'} className="name menuItem">
            <Icon icon={faRectangleXmark} className="iconItem" /> Orders were
            not delivered.
          </Link>
        </div>
      </div>
    </Col>
  );
}

export default Sidebar;
