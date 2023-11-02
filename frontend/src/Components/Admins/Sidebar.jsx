import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import '../Admins/admin.css'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
    faChartLine,
    faBarsStaggered,
    faBookBookmark,
    faCartFlatbed,
    faCaretRight,
    faChevronDown,
    faCalendarDays,
    faClockRotateLeft,
    faCommentDots,
    faPaw,
    faCartPlus,
    faBookJournalWhills,
    faUsers,
    faUserTag,
    faMessage,
    faCircleUser,
    faFileContract,
    faCircleInfo,
    faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
    faProductHunt
} from "@fortawesome/free-brands-svg-icons"
const ADMIN_SIDEBAR = [
    { icon: faChartLine, name: 'Overview', to: '/admin' },
    {
        icon: faCalendarDays, name: 'Statistical', children: [
            { icon: faClockRotateLeft, name: 'Profit over time', to: '/admin/profitovertime' },
            { icon: faProductHunt, name: 'Profit by product', to: '/admin/profitbyproduct' },
        ]
    },
    {
        icon: faBarsStaggered, name: 'Category Management', children: [
            { icon: faCaretRight, name: 'Product type', to: '/admin/category' },
        ]
    },
    {
        icon: faBookBookmark, name: 'Product Management', children: [
            { icon: faPaw, name: 'Products', to: '/admin/product' },
            { icon: faCommentDots, name: 'Comment', to: '/admin/comment' },
        ]
    },
    {
        icon: faCartFlatbed, name: 'Order Management', isAdmin: true, children: [
            { icon: faCartPlus, name: 'Orders', to: '/admin/order' },
            { icon: faBookJournalWhills, name: 'Bill', to: '/admin/bill' },
        ]
    },
    {
        icon: faPaw, name: 'Pet Manage', children: [
            { icon: faPaw, name: 'View Pet', to: '/admin/viewpet' },
        ]
    },
    {
        icon: faCircleUser, name: 'Account Management', children: [
            { icon: faUsers, name: 'Employee Accounts', to: '/admin/employee' },
            { icon: faUserTag, name: 'Customer Account', to: '/admin/customer' }
        ]
    },
    {
        icon: faMessage, name: 'Customer Care', children: [
            { icon: faCaretRight, name: 'Customer Feedback', to: '/admin/feedbacks' },
        ]
    },
    {
        icon: faFileContract, name: 'Quản Lý Phiếu Nhập Hàng', children: [
            { icon: faCircleInfo, name: 'Thông tin phiếu nhập hàng', to: '/admin/phieunhap' },
            { icon: faCalendarPlus, name: 'Tạo mới phiếu nhập', to: '/admin/themphieunhap' },
        ]
    },

]

function Sidebar(props) {
    const [clicked, setClicked] = useState(null)
    const curentAdmin = localStorage["admin"] ? JSON.parse(localStorage["admin"]) : null
    const toggleExpand = (index) => {
        if (clicked === index) {
            return setClicked(null)
        }
        setClicked(index)
    }

    return (
        <Col xs={3} className="pt-3" style={{ background: "rgb(11,42,73)" }} >
            <div style={{ position: "sticky", top: 0 }} className='pt-3'>
                <Link to="/admin">
                    <img src='/image/Logo/3.jpg' alt='...' className='mb-4' style={{ borderRadius: "50%", width: "150px" }}></img>
                </Link>
                <div className='mx-3'>
                    <div className='d-flex'>
                        {/* su dung curentAdmin vi nhan data tu backend dang [0,[]]    */}
                        <img src={`/image/Avt/${curentAdmin.nv_avt}`} alt='...' className='mb-4' style={{ borderRadius: "50%", width: "50px" }} />
                        <div className='text-white text-start mx-2'>
                            <span className='h6'>Name: {curentAdmin.nv_hoten}</span>
                            <br></br>
                            <span>User:{curentAdmin.nv_email} </span>
                        </div>
                    </div>
                    {
                        ADMIN_SIDEBAR.map((item, index) => {
                            return (
                                <div key={index} className='item'>
                                    <div className='header'
                                        aria-expanded={(clicked === index) ? 'true' : 'false'}
                                    >
                                        <Link to={item.to} className='name menuItem'>
                                            <Icon icon={item.icon} className='iconItem' />
                                            <span>{item.name}</span>
                                        </Link>
                                        {(item.children != null) && (
                                            <button
                                                className='btnExpand'
                                                onClick={() => toggleExpand(index)}
                                            >
                                                <Icon icon={faChevronDown} />
                                            </button>
                                        )}
                                    </div>
                                    <div className='body'>
                                        {item.children != null && item.children.map((childItem, idx) => (
                                            <Link to={childItem.to} key={idx} className='menuItem'>
                                                <Icon icon={childItem.icon} className='iconItem' />
                                                <span>{childItem.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Col >
    );
}

export default Sidebar;