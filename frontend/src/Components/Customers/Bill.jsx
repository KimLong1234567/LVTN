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
    const [start, setStart] = useState(0)

    const curentAccount = localStorage.currentAccount ? JSON.parse(localStorage.currentAccount) : null
    useLayoutEffect(() => {
        async function fetchData() {
            const res = await axios.get(`http://localhost:5000/api/bill/user/${curentAccount._id}`)
            setBill(res.data.data)
            setFilterBill(res.data.data)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])
    function filter(text) {
        setShow(text)
        var temp = []
        if (text) {
            temp = filterBill.filter(element => element.status === text)
        }
        else {
            temp = filterBill
        }
        setBill(temp)
    }

    async function updateStatus(id, status) {
        await axios.put(`http://localhost:5000/api/bill/${id}`, {
            id: id,
            status: status
        })
            .then((res) => {
                toast.info('Cập nhật thành công.', {
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
        if (status === 'Đã giao hàng thành công') {
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
                    <td>
                        <button className='btn btn-outline-warning' onClick={() => updateStatus(id, 'Chờ xác nhận')} >
                            <Icon icon={faTrashCanArrowUp} />
                        </button>
                    </td>
                </>
            )
        }
        else if (status === 'Đơn hàng đã bị hủy bỏ') {
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
                    <td>
                        <button className='btn btn-outline-warning' onClick={() => updateStatus(id, 'Chờ xác nhận')}>
                            <Icon icon={faTrashCanArrowUp} />
                        </button>
                    </td>
                </>
            )
        }
        else if (status === 'Chờ xác nhận') {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' disabled>
                            <Icon icon={faCheckToSlot} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' onClick={() => updateStatus(id, 'Đơn hàng đã bị hủy bỏ')}>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-warning' disabled>
                            <Icon icon={faTrashCanArrowUp} />
                        </button>
                    </td>
                </>
            )
        }
        else if (status === 'Đang giao hàng') {
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
                    <td>
                        <button className='btn btn-outline-warning' disabled>
                            <Icon icon={faTrashCanArrowUp} />
                        </button>
                    </td>
                </>
            )
        }
    }
    function renderStatus(status) {
        if (status === '2') {
            return (
                <td className='text-success fw-bold'>{status}</td>
            )
        }
        else if (status === '3') {
            return (

                <td className='text-danger fw-bold'>{status}</td>

            )
        }
        else if (status === '0') {
            return (

                <td className='text-warning fw-bold'>{status}</td>

            )
        }
        else {
            return (
                <td className='text-primary fw-bold'>{status}</td>
            )
        }
    }

    const onchange = (e) => {
        setFeedback({ ...feedback, [e.target.name]: e.target.value })
    }
    function addFeedback() {
        axios.post('http://localhost:5000/api/feedback/', {
            ...feedback,
            customer: curentAccount.user_id
        })
            .then((res) => {
                toast.success('Đã phản hồi, vui lòng kiểm tra email để nhận thông tin', {
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
    const dataPage = bill.reverse().slice(start, end);
    // setBill(dataPage)
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
                    <Modal.Title>Đánh giá dịch vụ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={4} placeholder="Vui lòng cho chúng tôi ý kiến về đơn hàng của bạn" name='content' onChange={onchange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Đính kèm ảnh</Form.Label>
                            <Form.Control type="file"
                                multiple
                                name="image"
                                onChange={onchange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => addFeedback()}>
                        Thêm nhận xét
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <h2 className='text-primary text-uppercase'>danh sách đơn đặt hàng</h2>
                <Row className='m-0'>
                    <h3 className='text-uppercase text-start text-success fw-bolder mx-2'>filter <Icon icon={faFilter} /></h3>
                    <Col xs={12} md={3}>
                        <h4 style={{ color: 'tomato', fontWeight: "bolder" }}>Tất cả đơn hàng <input type='checkbox' onChange={() => { filter('') }} checked={show === ''} /> </h4>
                    </Col>
                    <Col xs={12} md={3}>
                        <h4 className='text-warning'>Chờ xác nhận <input type='checkbox' onChange={() => { filter('0') }} checked={show === 'Chờ xác nhận'} /> </h4>
                    </Col>
                    <Col xs={12} md={2}>
                        <h4 className='text-primary'>Đang giao hàng <input type='checkbox' onChange={() => { filter('1') }} checked={show === 'Đang giao hàng'} /> </h4>
                    </Col>
                    <Col xs={12} md={2}>
                        <h4 className='text-success'>Đã nhận hàng <input type='checkbox' onChange={() => { filter('2') }} checked={show === 'Đã giao hàng thành công'} /> </h4>
                    </Col>
                    <Col xs={12} md={2}>
                        <h4 className='text-danger'>Đã hủy <input type='checkbox' onChange={() => { filter('3') }} checked={show === 'Đơn hàng đã bị hủy bỏ'} /> </h4>
                    </Col>
                </Row>
            </div>
            <table className="table table-bordered align-middle justify-content-center">
                <thead>
                    <tr className="table-secondary text-center">
                        <th scope="col">STT</th>
                        <th scope="col">TÊN SẢN PHẨM</th>
                        <th scope="col">HÌNH ẢNH</th>
                        <th scope="col">SỐ LƯỢNG</th>
                        <th scope="col">GIÁ TIỀN</th>
                        <th scope="col">TÊN KHÁCH HÀNG</th>
                        <th scope="col">ĐỊA CHỈ NHẬN HÀNG</th>
                        <th scope="col">SĐT LIÊN HỆ</th>
                        <th scope="col">THANH TOÁN</th>
                        <th scope="col">TRẠNG THÁI ĐƠN HÀNG</th>
                        <th scope="col">NGÀY ĐẶT</th>
                        <th scope="col">SHIPPER</th>
                        <th scope="col">SĐT</th>
                        <th scope="col" colSpan={3}>THAO TÁC</th>
                    </tr>
                </thead>
                {
                    bill !== undefined && bill.length !== 0 ?
                        <tbody>
                            {
                                dataPage.map((value, idx) => {
                                    return [
                                        value.products.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{item.id_product.name}</td>
                                                    <td>
                                                        <img src={`/image/SanPham/${item.id_product.image}`} style={{ width: "100px" }} alt='...' />
                                                    </td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.id_product.price}</td>
                                                    <td>{value.name_customer !== undefined ? value.name_customer : value.customer.name}</td>
                                                    <td>{value.adress !== undefined ? value.adress : value.customer.adress}</td>
                                                    <td>{value.sdt !== undefined ? value.sdt : value.customer.sdt}</td>
                                                    <td>{value.pay}</td>
                                                    {renderStatus(value.status)}
                                                    <td>{value.createdAt = new Date(value.createdAt).toLocaleString()}</td>
                                                    <td>{value.nhanvien !== undefined ? value.nhanvien : "Hiện chưa có người giao"}</td>
                                                    <td>{value.sdtnhanvien !== undefined ? value.sdtnhanvien : "Trống"}</td>
                                                    <td colSpan={3}></td>
                                                </tr>
                                            )
                                        }),
                                        <tr key={idx}>
                                            <td colSpan={3} className='fw-bolder text-uppercase text-start'>Tổng tiền</td>
                                            <td className='fw-bolder text-primary text-end' colSpan={10}>{new Intl.NumberFormat('vi').format(value.total)} $</td>
                                            {
                                                renderButton(value.status, value._id, value.total)
                                            }
                                        </tr>
                                    ]
                                })
                            }
                        </tbody> : <tbody>
                            <tr className='text-center fw-bolder text-danger h3'><td colSpan={12}>Hiện chưa có đơn hàng</td></tr>
                        </tbody>
                }
            </table>
            <ReactPaginate
                previousLabel="Trang trước"
                nextLabel="Trang sau"
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