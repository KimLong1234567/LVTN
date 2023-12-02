import React, { useLayoutEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faCircleXmark, faFilter, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
function Success(props) {
    const [bill, setBill] = useState([])
    const [filterBill, setFilterBill] = useState([])
    const [refresh, setRefresh] = useState(0)
    // const curentAccount = localStorage.shipper ? JSON.parse(localStorage.shipper) : null
    const curentAccount = localStorage["shipper"] ? JSON.parse(localStorage["shipper"]) : null
    useLayoutEffect(() => {
        async function fetchData() {
            const res = await axios.get(`http://localhost:5000/api/dh/shipper/success/${curentAccount.nv_id}`)
            setBill(res.data.data)
            setFilterBill(res.data.data)
        }
        fetchData()
        // eslint-disable-next-line
    }, [refresh])
    const onChange = (e) => {
        const temp = filterBill.filter(element => element.user_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setBill(temp)
    }
    console.log(bill);
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
    }
    async function updateStatus(id, status) {
        await axios.put(`http://localhost:5000/api/bill/${id}`, {
            id: id,
            status: status,
            nhanvien: curentAccount._id
        })
            .then((res) => {
                setRefresh((prev) => prev + 1);
            })
    }
    function renderStatus(status) {
        if (status === 2) {
            return (
                <td className='text-success fw-bold'>Has received</td>
            )
        }
    }
    return (
        <div className='boder-main'>
            <h2 className='text-uppercase text-center text-primary fw-bolder mt-2'>Bills success</h2>
            <h3 className='text-uppercase text-start text-success fw-bolder mx-2'>filter <Icon icon={faFilter} /></h3>
            <Row className='m-0'>
                <Col xs={12} md={3}>
                    <h4 style={{ color: 'tomato', fontWeight: "bolder" }}>All bills </h4>
                </Col>
                <Col xs={12} md={9}>
                    <div className='d-flex mb-2 justify-content-center'>
                        <input type="text"
                            className="form-control w-50 "
                            placeholder="Type some customer name"
                            onChange={onChange}
                        />
                    </div>
                </Col>
            </Row>

            <div style={{ overflowX: "scroll", whiteSpace: "nowrap" }} >
                <table className="table table-bordered">
                    <thead>
                        <tr className="table-secondary text-center">
                            <th scope="col-1">No</th>
                            <th scope="col-1">PRODUCTS NAME</th>
                            <th scope="col-1">IMAGES</th>
                            <th scope="col-1">QUANTITY</th>
                            <th scope="col-1">PRICE</th>
                            <th scope="col-1">CUSTOMER NAME</th>
                            <th scope="col-1">CUSTOMER'S ADDRESS</th>
                            <th scope="col-1">CUSTOMER'S PHONE</th>
                            <th scope="col-1">PAYMENT</th>
                            <th scope="col-1">STATUS ORDER</th>
                            <th scope="col-1">DATE ORDER</th>
                        </tr>
                    </thead>
                    {
                        bill !== undefined && bill.length !== 0 ?
                            <tbody>
                                {
                                    bill.map((value, idx) => {
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
                                                        <td>{value.dh_address !== undefined ? value.dh_address : value.dh_address}</td>
                                                        <td>{value.user_phone !== undefined ? value.user_phone : value.user_phone}</td>
                                                        <td>{value.dh_pay}</td>
                                                        {renderStatus(value.dh_status)}
                                                        <td>{value.dh_update = new Date(value.dh_update).toLocaleString()}</td>
                                                    </tr>
                                                )
                                            }),
                                            <tr key={idx}>
                                                <td colSpan={3} className='fw-bolder text-uppercase text-end'>Sum quantity:</td>
                                                <td colSpan={1} className='fw-bolder text-uppercase text-center'>{value.dh_sl}</td>
                                                <td colSpan={6} className='fw-bolder text-uppercase text-end'>Sum</td>
                                                <td className='fw-bolder text-primary text-center' colSpan={1}>{new Intl.NumberFormat('vi').format(value.dh_total)} $</td>
                                                {renderButton(value.dh_status, value.dh_id)}
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

export default Success;