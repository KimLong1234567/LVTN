import React, { useLayoutEffect, useState } from 'react';
import { Row, Col, Container, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheckToSlot, faCircleXmark, faCommentMedical, faFilter, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
function Bill(props) {
    const [show, setShow] = useState('')
    const [bill, setBill] = useState([])
    const [filterBill, setFilterBill] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [feedback, setFeedback] = useState({})
    const [files, setFiles] = useState()
    const [start, setStart] = useState(0)

    // const curentAccount = localStorage.currentAccount ? JSON.parse(localStorage.currentAccount) : null
    const curentAccount = localStorage["currentAccount"] ? JSON.parse(localStorage["currentAccount"]) : null
    useLayoutEffect(() => {
        async function fetchData() {
            const res = await axios.get(`http://localhost:5000/api/dh/dh/${curentAccount.user_id}`)
            setBill(res.data.data)
            setFilterBill(res.data.data)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])
    // console.log(bill);
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

    const changeFile = (e) => {
        setFiles(e.target.files[0]);
        console.log(e.target.files);
    }

    async function updateStatus(id, status) {
        await axios.delete(`http://localhost:5000/api/dh/${id}`, {
            id: id,
            dh_status: status
        })
            .then((res) => {
                toast.info('Update Success.', {
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
                        setShowModal(false)
                    },
                    3000
                );

            })
    }

    function renderButton(status, id) {
        if (status === 2) {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' onClick={() => setShowModal(true)}>
                            <Icon icon={faCommentMedical} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' disabled>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                    {/* <td>
                        <button className='btn btn-outline-warning' onClick={() => updateStatus(id, 'Chờ xác nhận')} >
                            <Icon icon={faTrashCanArrowUp} />
                        </button>
                    </td> */}
                </>
            )
        }
        else if (status === 3) {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' disabled>
                            <Icon icon={faCheckToSlot} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' disabled>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                    {/* <td>
                        <button className='btn btn-outline-warning' onClick={() => updateStatus(id, 'Chờ xác nhận')}>
                            <Icon icon={faTrashCanArrowUp} />
                        </button>
                    </td> */}
                </>
            )
        }
        else if (status === 0) {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' disabled>
                            <Icon icon={faCheckToSlot} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' onClick={() => updateStatus(id, 3)}>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                    {/* <td>
                        <button className='btn btn-outline-warning' disabled>
                            <Icon icon={faTrashCanArrowUp} />
                        </button>
                    </td> */}
                </>
            )
        }
        else {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' disabled>
                            <Icon icon={faCheckToSlot} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' disabled>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                    {/* <td>
                        <button className='btn btn-outline-warning' disabled>
                            <Icon icon={faTrashCanArrowUp} />
                        </button>
                    </td> */}
                </>
            )
        }
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
                // {status}
                <td className='text-warning fw-bold'> Wait</td>

            )
        }
        else {
            return (
                <td className='text-primary fw-bold'>On Shipping</td>
            )
        }
    }

    const onchange = (e) => {
        setFeedback({ ...feedback, [e.target.name]: e.target.value })
    }
    function addFeedback() {
        const feedbackData = new FormData();
        feedbackData.append('lh_img', files);

        feedbackData.append('lh_name', curentAccount.user_name);
        feedbackData.append('lh_email', curentAccount.user_email);
        feedbackData.append('lh_sdt', curentAccount.user_phone);
        feedbackData.append('lh_content', feedback.lh_content);
        feedbackData.append('lh_address', curentAccount.user_address);
        axios.post('http://localhost:5000/api/contacts/', feedbackData)
            .then((res) => {
                toast.success("You've responded; please check your email for more details.", {
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
                        setShowModal(false)
                    },
                    3000
                );
            })
    }

    const end = start + 2;
    const dataPage = bill.slice(start, end);
    const pageCount = Math.ceil(bill.length / 2);
    const handlePageClick = (event) => {
        const number = (event.selected * 2) % bill.length;
        setStart(number);
    };

    return (
        <Container fluid className='padding-header'>
            <ToastContainer />
            <Modal show={showModal !== false} onHide={() => setShowModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Service reviews</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={4} placeholder="Please give us feedback about your order" name='lh_content' onChange={onchange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Image feedback</Form.Label>
                            <Form.Control type="file"
                                multiple
                                name="lh_img"
                                onChange={changeFile}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => addFeedback()}>
                        Add feedback
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <h2 className='text-primary text-uppercase'>Bill List</h2>
                <Row className='m-0'>
                    <h3 className='text-uppercase text-start text-success fw-bolder mx-2'>filter <Icon icon={faFilter} /></h3>
                    <Col xs={12} md={3}>
                        <h4 style={{ color: 'tomato', fontWeight: "bolder" }}>All Bill <input type='checkbox' onChange={() => { filter('') }} checked={show === ''} /> </h4>
                    </Col>
                    <Col xs={12} md={2}>
                        <h4 className='text-warning'>Wait <input type='checkbox' onChange={() => { filter(0) }} checked={show === 0} /> </h4>
                    </Col>
                    <Col xs={12} md={2}>
                        <h4 className='text-primary'>On going <input type='checkbox' onChange={() => { filter(1) }} checked={show === 1} /> </h4>
                    </Col>
                    <Col xs={12} md={3}>
                        <h4 className='text-success'>Has received <input type='checkbox' onChange={() => { filter(2) }} checked={show === 2} /> </h4>
                    </Col>
                    <Col xs={12} md={2}>
                        <h4 className='text-danger'>Deleted <input type='checkbox' onChange={() => { filter(3) }} checked={show === 3} /> </h4>
                    </Col>
                </Row>
            </div>
            <table className="table table-bordered align-middle justify-content-center">
                <thead>
                    <tr className="table-secondary text-center">
                        <th scope="col">No</th>
                        <th scope="col">PRODUCT NAME</th>
                        <th scope="col">IMAGE</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">CUSTOMER NAME</th>
                        <th scope="col">ADDRESS SHIP</th>
                        <th scope="col">CUSTOMER PHONE</th>
                        <th scope="col">TYPE BILL</th>
                        <th scope="col">STATUS BILL</th>
                        <th scope="col">DATE ORDER</th>
                        <th scope="col">SHIPPER</th>
                        <th scope="col">SHIPPER PHONE</th>
                        <th scope="col" colSpan={3}>MOVE</th>
                    </tr>
                </thead>
                {
                    bill !== undefined && bill.length !== 0 ?
                        <tbody>
                            {
                                dataPage.map((value, idx) => {
                                    const id = value.dh_id;
                                    console.log(id);
                                    return [
                                        value.ctdh.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{item.sp_name} </td>
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
                                                    <td>{value.nv_hoten !== null ? value.nv_hoten : "There is currently no delivery person"}</td>
                                                    <td>{value.nv_phone !== null ? value.nv_phone : "Empty"}</td>
                                                    <td colSpan={3}></td>
                                                </tr>
                                            )
                                        }),
                                        <tr key={idx}>
                                            <td colSpan={3} className='fw-bolder text-uppercase text-end'>Sum quantity:</td>
                                            <td colSpan={1} className='fw-bolder text-uppercase text-center'>{value.dh_sl}</td>
                                            <td colSpan={8} className='fw-bolder text-uppercase text-end'>Sum: </td>
                                            <td className='fw-bolder text-primary text-end' colSpan={1}>{new Intl.NumberFormat('vi').format(value.dh_total)} $</td>
                                            {
                                                renderButton(value.dh_status, id)
                                            }
                                        </tr>
                                    ]
                                })
                            }
                        </tbody> : <tbody>
                            <tr className='text-center fw-bolder text-danger h3'><td colSpan={12}>Not have bill yet</td></tr>
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
        </Container>
    );
}

export default Bill;