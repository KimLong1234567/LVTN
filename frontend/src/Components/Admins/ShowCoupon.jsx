import { faPenToSquare, faPrint } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { Link } from 'react-router-dom';


function ShowCoupon(props) {
    const [showAllCoupon, setShowAllCoupon] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/api/pn/ctpn')
            .then((res) => {
                setShowAllCoupon(res.data.data)
            })
    }, [])
    return (
        <div className='boder-main'>
            <div>
                <h2 className="text-center fs-4 fw-bold text-primary">
                    ALL IMPORT COUPON
                </h2>
                <table className="table-export table table-bordered align-middle r" id="export-table">
                    <thead className="table-header table-secondary">
                        <tr>
                            <th scope="col-1">
                                NO
                            </th>
                            <th scope="col">PROVIDER</th>
                            <th scope="col">DATE OF ISSUE</th>
                            <th scope="col">SUM IN TOTAL </th>
                            <th scope="col" colSpan={2} >
                                TASK
                            </th>
                        </tr>
                    </thead>
                    {
                        showAllCoupon !== undefined && showAllCoupon.length !== 0 ?
                            showAllCoupon.map((item, i) => (
                                <tbody key={i}>
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{item.nv_hoten}</td>
                                        <td>{item.pn_create = new Date(item.pn_create).toLocaleString()}</td>
                                        <td>{item.pn_total}</td>
                                        <td>
                                            <Link to={`/admin/phieunhap-detail/${item.pn_id}`}>
                                                <Button variant='info'>
                                                    <Icon icon={faPenToSquare} className='text-white' />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            )) :
                            <tbody>
                                <tr>
                                    <td colSpan={5} className='h3 text-center text-danger ' >Chưa có phiếu nhập nào</td>
                                </tr>
                            </tbody>
                    }
                </table>
            </div>

        </div >
    );
}

export default ShowCoupon;