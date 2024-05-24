import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
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
                    console.log(res.data.user);
                    toast.success('Login Success.', {
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
                if (err.response && err.response.status === 401) {
                    toast.error('Wrong email or password. Please check it again', {
                        position: "top-center",
                        autoClose: 2000,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                } else {
                    console.error(err);
                }
            })
    }
    gapi.load('client:auth2', () => {
        window.gapi.auth2.init({
            clientId: '686379333298-ufinh94530414avacsme1lkr82779lp8.apps.googleusercontent.com',
            plugin_name: "chat"
        })
    })
    const onSuccess = async (googleData) => {
        const data = await googleData.getBasicProfile()
        account.user_name = data.Ad
        account.user_email = data.cu
        account.user_address = ''
        account.user_phone = ''
        account.user_password = ''
        console.log(account);
        await axios
            .post('http://localhost:5000/api/users/login', {
                user_email: account.user_email,
                user_password: account.user_password,
            })
            .then((res => {
                if (res.data.user) {
                    toast.success('Login Success.', {
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
            }))
            .catch((err) => {
                axios
                    .post('http://localhost:5000/api/users/gg', { account })
                    .then((res) => {
                        axios
                            .post('http://localhost:5000/api/users/login', {
                                user_email: account.user_email,
                                user_password: account.user_password,
                            })
                            .then((res) => {
                                if (res.data.user) {
                                    toast.success('Login Success.', {
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
                    })
            })
    };
    const onFailure = response => {
        toast.error('Logging not success.', {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    };
    return (
        <Container fluid className='padding-header'>
            <ToastContainer />
            <Row>
                <Col md={6}>
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                        PETSHOP <br />
                        <span style={{ color: 'hsl(218, 81%, 75%)' }}>Always welcome new users</span>
                    </h1>
                    <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
                        PETSHOP was founded on December 25, 2022.
                        The project was thought and invented by student Lam Kim Long and has an estimated completion time of about 4 months.
                        During the research and development process, there are always some difficult problems in terms of knowledge and skills. But it is expected to be completed on November 31, 2023.
                    </p>
                </Col>

                <Col md='6' className='position-relative'>
                    <div className='container'>
                        <h2 className='text-uppercase mb-3 text-success'>Login </h2>
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
                                        User Name:
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
                                        Password:
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
                                <Button variant='success' onClick={() => onSubmit()}>Login</Button>
                                <Row className='g-3'>
                                    <Col sm={6} md={8}>
                                        <span className='fw-bold text-muted'>
                                            OR
                                        </span>
                                        <div className='g-3 mt-2'>
                                            <GoogleLogin
                                                clientId={"686379333298-ufinh94530414avacsme1lkr82779lp8.apps.googleusercontent.com"}
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
                                                You not account yet ?
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
                                                    Sign Up now!!!
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