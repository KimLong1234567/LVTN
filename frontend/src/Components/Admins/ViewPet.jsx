import React, { useLayoutEffect, useState } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faCircleXmark, faFilter, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
function ViewPet(props) {
    const [show, setShow] = useState('')
    const [bill, setBill] = useState([])
    const [filterBill, setFilterBill] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [listAccount, setListAccount] = useState([])
    const [showListAccount, setShowListAccount] = useState(false)
    const curentAccount = localStorage.admin ? JSON.parse(localStorage.admin) : null

    useLayoutEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:5000/api/pets/')
                .then((res) => {
                    const temp = res.data.data.filter((e) => (e.p_status !== 2))
                    setBill(temp.reverse())
                    setFilterBill(temp)
                })
            await axios.get('http://localhost:5000/api/admins/')
                .then((res) => {
                    setListAccount(res.data.data)
                })
        }
        fetchData()
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
    const onChange = (e) => {
        const temp = filterBill.filter(element => element.customer.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setBill(temp)
    }
    function renderButton(status, id) {
        if (status === 'Đã giao hàng thành công') {
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
        else if (status === 'Đơn hàng đã bị hủy bỏ') {
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
        else if (status === 'Chờ xác nhận') {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' onClick={() => updateStatus(id, 'Đang giao hàng', curentAccount._id)}>
                            <Icon icon={faCheckDouble} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' onClick={() => updateStatus(id, 'Đơn hàng đã bị hủy bỏ', curentAccount._id)}>
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
        else if (status === 'Đang giao hàng') {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' onClick={() => updateStatus(id, "Đã giao hàng thành công")}>
                            <Icon icon={faCheckDouble} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' onClick={() => updateStatus(id, "Đơn hàng đã bị hủy bỏ")}>
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

        await axios.put(`http://localhost:5000/api/bill/${id}`, {
            id: id,
            status: status,
            nhanvien: idAccount
        })
            .then((res) => {
                toast.info('Cập nhật thành công', {
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
        if (status === 'Đã giao hàng thành công') {
            return (
                <td className='text-success fw-bold'>{status}</td>
            )
        }
        else if (status === 'Đơn hàng đã bị hủy bỏ') {
            return (

                <td className='text-danger fw-bold'>{status}</td>

            )
        }
        else if (status === 'Chờ xác nhận') {
            return (

                <td className='text-warning fw-bold'>{status}</td>

            )
        }
        else if (status === 'Đơn hàng đã bị hủy bỏ') {
            return (
                <td className='text-primary fw-bold'>{status}</td>

            )
        }
        else {
            return (

                <td className='text-primary fw-bold'>{status}</td>
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
            <h2 className='text-uppercase text-center text-primary fw-bolder mt-2'>Quản lý bill</h2>
            <h3 className='text-uppercase text-start text-success fw-bolder mx-2'>filter <Icon icon={faFilter} /></h3>
            <Row className='m-0'>
                <Col xs={12} md={3}>
                    <h4 style={{ color: 'tomato', fontWeight: "bolder" }}>Tất cả đơn hàng <input type='checkbox' onChange={() => { filter('') }} checked={show === ''} /> </h4>
                </Col>
                <Col xs={12} md={3}>
                    <h4 className='text-warning'>Chờ xác nhận <input type='checkbox' onChange={() => { filter('Chờ xác nhận') }} checked={show === 'Chờ xác nhận'} /> </h4>
                </Col>
                <Col xs={12} md={3}>
                    <h4 className='text-primary'>Đang giao hàng <input type='checkbox' onChange={() => { filter('Đang giao hàng') }} checked={show === 'Đang giao hàng'} /> </h4>
                </Col>
                <Col xs={12} md={3}>
                    <h4 className='text-danger'>Đã hủy <input type='checkbox' onChange={() => { filter('Đơn hàng đã bị hủy bỏ') }} checked={show === 'Đơn hàng đã bị hủy bỏ'} /> </h4>
                </Col>
                <Col>
                    <div className='d-flex m-3 justify-content-center'>
                        <input type="text"
                            className="form-control w-50 "
                            placeholder="Nhập tên khách hàng"
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
                                <th scope="col">Pet name</th>
                                <th scope="col">Image</th>
                                <th scope="col">Pet des</th>
                                <th scope="col">Pet's ower</th>
                                <th scope="col">Pet loai</th>
                                <th scope="col">Date book</th>
                                <th scope="col">Pet service detail </th>
                                <th scope="col">Pet service fee</th>
                                <th scope="col">Pet service date</th>
                                <th scope='col'>Status</th>
                                <th scope="col" colSpan={3}>Move</th>
                            </tr>
                        </thead>
                        {
                            bill !== undefined && bill.length !== 0 ? (
                                <tbody>
                                    {
                                        dataPage.map((item, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{item.p_name}</td>
                                                <td>
                                                    <img src={`/image/Pet/${item.p_img}`} style={{ width: "100px" }} alt='...' />
                                                </td>
                                                <td>{item.p_des}</td>
                                                <td>{item.user_name}</td>
                                                <td>{item.cate_name}</td>
                                                <td>{item.p_create = new Date(item.p_create).toLocaleString()}</td>
                                                <td>{item.p_s_detail !== undefined ? "Not doing yet" : item.p_s_detail}</td>
                                                <td>{item.p_s_fee !== undefined ? '0' : item.p_s_fee}</td>
                                                <td>{item.p_s_date !== undefined ? "till waitting" : item.p_s_date = new Date(item.p_s_date).toLocaleString()}</td>
                                                {renderStatus(item.p_status)}
                                                {renderButton(item.p_status, item.p_id)}
                                            </tr>
                                        ))}
                                    <tr>
                                    </tr>
                                </tbody >
                            ) : (
                                <tbody>
                                    <tr className='text-center fw-bolder text-danger h3'><td colSpan={12}>No pets in book pets</td></tr>
                                </tbody>
                            )
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
                </div>
            </div>
            <Modal show={showListAccount !== false} onHide={() => setShowListAccount(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowY: "scroll" }}>
                    {
                        listAccount !== undefined && listAccount?.length !== 0 ?
                            listAccount?.map((item, i) => (
                                <div key={i} className='d-flex'>
                                    <button disabled className='text-dark fw-bold'>{i + 1}</button>
                                    <button className='border-0 btn btn-outline-info text-dark w-100 text-start m-1' onClick={() => { updateStatus(showListAccount, 'Chờ xác nhận', item._id); setShowListAccount(false) }}>{item.hoten}</button>
                                </div>
                            )) :
                            <div>
                                <h5>Không có nhân viên nào</h5>
                            </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setListAccount(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default ViewPet;