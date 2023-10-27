import React, { useState } from 'react';
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAt, faCircleInfo, faEnvelope, faLocation, faMapLocation, faPhone, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Contact(props) {
    const [feedback, setFeedback] = useState({})
    const [files, setFiles] = useState()
    const onchange = (e) => {
        setFeedback({ ...feedback, [e.target.name]: e.target.value })
        console.log(feedback);
    }
    const changeFile = (e) => {
        setFiles(e.target.files[0]);
        console.log(e.target.files);
    }

    function addFeedback() {
        const feedbackData = new FormData();
        feedbackData.append('lh_img', files); // Ensure 'lh_img' is the correct key for the file

        // Append other data
        feedbackData.append('lh_name', feedback.lh_name);
        feedbackData.append('lh_email', feedback.lh_email);
        feedbackData.append('lh_sdt', feedback.lh_sdt);
        feedbackData.append('lh_content', feedback.lh_content);
        feedbackData.append('lh_address', feedback.lh_address);
        console.log(feedbackData);
        axios.post('http://localhost:5000/api/contacts/', feedbackData, {})
            .then((res) => {
                toast.success('Đã liên hệ với cửa hàng. Vui lòng chờ email phản hồi từ chúng tôi.', {
                    position: "top-center",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            })
    }
    return (
        <>
            <ToastContainer />
            <div className='d-flex justify-content-center padding-header' style={{ backgroundImage: `url('/image/Background/bg-contacts.png')`, backgroundSize: "cover", height: "500px" }}>
                <div>
                    <h2 style={{ fontSize: "65px", textTransform: "uppercase", color: "#f33f3f", letterSpacing: "5px", fontWeight: "500" }}>Petshop</h2>
                    <h1 style={{ fontSize: "65px", textTransform: "uppercase", color: "white", letterSpacing: "5px", fontWeight: "500" }}>Contact us</h1>
                </div>
            </div>
            <Container>
                <Row className='mt-3'>
                    <Col sx={12} md={6}>
                        <h2 className='text-uppercase text-info'>Address base on google map <Icon icon={faMapLocation} /></h2>
                        <hr />
                        <div >
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841518408644!2d105.76842661446742!3d10.029933692830621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1677837903348!5m2!1svi!2s" style={{ width: "600px", height: "300px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="myFrame"></iframe>
                        </div>
                        <hr />
                    </Col>
                    <Col sx={12} md={6}>
                        <h2 className='text-uppercase text-info'>About us <Icon icon={faCircleInfo} /></h2>
                        <hr />
                        <div className='text-start'>
                            <p> <Icon icon={faUserTie} /> Lâm Kim Long DI19V7A8 2019-2023</p>
                            <p> <Icon icon={faPhone} /> 0912 907 682</p>
                            <p> <Icon icon={faLocation} /> Khu 2, Đ. 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. CT</p>
                            <p> <Icon icon={faAt} /> LongB1910403@student.ctu.edu.vn</p>
                            <div className='mx-3'>
                                <a href='https://www.facebook.com/kimlong.lam.39750/' style={{ fontSize: "40px", color: "blue" }}> <Icon icon={faFacebook} /> </a>
                                <Link to={''} style={{ fontSize: "40px", color: "blue" }}> <Icon icon={faTwitter} /> </Link>
                                <Link to={''} style={{ fontSize: "40px", color: "blue" }}> <Icon icon={faEnvelope} /> </Link>

                            </div>
                        </div>
                        <hr />

                    </Col>
                </Row>
                <Row className='d-flex justity-content-center'>
                    <h2 className='text-uppercase text-start'>Send us a Message</h2>
                    <hr />
                    <Col sx={12} md={6} >
                        <div className='text-start'>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Họ tên</Form.Label>
                                    <Form.Control type="text" placeholder='Họ tên' name='lh_name' onChange={onchange} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder='Email của bạn' name='lh_email' onChange={onchange} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Điện thoại</Form.Label>
                                    <Form.Control type="text" placeholder='Số điện thoại liên lạc' name='lh_sdt' onChange={onchange} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control type="text" placeholder='Địa chỉ liên hệ' name='lh_address' onChange={onchange} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Nội dung cần hỗ trợ</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Nội dung cần tư vấn" name='lh_content' onChange={onchange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Đính kèm ảnh</Form.Label>
                                    <Form.Control type="file"
                                        multiple
                                        name="lh_img"
                                        onChange={changeFile}
                                    />
                                </Form.Group>
                                <Button variant='danger' onClick={() => addFeedback()}>Gửi yêu cầu</Button>
                            </Form>
                        </div>
                    </Col>
                    <Col sx={12} md={6} >
                        <div>
                            <img src='/image/Avt/ava2.jpg' alt='...' style={{ width: "450px" }} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Contact;