import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row, } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print'
import { ToastContainer, toast } from "react-toastify"
function ExportPDF(props) {
    const { id } = useParams();
    const [dataLoaded, setDataLoaded] = useState(false);
    const filePDF = useRef();
    const [bill, setBill] = useState([])
    const today = new Date()
    let date = today.getDate()
    let month = today.getMonth()
    let years = today.getFullYear()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/dh/dhang/success/${id}`);
                setBill(response.data.data);
                setDataLoaded(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id])
    console.log(bill);
    let ngaydat = bill[0]?.dh_create ? new Date(bill[0].dh_create).toLocaleDateString() : '';
    let ngaynhan = bill[0]?.dh_create ? new Date(bill[0].dh_create).toLocaleDateString() : '';
    const exportPDF = useReactToPrint({
        content: () => filePDF.current,
        documentTitle: "Hóa đơn bán lẻ",
        onAfterPrint: () => toast.success("File exporting is successful.", {
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
            {dataLoaded ? (
                <Container className=' border border-1'>
                    <div className=' border border-1 container mt-2' ref={filePDF}>
                        <Row>
                            <Col sm={3} >
                                <img src='/image/Logo/2.jpg' alt='...' style={{ width: "200px" }} />
                            </Col>
                            <Col sm={5} className='text-center'>
                                <div className='text-uppercase text-danger'>
                                    <h1>Invoice</h1>
                                    <h2>
                                        PETSHOP
                                    </h2>
                                </div>
                                <p className='fw-bold h5'>Cần Thơ, Date {date} month {month + 1} years {years}</p>
                            </Col>
                            <Col sm={4} className='text-start text-danger mt-3'>
                                <h5>Date Order: <span className='p-0 m-0 text-dark'>{ngaydat}</span></h5>
                                <h5>Date of Delivery: <span className='p-0 m-0 text-dark'>{ngaynhan}</span></h5>
                                <h5>No: <span className='p-0 m-0 text-dark'>{id}</span></h5>
                            </Col>
                        </Row>
                        <Row>
                            <hr className='p-0 text-danger' />
                        </Row>
                        <div className='text-start'>
                            <Row>
                                <h5>Sales unit: PETSHOP ONE MEMBER COMPANY LIMITED</h5>
                                <h5>Address: Hẻm liên tổ 19 - Xuân Khánh - Cần Thơ</h5>
                                <h5>Phone: 0912907682</h5>
                            </Row>
                            <Row>
                                <hr className='p-0 text-danger' />
                            </Row>
                            <Row>
                                <h5>Customer: {bill[0]?.user_name}</h5>
                                <h5>Customer's Phone: {bill[0]?.user_phone}</h5>
                                <h5>Customer's Address: {bill[0]?.dh_address}</h5>
                                <h5>Email: {bill[0]?.user_email}</h5>
                                <h5>Payments: {bill[0]?.dh_pay}</h5>
                            </Row>
                            <Row>
                                <hr className='p-0 text-danger' />
                            </Row>
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr className="table-secondary">
                                        <th scope="col">STT</th>
                                        <th scope="col">PRODUCTS NAME</th>
                                        <th scope="col">QUANTITY</th>
                                        <th scope="col">PRICE</th>
                                        <th scope="col">SUM</th>
                                        <th scope="col">STAFF</th>
                                        <th scope="col">STAFF'S PHONE</th>
                                    </tr>
                                </thead>
                                <tbody className='h5'>
                                    {bill[0].ctdh?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.sp_name}</td>
                                            <td>{item.ctdh_sl}</td>
                                            <td>{item.ctdh_price}</td>
                                            <td>{new Intl.NumberFormat('vi').format(item.ctdh_price * item.ctdh_sl)}</td>
                                            <td>{bill[0]?.nv_hoten}</td>
                                            <td>{bill[0]?.nv_phone}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Row className='text-center'>
                                <h5 className='text-primary'>Sum quantity:  {bill[0]?.dh_sl} </h5>
                                <h5 className='text-primary'>The total amount due:  {new Intl.NumberFormat('vi').format(bill[0]?.dh_total)} $</h5>
                                <Col sm={4}>
                                    <h5>Customer</h5>
                                    <span className='text-muted'>(Sign, write full name)</span>
                                </Col>
                                <Col sm={4}>
                                    <h5>Staff sales:</h5>
                                    <span className='text-muted'>(Sign, write full name)</span>
                                </Col>
                                <Col sm={4}>
                                    <h5>Verification of the manager</h5>
                                    <span className='text-muted'>(Sign, write full name)</span>
                                </Col>
                                <h6 className='text-muted text-danger' style={{ marginTop: "100px" }}>(A dedication to abiding by legal requirements and sample standards for printing at retail establishments.)</h6>
                            </Row>
                        </div>
                    </div>
                    <Button className='m-2' variant='primary' onClick={() => exportPDF()}> Export file </Button>
                </Container>
            ) : (
                // Show loading or placeholder while data is loading
                <div>Loading...</div>
            )}
        </div>
    );
}

export default ExportPDF;