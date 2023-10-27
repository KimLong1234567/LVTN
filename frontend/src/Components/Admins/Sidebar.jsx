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
    { icon: faChartLine, name: 'Tổng Quan', to: '/admin' },
    {
        icon: faCalendarDays, name: 'Thống Kê ', children: [
            { icon: faClockRotateLeft, name: 'Lợi nhuận theo thời gian', to: '/admin/profitovertime' },
            { icon: faProductHunt, name: 'Lợi nhuận theo sản phẩm', to: '/admin/profitbyproduct' },
        ]
    },
    {
        icon: faBarsStaggered, name: 'Quản Lý Danh Mục', children: [
            { icon: faCaretRight, name: 'Loại sản phẩm', to: '/admin/category' },
        ]
    },
    {
        icon: faBookBookmark, name: 'Quản Lý Sản Phẩm', children: [
            { icon: faPaw, name: 'Sản phẩm', to: '/admin/product' },
            { icon: faCommentDots, name: 'Bình luận', to: '/admin/comment' },
        ]
    },
    {
        icon: faCartFlatbed, name: 'Quản Lý Đơn Hàng', isAdmin: true, children: [
            { icon: faCartPlus, name: 'Đơn đặt hàng', to: '/admin/order' },
            { icon: faBookJournalWhills, name: 'Hóa đơn', to: '/admin/bill' },
        ]
    },
    {
        icon: faPaw, name: 'Pet Manage', children: [
            { icon: faPaw, name: 'View Pet', to: '/admin/viewpet' },
        ]
    },
    {
        icon: faCircleUser, name: 'Quản Lý Tài Khoản', children: [
            { icon: faUsers, name: 'Tài khoản nhân viên', to: '/admin/employee' },
            { icon: faUserTag, name: 'Tài khoản khách hàng', to: '/admin/customer' }
        ]
    },
    {
        icon: faMessage, name: 'Chăm Sóc Khách Hàng', children: [
            { icon: faCaretRight, name: 'Phản hồi khách hàng', to: '/admin/feedbacks' },
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
                    Navigate("/admin/login")
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
    const [clicked, setClicked] = useState(null)
    const toggleExpand = (index) => {
        if (clicked === index) {
            return setClicked(null)
        }
        setClicked(index)
    }

    // Nếu chưa request hoặc chưa có dữ liệu, không hiển thị component
    if (!requested || !user[0]) {
        return null;
    }
    return (
        <Col xs={3} className="pt-3" style={{ background: "rgb(11,42,73)" }} >
            <div style={{ position: "sticky", top: 0 }} className='pt-3'>
                <Link to="/admin">
                    <img src='/image/Logo/3.jpg' alt='...' className='mb-4' style={{ borderRadius: "50%", width: "150px" }}></img>
                </Link>
                <div className='mx-3'>
                    <div className='d-flex'>
                        {/* su dung user[0] vi nhan data tu backend dang [0,[]]    */}
                        <img src={`/image/Avt/${user[0].nv_avt}`} alt='...' className='mb-4' style={{ borderRadius: "50%", width: "50px" }} />
                        <div className='text-white text-start mx-2'>
                            <span className='h6'>Họ tên: {user[0].nv_hoten}</span>
                            <br></br>
                            <span > Tài khoản:{user[0].nv_email} </span>
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