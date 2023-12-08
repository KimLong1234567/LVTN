import React, { useLayoutEffect, useState } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faCircleXmark, faFilter, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
function Oder(props) {
    const [show, setShow] = useState('')
    const [bill, setBill] = useState([])
    const [filterBill, setFilterBill] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [listAccount, setListAccount] = useState([])
    const [showListAccount, setShowListAccount] = useState(false)
    // const curentAccount = localStorage.admin ? JSON.parse(localStorage.admin) : null
    const curentAccount = localStorage["admin"] ? JSON.parse(localStorage["admin"]) : null

    useLayoutEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:5000/api/dh/dhang/all')
                .then((res) => {
                    const temp = res.data.data.filter((e) => (e.status !== 2))
                    setBill(temp) //.reverse()
                    setFilterBill(temp)
                })
            await axios.get('http://localhost:5000/api/admins/')
                .then((res) => {
                    setListAccount(res.data.data)
                })
        }
        fetchData()
    }, [refresh])
    // console.log(filterBill);
    function filter(Number) {
        setShow(Number)
        console.log(Number);
        var temp = []
        if (Number === 0) {
            temp = filterBill.filter(element => element.dh_status === 0)
            console.log(temp);
        }
        else if (Number) {
            temp = filterBill.filter(element => element.dh_status === Number)
            console.log(temp);
        }
        else {
            temp = filterBill
        }
        setBill(temp)
    }
    const onChange = (e) => {
        const temp = filterBill.filter(element => element.user_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setBill(temp)
    }
    function renderButton(status, id) {
        if (status === 2) {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' disabled >
                            <Icon icon={faCheckDouble} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' disabled>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-warning' disabled >
                            <Icon icon={faUserPlus} />
                        </button>
                    </td>
                </>
            )
        }
        else if (status === 3) {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' disabled>
                            <Icon icon={faCheckDouble} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' disabled>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-warning' disabled>
                            <Icon icon={faUserPlus} />
                        </button>
                    </td>
                </>
            )
        }
        else if (status === 0) {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' onClick={() => updateStatus(id, 1, curentAccount.nv_id)}>
                            <Icon icon={faCheckDouble} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' onClick={() => updateStatus(id, 3, curentAccount.nv_id)}>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-info' onClick={() => setShowListAccount(id)}>
                            <Icon icon={faUserPlus} />
                        </button>
                    </td>
                </>
            )
        }
        else if (status === 1) {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' onClick={() => updateStatus(id, 2)}>
                            <Icon icon={faCheckDouble} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' onClick={() => updateStatusOrder(id, 3)}>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-warning' disabled>
                            <Icon icon={faUserPlus} />
                        </button>
                    </td>
                </>
            )
        }
    }
    async function updateStatus(id, status, idAccount) {
        await axios.put(`http://localhost:5000/api/dh/${id}`, {
            dh_id: id,
            dh_status: status,
            nv_id: idAccount
        })
            .then((res) => {
                toast.info('Update success', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setTimeout(
                    function () {
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
    }
    async function updateStatusOrder(id, status, idAccount) {
        await axios.delete(`http://localhost:5000/api/dh/${id}`, {
            dh_id: id,
            dh_status: status,
            nv_id: idAccount
        })
            .then((res) => {
                toast.info('Update success', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setTimeout(
                    function () {
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
    }
    function renderStatus(status) {
        if (status === 2) {
            return (
                <td className='text-success fw-bold'>Has received</td>
            )
        }
        else if (status === 3) {
            return (

                <td className='text-danger fw-bold'>Deleted</td>

            )
        }
        else if (status === 0) {
            return (

                <td className='text-warning fw-bold'>Wait</td>

            )
        }
        else {
            return (
                <td className='text-primary fw-bold'>On Shipping</td>
            )
        }
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
            <ToastContainer />
            <h2 className='text-uppercase text-center text-primary fw-bolder mt-2'>Order Management</h2>
            <h3 className='text-uppercase text-start text-success fw-bolder mx-2'>filter <Icon icon={faFilter} /></h3>
            <Row className='m-0'>
                <Col xs={12} md={2}>
                    <h4 style={{ color: 'tomato', fontWeight: "bolder" }}>All Orders <input type='checkbox' onChange={() => { filter('') }} checked={show === ''} /> </h4>
                </Col>
                <Col xs={12} md={3}>
                    <h4 className='text-warning'>Wait <input type='checkbox' onChange={() => { filter(0) }} checked={show === 0} /> </h4>
                </Col>
                <Col xs={12} md={2}>
                    <h4 className='text-primary'>On Shipping <input type='checkbox' onChange={() => { filter(1) }} checked={show === 1} /> </h4>
                </Col>
                <Col xs={12} md={3}>
                    <h4 className='text-success'>Has received <input type='checkbox' onChange={() => { filter(2) }} checked={show === 2} /> </h4>
                </Col>
                <Col xs={12} md={2}>
                    <h4 className='text-danger'>Delete <input type='checkbox' onChange={() => { filter(3) }} checked={show === 3} /> </h4>
                </Col>
                <Col>
                    <div className='d-flex m-3 justify-content-center'>
                        <input type="text"
                            className="form-control w-50 "
                            placeholder="Type customer"
                            onChange={onChange}
                        />
                    </div>
                </Col>
            </Row>
            <div style={{ width: "100%" }}>
                <div style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>
                    <table className="table table-bordered">
                        <thead>
                            <tr className="table-secondary text-center">
                                <th scope="col">No</th>
                                <th scope="col">Name Product</th>
                                <th scope="col">Image</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Customer Phone</th>
                                <th scope="col">Pay</th>
                                <th scope="col">Status Order</th>
                                <th scope="col">Date Oder</th>
                                <th scope="col">Reception Staff</th>
                                <th scope="col">Staff's Phone</th>
                                <th scope='col'>Status</th>
                                <th scope="col" colSpan={3}>MOVE</th>
                            </tr>
                        </thead>
                        {
                            bill !== undefined && bill.length !== 0 ?
                                <tbody>
                                    {
                                        dataPage.map((value, idx) => {
                                            return [
                                                value.ctdh.map((item, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{item.sp_name}</td>
                                                            {/* <td>{value.dh_id}</td> */}
                                                            <td>
                                                                <img src={`/image/SanPham/${item.sp_image}`} style={{ width: "100px" }} alt='...' />
                                                            </td>
                                                            <td>{item.ctdh_sl}</td>
                                                            <td>{item.ctdh_price}</td>
                                                            <td>{value.user_name !== undefined ? value.user_name : value.user_name}</td>
                                                            <td>{value.dh_address !== undefined ? value.dh_address : value.dh_address}</td>
                                                            <td>{value.user_phone !== undefined ? value.user_phone : value.user_phone}</td>
                                                            <td>{value.dh_pay}</td>
                                                            {renderStatus(value.dh_status)}
                                                            <td>{value.dh_create = new Date(value.dh_create).toLocaleString()}</td>
                                                            {value.nv_hoten !== null && value.nv_phone !== null && value.nv_phone !== '0' ?
                                                                <>
                                                                    <td>{value.nv_hoten}</td>
                                                                    <td>{value.nv_phone}</td>
                                                                    <td>Staff's Received</td>
                                                                </> :
                                                                <>
                                                                    <td>Not yet</td>
                                                                    <td>Empty </td>
                                                                    <td>Wait</td>
                                                                </>
                                                            }

                                                        </tr>
                                                    )

                                                }),
                                                <tr key={idx} className='table-secondary'>
                                                    <td colSpan={3} className='fw-bolder text-uppercase text-end'>Sum quantity:</td>
                                                    <td colSpan={1} className='fw-bolder text-uppercase text-center'>{value.dh_sl}</td>
                                                    <td colSpan={9} className='fw-bolder text-uppercase text-end'>Sum</td>
                                                    <td className='fw-bolder text-primary text-center' colSpan={1}>{new Intl.NumberFormat('vi').format(value.dh_total)} $</td>
                                                    {renderButton(value.dh_status, value.dh_id)}
                                                </tr>
                                            ]
                                        })
                                    }
                                </tbody> :
                                <tbody>
                                    <tr className='text-center fw-bolder text-danger h3'><td colSpan={15}>Right now not have any orders</td></tr>
                                </tbody>
                        }
                    </table>
                    <ReactPaginate
                        previousLabel="Previous page"
                        nextLabel="Next page"
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
            <Modal show={showListAccount !== false} onHide={() => setShowListAccount(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Employee List</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowY: "scroll" }}>
                    {
                        listAccount !== undefined && listAccount?.length !== 0 ?
                            listAccount?.map((item, i) => (
                                <div key={i} className='d-flex'>
                                    <button disabled className='text-dark fw-bold'>{i + 1}</button>
                                    <button className='border-0 btn btn-outline-info text-dark w-100 text-start m-1' onClick={() => { updateStatus(showListAccount, 1, item.nv_id); setShowListAccount(false) }}>{item.nv_hoten}</button>
                                </div>
                            )) :
                            <div>
                                <h5>No Employee</h5>
                            </div>
                    }
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={() => setListAccount(false)}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </div>

    );
}

export default Oder;