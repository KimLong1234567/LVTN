import React, { useEffect, useState } from 'react';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import * as XLSX from 'xlsx';

function DetailCoupon(props) {
    var { id } = useParams()
    const [coupon, setCoupon] = useState({})
    useEffect(() => {
        if (id != null) {
            axios.get(`http://localhost:5000/api/pn/ctpn/${id}`)
                .then((res) => {
                    const data = res.data.data; // Lấy dữ liệu từ API

                    const products = [];
                    const couponInfo = {};

                    if (Array.isArray(data)) {
                        data.forEach(item => {
                            products.push({
                                sp_code: item.sp_code,
                                sp_name: item.sp_name,
                                ctpn_sl: item.ctpn_sl,
                                ctpn_gianhap: item.ctpn_gianhap,
                                sp_image: item.sp_image,
                                sp_price: item.sp_price,
                            });

                            if (Object.keys(couponInfo).length === 0) {
                                couponInfo.pn_id = item.pn_id;
                                couponInfo.pn_total = item.pn_total;
                                couponInfo.nv_id = item.nv_id;
                                couponInfo.nv_hoten = item.nv_hoten;
                                couponInfo.nv_phone = item.nv_phone;
                                couponInfo.nv_email = item.nv_email;
                                couponInfo.pn_create = item.pn_create;
                            }
                        });

                        setCoupon({ products, ...couponInfo });
                    }
                });
        }
    }, [id]);
    console.log(coupon);
    const exportToExcel = () => {
        if (coupon && coupon.products) {
            // Loại bỏ trường sp_image
            const productsWithoutImages = coupon.products.map(product => {
                const { sp_image, ...rest } = product;
                return rest;
            });

            const ws = XLSX.utils.json_to_sheet(productsWithoutImages);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Products');

            XLSX.writeFile(wb, 'detail_coupon.xlsx');
        }
    };
    return (
        <div className='boder-main'>
            <div className='mx-2'>
                <h2 className="text-center fs-4 fw-bold py-3 ">
                    DETAILS COUPON
                </h2>
                <Row>
                    <Col md={4}>
                        <p className='fw-bold'>No: <span className='text-danger '>{coupon?.pn_id}</span></p>
                    </Col>
                    <Col md={4}>
                        {
                            coupon.pn_create !== undefined ?
                                <p className='fw-bold'>Time create: <span className='text-primary'>{new Date(coupon.pn_create).toLocaleString()}</span></p>
                                : null
                        }
                    </Col>
                    <Col md="4" className='text-end '>
                        <Button variant='success' onClick={exportToExcel}>
                            <Icon icon={faPrint} />Export to Excel
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <p className='fw-bold'>Staff: <span className='text-primary'>{coupon?.nv_hoten}</span></p>
                    </Col>
                    <Col md={2}>
                        <p className='fw-bold'>Staff code: <span className='text-primary'>{coupon?.nv_id}</span></p>
                    </Col>
                    <Col md={3}>
                        <p className='fw-bold'>Staff's Phone: <span className='text-primary'>{coupon?.nv_phone}</span></p>
                    </Col>
                    <Col md={4}>
                        <p className='fw-bold'>Email: <span className='text-primary'>{coupon?.nv_email}</span></p>
                    </Col>

                </Row>
                <table className="table-export table table-bordered align-middle">
                    <thead className='table-secondary'>
                        <tr>
                            <th scope="col" className="col-1">
                                No
                            </th>
                            <th scope="col">NAME PRODUCT</th>
                            <th>IMAGE</th>
                            <th>PRICE</th>
                            <th>IMPORT PRICE</th>
                            <th>NUMBER</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coupon !== undefined && coupon.products !== undefined ?
                                coupon.products.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.sp_name}</td>
                                        <td>
                                            <img src={`/image/SanPham/${item.sp_image}`} alt='...' style={{ width: "150px" }} />
                                        </td>
                                        <td>{item.sp_price}</td>
                                        <td>{item.ctpn_gianhap}</td>
                                        <td>{item.ctpn_sl}</td>
                                        <td>{item.ctpn_gianhap * item.ctpn_sl}</td>
                                    </tr>
                                )) : null
                        }
                    </tbody>
                    <tfoot>
                        <tr className='table-secondary'>
                            <td colSpan="5" className="text-start h5 fw-bold">SUM:  </td>
                            <td colSpan="4" className="text-end h5 fw-bold"> {coupon?.pn_total} $</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div >
    );
}

export default DetailCoupon;