import React, { useLayoutEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faCircleXmark, faFilter, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
function AllOrder(props) {
    const [show, setShow] = useState('')
    const [bill, setBill] = useState([])
    const [filterBill, setFilterBill] = useState([])
    const [refresh, setRefresh] = useState(0)
    const curentAccount = localStorage.shipper ? JSON.parse(localStorage.shipper) : null
    const Navigate = useNavigate()
    if (!curentAccount) {
        Navigate('/shipper')
    }
    useLayoutEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://localhost:5000/api/bill/status/1', {
                params: {
                    status: 'Chờ xác nhận',
                    nhanvien: curentAccount._id
                }
            })
            setBill(res.data.data)
            setFilterBill(res.data.data)
        }
        fetchData()
        // eslint-disable-next-line
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
                        <button className='btn btn-outline-success' onClick={() => updateStatus(id, 'Đang giao hàng')}>
                            <Icon icon={faCheckDouble} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' onClick={() => refuse(id)}>
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
                            <Icon icon={faTrashCanArrowUp} />
                        </button>
                    </td>
                </>
            )
        }
    }
    async function updateStatus(id, status) {
        await axios.put(`http://localhost:5000/api/bill/${id}`, {
            id: id,
            status: status,
            nhanvien: curentAccount._id
        })
            .then((res) => {
                toast('Cập nhật thành công.', {
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
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
    }

    async function refuse(id) {
        for (let i = 0; i < filterBill.length; i++) {
            if (filterBill[i]._id === id) {
                filterBill.pop(filterBill[i])
            }
        }
        const temp = filterBill.filter(element => filterBill.includes(element));
        setBill(temp)
        await axios.put(`http://localhost:5000/api/bill/${id}`, {
            sdtnhanvien : '0'
        })
            .then((res) => {
                toast('Cập nhật thành công.', {
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
    return (
        <div className='boder-main'>
            <ToastContainer />
            <h2 className='text-uppercase text-center text-primary fw-bolder mt-2'>danh sách đơn hàng</h2>
            <h3 className='text-uppercase text-start text-success fw-bolder mx-2'>filter <Icon icon={faFilter} /></h3>
            <Row className='m-0'>
                <Col xs={12} md={3}>
                    <h4 style={{ color: 'tomato', fontWeight: "bolder" }}>Tất cả đơn hàng <input type='checkbox' onChange={() => { filter('') }} checked={show === ''} /> </h4>
                </Col>
                <Col xs={12} md={9}>
                    <div className='d-flex mb-2 justify-content-center'>
                        <input type="text"
                            className="form-control w-50 "
                            placeholder="Nhập tên khách hàng"
                            onChange={onChange}
                        />
                    </div>
                </Col>
            </Row>
            <div  style={{ overflowX: "scroll", whiteSpace: "nowrap" }} >
                <table className="table table-bordered">
                    <thead>
                        <tr className="table-secondary text-center">
                            <th scope="col-1">STT</th>
                            <th scope="col-1">TÊN SẢN PHẨM</th>
                            <th scope="col-1">HÌNH ẢNH</th>
                            <th scope="col-1">SỐ LƯỢNG</th>
                            <th scope="col-1">GIÁ TIỀN</th>
                            <th scope="col-1">TÊN KHÁCH HÀNG</th>
                            <th scope="col-1">ĐỊA CHỈ NHẬN HÀNG</th>
                            <th scope="col-1">SĐT LIÊN HỆ</th>
                            <th scope="col-1">THANH TOÁN</th>
                            <th scope="col-1">TRẠNG THÁI ĐƠN HÀNG</th>
                            <th scope="col-1">NGÀY ĐẶT</th>
                            <th scope="col-1" colSpan={3}>THAO TÁC</th>
                        </tr>
                    </thead>
                    {
                        bill !== undefined && bill.length !== 0 ?
                            <tbody>
                                {
                                    bill.map((value, idx) => {
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
                                                        <td colSpan={3}></td>
                                                    </tr>
                                                )
                                            }),
                                            <tr key={idx}>
                                                <td colSpan={3} className='fw-bolder text-uppercase text-start'>Tổng tiền</td>
                                                <td className='fw-bolder text-primary text-end' colSpan={8}>{new Intl.NumberFormat('vi').format(value.total)}</td>
                                                {renderButton(value.status, value._id)}
                                            </tr>
                                        ]
                                    })
                                }
                            </tbody> : <tbody>
                                <tr className='text-center fw-bolder text-danger h3'><td colSpan={12}>Hiện chưa có đơn hàng</td></tr>
                            </tbody>
                    }
                </table>
            </div>
        </div>
    );
}

export default AllOrder;