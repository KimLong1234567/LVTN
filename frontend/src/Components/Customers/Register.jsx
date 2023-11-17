import React, { useState } from 'react';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faImagePortrait, faKey, faGenderless, faPhoneVolume, faRightFromBracket, faUser, faUserLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function Register(props) {
    const [account, setAccount] = useState({})
    const [files, setFiles] = useState()
    const Navigate = useNavigate()
    const onChangeHandle = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value })
        console.log(account);
    }
    const changeFile = (e) => {
        setFiles(e.target.files[0]);
        console.log(e.target.files);
    }
    const onSubmit = (event) => {
        event.preventDefault();  // Ngăn chặn mặc định gửi lại trang

        const formDataToSend = new FormData();
        for (let key in account) {
            formDataToSend.append(key, account[key]);
        }
        formDataToSend.append('user_avt', files)
        axios
            .post('http://localhost:5000/api/users', formDataToSend)
            .then((res) => {
                toast.success('Account creation was accomplished. Click here to log in.', {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setTimeout(
                    function () {
                        Navigate('/login')
                    },
                    4000
                );
            })
            .catch((Error => {
                toast.error('Đăng ký tài khoản không thành công.', {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }))
    }
    return (
        <Container fluid className='padding-header' style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/image/Background/bg.jpg')`, backgroundSize: "cover" }}>
            <ToastContainer />
            <h3 className=" fw-bold text-uppercase text-primary">Create a membership account</h3>
            <Card style={{ background: "none", border: "none", color: "white" }}>
                <Card.Body>
                    <Row>
                        <Col md='6' lg='12' className='d-flex flex-column align-items-center text-start'>
                            <Form onSubmit={onSubmit}>
                                <Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="hoten" className="control-label">
                                            <Icon icon={faUser} /> Name
                                        </Form.Label>
                                        <Form.Control
                                            className="form-control"
                                            type="text"
                                            name="user_name"
                                            placeholder="Tên của bạn "
                                            onChange={onChangeHandle}

                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Label
                                        htmlFor="email"
                                        className="control-label"
                                    >
                                        <Icon icon={faUserLock} />  Email
                                    </Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="email"
                                        name="user_email"
                                        placeholder="Email"
                                        onChange={onChangeHandle}
                                        required
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="password" className="control-label">
                                        <Icon icon={faKey} />  Password
                                    </Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="password"
                                        name="user_password"
                                        placeholder="Password"
                                        onChange={onChangeHandle}
                                        required
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="avt" className="control-label">
                                        <Icon icon={faImagePortrait} />     Avatar
                                    </Form.Label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        name="user_avt"
                                        onChange={changeFile}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="sdt" className="control-label">
                                        <Icon icon={faPhoneVolume} />   Phone
                                    </Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="user_phone"
                                        placeholder="Phone"
                                        onChange={onChangeHandle}
                                        required
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="sdt" className="control-label">
                                        <Icon icon={faGenderless} />   Gender
                                    </Form.Label>
                                    <Form.Select aria-label="Default select example" name="user_gt" onChange={onChangeHandle}>
                                        <option>-- Choose a Gender --</option>
                                        <option value='nam'>Male</option>
                                        <option value='nữ'>Female</option>
                                        <option value='unknow'>unknow</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="username" className="control-label">
                                        <Icon icon={faAddressCard} />   Address
                                    </Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="user_address"
                                        placeholder="Your address as of right now"
                                        onChange={onChangeHandle}
                                        required
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className='m-2'>
                                    <Form.Label>
                                        <Link to={'/login'} className={'text-white fw-bolder h5'}> <Icon icon={faRightFromBracket} /> Access an already-existing account </Link>
                                    </Form.Label>
                                </Form.Group>
                                <Button variant='primary' type='submit' onClick={() => onSubmit()}>Sign up</Button>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        </Container>
    );
}

export default Register;