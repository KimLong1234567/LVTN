import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
function ResetPasswordCustomer(props) {
    const [password, setPassword] = useState()
    const [Token, setToken] = useState({})
    const [passwordError, setPasswordError] = useState(null);
    const onChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }
    var { token } = useParams()
    const Navigate = useNavigate()
    // console.log(Token.email);
    axios
        .get(`http://localhost:5000/api/users/get-token/${token}`)
        .then((res) => {
            setToken(res.data.data)
        })
        .catch((err) => {
            window.alert('...')
        })
    // console.log(password);
    function onSumit() {
        //handle password not matches
        if (password.password !== password.user_password) {
            setPasswordError("Password and Confim-password doesn't match");
            return;
        }
        axios
            .post(`http://localhost:5000/api/users/reset-password/${Token.email}`, password)
            .then((res) => {
                toast.success('Password successfully updated. Please log back in.', {
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
                        Update your password
                    </h2>
                    <Form.Group>
                        <Form.Label
                            htmlFor="username"
                            className="control-label fw-bold"
                        > Password
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
                        > Confim Password
                        </Form.Label>
                        <Form.Control
                            className="form-control"
                            type="password"
                            name="user_password"
                            placeholder="Confim-password"
                            onChange={onChange}
                        ></Form.Control>
                        {passwordError && <p className="text-danger">{passwordError}</p>}
                        <Button variant='primary' className='mt-2' onClick={() => onSumit()}>Change</Button>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    );
}

export default ResetPasswordCustomer;