import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
function ForgotPasswordCustomer(props) {
    const [email, setEmail] = useState()
    const onChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value })
    }
    function onSumit() {
        axios
            .post('http://localhost:5000/api/user/reset-password',{
                email
            })    
            .then((res)=>{
                toast.info('Email xác nhận đã được gởi. Vui lòng kiểm tra email của bạn', {
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
                        // setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
            .catch((err)=>{
                toast.error('Tài khoản không chính xác. Vui lòng kiểm tra lại ', {
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
                        // setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
    }
    return (
        <Container className='padding-header d-fex' >
            <ToastContainer />
            <div style={{ width: "500px" }} className='mx-auto'>
                <Form className='text-start'>
                    <h2 className='text-center'>
                        Quên mật khẩu
                    </h2>
                    <Form.Group>
                        <Form.Label
                            htmlFor="username"
                            className="control-label fw-bold"
                        > Tài khoản
                        </Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            name="email"
                            placeholder="Username/Email"
                            onChange={onChange}
                        ></Form.Control>
                        <Button variant='danger' className='mt-2' onClick={() => onSumit()}>Gửi yêu cầu</Button>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    );
}

export default ForgotPasswordCustomer;