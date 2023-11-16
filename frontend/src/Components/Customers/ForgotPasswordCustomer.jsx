import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
function ForgotPasswordCustomer(props) {
    const [user_email, setEmail] = useState()
    const onChange = (e) => {
        setEmail({ ...user_email, [e.target.name]: e.target.value })
    }
    console.log(user_email);
    function onSumit() {
        axios
            .post('http://localhost:5000/api/users/reset-password', user_email)
            .then((res) => {
                toast.info('An email of confirmation has been sent. Kindly verify your email.', {
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
            .catch((err) => {
                toast.error('Account is incorrect.Please check again ', {
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
                        Find your account
                    </h2>
                    <Form.Group>
                        <Form.Label
                            htmlFor="username"
                            className="control-label fw-bold"
                        > Email:
                        </Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            name="user_email"
                            placeholder="Email"
                            onChange={onChange}
                        ></Form.Control>
                        <Button variant='danger' className='mt-2' onClick={() => onSumit()}>Send require</Button>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    );
}

export default ForgotPasswordCustomer;