import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row, } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print'
import { ToastContainer, toast } from "react-toastify"
function ExportPDF(props) {
    const { id } = useParams();
    const filePDF = useRef();
    const [bill, setBill] = useState({})
    const today = new Date()
    let date = today.getDate()
    let month = today.getMonth()
    let years = today.getFullYear()
    useEffect(() => {
        axios.get(`http://localhost:5000/api/bill/${id}`)
            .then((res) => {
                setBill(res.data.data)
            })
    }, [id])

    let ngaydat = new Date(bill?.createdAt).toLocaleDateString()
    let ngaynhan = new Date(bill?.updatedAt).toLocaleDateString()
    const exportPDF = useReactToPrint({
        content: () => filePDF.current,
        documentTitle: "Hóa đơn bán lẻ",
        onAfterPrint: () => toast.success("Xuất file thành công", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    })
    return (
        <div className='boder-main'>
            <ToastContainer />
            <Container className=' border border-1'>
                <div className=' border border-1 container mt-2' ref={filePDF}>
                    <Row>
                        <Col sm={3} >
                            <img src='/image/Logo/logoCustomer.png' alt='...' style={{ width: "200px" }} />
                        </Col>
                        <Col sm={6} className='text-center'>
                            <div className='text-uppercase text-danger'>
                                <h1>Hóa đơn</h1>
                                <h2>
                                    giá trị gia tăng
                                </h2>
                            </div>
                            <p className='fw-bold h5'>Cần Thơ ngày {date} tháng {month + 1} năm {years}</p>
                        </Col>
                        <Col sm={3} className='text-start text-danger mt-3'>
                            <h5>Ngày đặt: <span className='p-0 m-0 text-dark'>{ngaydat}</span></h5>
                            <h5>Ngày nhận: <span className='p-0 m-0 text-dark'>{ngaynhan}</span></h5>
                            <h5>No: <span className='p-0 m-0 text-dark'>...{id.slice(12)}</span></h5>
                        </Col>
                    </Row>
                    <Row>
                        <hr className='p-0 text-danger' />
                    </Row>
                    <div className='text-start'>
                        <Row>
                            <h5>Đơn vị bán hàng: CÔNG TY TNHH MTV TN-CARS</h5>
                            <h5>Địa chỉ: 232/19A, 30/4 - Hưng Lợi - Ninh Kiều -Cần Thơ</h5>
                            <h5>Điện thoại: 078 687 7893</h5>
                        </Row>
                        <Row>
                            <hr className='p-0 text-danger' />
                        </Row>
                        <Row>
                            <h5>Khách hàng: {bill?.customer?.name}</h5>
                            <h5>Điện thoại: {bill?.customer?.sdt}</h5>
                            <h5>Địa chỉ: {bill?.customer?.adress}</h5>
                            <h5>Email: {bill?.customer?.email}</h5>
                            <h5>Hình thức thanh toán: {bill?.pay}</h5>
                        </Row>
                        <Row>
                            <hr className='p-0 text-danger' />
                        </Row>
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr className="table-secondary">
                                    <th scope="col">STT</th>
                                    <th scope="col">TÊN SẢN PHẨM</th>
                                    <th scope="col">SỐ LƯỢNG</th>
                                    <th scope="col">GIÁ TIỀN</th>
                                    <th scope="col">THÀNH TIỀN</th>
                                    <th scope="col">NHÂN VIÊN</th>
                                    <th scope="col">ĐIỆN THOẠI</th>
                                </tr>
                            </thead>
                            <tbody className='h5'>
                                {bill?.products?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.id_product.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.id_product.price}</td>
                                        <td>{new Intl.NumberFormat('vi').format(item.id_product.price * item.quantity)}</td>
                                        <td>{bill?.nhanvien}</td>
                                        <td>{bill?.sdtnhanvien}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Row className='text-center'>
                            <h5 className='text-primary'>Tổng tiền cần thanh toán:  {new Intl.NumberFormat('vi').format(bill?.total)} $</h5>
                            <Col sm={4}>
                                <h5>Người mua hàng</h5>
                                <span className='text-muted'>(ký, ghi rõ họ tên)</span>
                            </Col>
                            <Col sm={4}>
                                <h5>Nhân viên bán hàng</h5>
                                <span className='text-muted'>(ký, ghi rõ họ tên)</span>
                            </Col>
                            <Col sm={4}>
                                <h5>Xác nhận giám đốc</h5>
                                <span className='text-muted'>(ký, ghi rõ họ tên)</span>
                            </Col>
                            <h6 className='text-muted text-danger' style={{ marginTop: "100px" }}>(Cam kết theo đúng tiểu chuẩn mẫu và qui định của pháp luật về việc in ấn hóa tại các của hàng.)</h6>
                        </Row>
                    </div>
                </div>
                <Button className='m-2' variant='primary' onClick={() => exportPDF()}> Xuất file </Button>
            </Container>
        </div>
    );
}

export default ExportPDF;