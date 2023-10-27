import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
import FacebookLogin from 'react-facebook-login'
function Login(props) {
    const [account, setAccount] = useState({})
    const Navigate = useNavigate()
    const onChangeHandle = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value })
    }
    const onSubmit = () => {
        axios
            .post('http://localhost:5000/api/users/login', {
                user_email: account.user_email,
                user_password: account.user_password,
            })
            .then((res) => {
                if (res.data.data === 'signed' && res.data.user) {
                    toast.success('Đăng nhập thành công.', {
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
                            localStorage.setItem("currentAccount", JSON.stringify({ ...res.data.user }))
                            Navigate('/')
                        },
                        3000
                    );
                }
            })
            .catch((err) => {
                toast.error('Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            })
    }
    gapi.load('client:auth2', () => {
        window.gapi.auth2.init({
            clientId: '53173986004-mg1hiuppv5aphkltb107s0l0mf9q2rbd.apps.googleusercontent.com',
            plugin_name: "chat"
        })
    })
    const onSuccess = async (googleData) => {
        const data = await googleData.getBasicProfile()
        account.name = data.Ad
        account.avt = "Avatartrang.jpg"
        account.email = data.cu
        account.adress = ''
        account.sdt = ''
        account.password = ''
        account.id = data.NT
        await axios
            .post('http://localhost:5000/api/user/login', {
                email: account.email,
                password: account.password,
            })
            .then((res => {
                if (res.data) {
                    toast.success('Đăng nhập thành công.', {
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
                            localStorage.setItem("currentAccount", JSON.stringify({ ...res.data }))
                            Navigate('/')
                        },
                        3000
                    );
                }
            }))
            .catch((err) => {
                axios
                    .post('http://localhost:5000/api/user', { account })
                    .then((res) => {
                        if (res.data.data.user) {
                            account._id = res.data.data.user._id
                            toast.success('Đăng nhập thành công.', {
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
                                    localStorage.setItem("currentAccount", JSON.stringify({ ...res.data.data.user }))
                                    Navigate('/')
                                },
                                3000
                            );
                        }
                    })
            })
    };
    const onFailure = response => {
        toast.error('Đăng nhập không thành công.', {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    };
    const onSuccessLoginFacebook = async (facebookData) => {
        account.name = facebookData.name
        account.avt = "Avatartrang.jpg"
        account.email = facebookData.email
        account.adress = ''
        account.sdt = ''
        account.password = ''
        account.id = facebookData.id
        await axios
            .post('http://localhost:5000/api/user/login', {
                email: account.email,
                password: account.password,
            })
            .then((res => {
                if (res.data) {
                    toast.success('Đăng nhập thành công.', {
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
                            localStorage.setItem("currentAccount", JSON.stringify({ ...res.data }))
                            Navigate('/')
                        },
                        3000
                    );
                }
            }))
            .catch((err) => {
                axios
                    .post('http://localhost:5000/api/user', { account })
                    .then(async (res) => {
                        if (res.data.data.user) {
                            await (account._id = res.data.data.user._id)
                            toast.success('Đăng nhập thành công.', {
                                position: "top-center",
                                autoClose: 2000,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            })
                            setTimeout(
                                async function () {
                                    await (localStorage.setItem("currentAccount", JSON.stringify({ ...res.data.data.user })))
                                    Navigate('/')
                                },
                                3000
                            );
                        }
                    })
            })
    }

    return (
        <Container fluid className='padding-header'>
            <ToastContainer />
            <Row>
                <Col md={6}>
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                        PETSHOP <br />
                        <span style={{ color: 'hsl(218, 81%, 75%)' }}>Đồng hành cùng bạn</span>
                    </h1>
                    <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
                        PETSHOP được lên ý tưởng thành lập ngày 25 tháng 12 năm 2022.
                        Dự án được suy nghĩ và phát minh bởi sinh viên Lâm Kim Long có thời gian dự kiến hoàn thành khoản 4 tháng.
                        Trong suốt quá trình nghiên cứu & phát triển luôn suất hiện 1 số vấn đề khó khăn về mặt kiến thức củng như kỷ năng. Nhưng dự kiến sẻ hoàn thành vào ngày 19 tháng 4 năm 2023.
                    </p>
                </Col>

                <Col md='6' className='position-relative'>
                    <div className='container'>
                        <h2 className='text-uppercase mb-3 text-success'>Đăng nhập tài khoản </h2>
                        <div>
                            <img src='/image/Logo/2.jpg' alt='...' style={{ maxWidth: "150px" }} />
                        </div>
                        <div className="mx-5 text-start">
                            <Form>
                                <Form.Group>
                                    <Form.Label
                                        htmlFor="username"
                                        className="control-label"
                                    >
                                        Tài khoản
                                    </Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="user_email"
                                        placeholder="Email"
                                        onChange={onChangeHandle}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="username" className="control-label">
                                        Mật khẩu
                                    </Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="password"
                                        name="user_password"
                                        placeholder="Password"
                                        onChange={onChangeHandle}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        <Link to={'/forgot-password'} className='text-primary'>Forgot password ?</Link>
                                    </Form.Label>
                                </Form.Group>
                                <Button variant='success' onClick={() => onSubmit()}>Đăng nhập</Button>
                                <Row className='g-3'>
                                    <Col sm={6} md={8}>
                                        <span className='fw-bold text-muted'>
                                            Hoặc đăng nhập bằng
                                        </span>
                                        <div className='g-3 mt-2'>
                                            <FacebookLogin
                                                appId="761007288730861"
                                                autoLoad={false}
                                                fields="name,email,picture"
                                                textButton="Facebook"
                                                onFailure={onFailure}
                                                callback={onSuccessLoginFacebook}
                                                icon={<Icon icon={faFacebook} className='me-2 fs-5' />}
                                                cssClass='fs-6 text-white btn btn-primary fw-bolder facebook'
                                            />

                                            <GoogleLogin
                                                clientId={"53173986004-mg1hiuppv5aphkltb107s0l0mf9q2rbd.apps.googleusercontent.com"}
                                                onSuccess={onSuccess}
                                                onFailure={onFailure}
                                                className='mx-2 rounded'
                                                tag='button'
                                                type='button'
                                                buttonText="Google"
                                                theme='light'

                                            />
                                        </div>
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <div className='text-end'>
                                            <span>
                                                Bạn chưa có tài khoản ?
                                            </span>
                                            <Button
                                                type="submit"
                                                style={{ background: "#c98548" }}
                                            >
                                                <Link
                                                    to="/register"
                                                    className="text-decoration-none text-white"
                                                    style={{
                                                        fontSize: "15px",
                                                        textDecoration: "none",
                                                        color: "#fff",
                                                    }}
                                                >
                                                    Đăng ký ngay!!!
                                                </Link>
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </Col>

            </Row>
        </Container>
    );
}
export default Login;