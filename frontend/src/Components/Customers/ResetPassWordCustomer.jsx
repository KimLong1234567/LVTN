import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
function ResetPasswordCustomer(props) {
    const [password, setPassword] = useState()
    const [Token, setToken] = useState({})
    const onChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }
    var { token } = useParams()
    const Navigate = useNavigate()
    axios
        .get(`http://localhost:5000/api/user/reset-updatePassword/${token}`)
        .then((res) => {
            setToken(res.data.data)
        })
        .catch((err) => {
            window.alert('...')
        })

    function onSumit() {
        axios
            .post(`http://localhost:5000/api/user/reset-updatePassword/${Token.email}`, { password })
            .then((res) => {
                toast.success('Cập nhật mật khẩu thành công. Vui lòng đăng nhập lại', {
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
                        Navigate('/login')
                    },
                    3000
                );
            })
            .catch((err) => {
                toast.error('Mật khẩu không chính xác. Vui lòng kiểm tra lại', {
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
                    <h2 className='text-center text-primary'>
                        Cập nhật lại mật khẩu
                    </h2>
                    <Form.Group>
                        <Form.Label
                            htmlFor="username"
                            className="control-label fw-bold"
                        > Mật khẩu
                        </Form.Label>
                        <Form.Control
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={onChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label
                            htmlFor="username"
                            className="control-label fw-bold"
                        > Nhập lại mật khẩu
                        </Form.Label>
                        <Form.Control
                            className="form-control"
                            type="password"
                            name="confimPassword"
                            placeholder="Confim-password"
                            onChange={onChange}
                        ></Form.Control>
                        <Button variant='primary' className='mt-2' onClick={() => onSumit()}>Xác nhận</Button>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    );
}

export default ResetPasswordCustomer;