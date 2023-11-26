import React, { useLayoutEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faFilter, faPrint } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { Link } from "react-router-dom"
import ReactPaginate from 'react-paginate';
function Bills(props) {
    const [show, setShow] = useState('')
    const [bill, setBill] = useState([])
    const [filterBill, setFilterBill] = useState([])
    useLayoutEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://localhost:5000/api/dh/dhang/success')
            setBill(res.data.data)
            setFilterBill(res.data.data)
        }
        fetchData()
    }, [])
    function filter(text) {
        setShow(text)
        const temp = filterBill
        setBill(temp)
    }
    const onChange = (e) => {
        const temp = filterBill.filter(element => element.user_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setBill(temp)
    }


    //pagination
    const [start, setStart] = useState(0)
    const end = start + 2;
    const dataPage = bill.slice(start, end);
    const pageCount = Math.ceil(bill.length / 2);
    const handlePageClick = (event) => {
        const number = (event.selected * 2) % bill.length;
        setStart(number);
    };

    return (
        <div className='boder-main'>
            <h2 className='text-uppercase text-center text-primary fw-bolder mt-2'>Bill List</h2>
            <h3 className='text-uppercase text-start text-success fw-bolder mx-2'>filter <Icon icon={faFilter} /></h3>
            <Row className='m-3'>
                <Col xs={12} md={4}>
                    <h4 style={{ color: 'tomato', fontWeight: "bolder" }}>All bill <input type='checkbox' onChange={() => { filter('') }} checked={show === ''} /> </h4>
                </Col>
                <Col xs={12} md={8}>
                    <div className='d-flex mb-2'>
                        <input type="text"
                            className="form-control w-50 "
                            placeholder="Type customer name"
                            onChange={onChange}
                        />
                    </div>
                </Col>
            </Row>
            <div style={{ width: '100%' }}>
                <div style={{ overflowX: "scroll", whiteSpace: "nowrap" }}  >
                    <table className="table table-bordered">
                        <thead>
                            <tr className="table-secondary text-center">
                                <th scope="col">No</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Image</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Customer Phone</th>
                                <th scope="col">Pay</th>
                                <th scope="col">Order Status</th>
                                <th scope="col">Date Order</th>
                                <th scope="col">Date Deliver </th>
                                <th scope="col">Employee</th>
                                <th scope="col">Employee Phone</th>
                                <th scope="col">Move</th>
                            </tr>
                        </thead>
                        {
                            bill !== undefined && bill.length !== 0 ?
                                <tbody>
                                    {
                                        dataPage.reverse().map((value, idx) => {
                                            return [
                                                value.ctdh.map((item, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{item.sp_name}</td>
                                                            <td>
                                                                <img src={`/image/SanPham/${item.sp_image}`} style={{ width: "100px" }} alt='...' />
                                                            </td>
                                                            <td>{item.ctdh_sl}</td>
                                                            <td>{item.ctdh_price}</td>
                                                            <td>{value.user_name !== undefined ? value.user_name : value.user_name}</td>
                                                            <td>{value.dh_address !== undefined ? value.dh_address : value.customer.dh_address}</td>
                                                            <td>{value.user_phone !== undefined ? value.user_phone : value.customer.user_phone}</td>
                                                            <td>{value.dh_pay}</td>
                                                            <td className='text-success fw-bold'>Done</td>
                                                            <td>{value.dh_create = new Date(value.dh_create).toLocaleString()}</td>
                                                            <td>{value.dh_update = new Date(value.dh_update).toLocaleString()}</td>
                                                            <td>{value.nv_hoten !== undefined ? value.nv_hoten : "Hiện chưa có người giao"}</td>
                                                            <td>{value.nv_phone !== undefined ? '' + value.nv_phone : "Trống"}</td>
                                                            <td></td>
                                                        </tr>
                                                    )
                                                }),
                                                <tr key={idx} className='table-secondary'>
                                                    <td colSpan={3} className='fw-bolder text-uppercase text-end'>Sum quantity:</td>
                                                    <td colSpan={1} className='fw-bolder text-uppercase text-center'>{value.dh_sl}</td>
                                                    <td colSpan={8} className='fw-bolder text-uppercase text-start'>Sum</td>
                                                    <td className='fw-bolder text-primary text-end' colSpan={2}>{new Intl.NumberFormat('vi').format(value.dh_total)} $</td>
                                                    <td colSpan={1}> <button className='btn btn-success'><Link className='text-white' to={`/admin/export/${value.dh_id}`}><Icon icon={faPrint} /></Link></button></td>
                                                </tr>
                                            ]
                                        })
                                    }
                                </tbody> : <tbody>
                                    <tr className='text-center fw-bolder text-danger h3'><td colSpan={15}>As of right now, no orders exist.</td></tr>
                                </tbody>
                        }
                    </table>
                    <ReactPaginate
                        previousLabel="previous page"
                        nextLabel="next page"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={pageCount}
                        pageRangeDisplayed={4}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName="pagination justify-content-center mt-5"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        hrefAllControls
                    // forcePage={currentPage}

                    />
                </div>
            </div>
        </div>
    );
}

export default Bills;