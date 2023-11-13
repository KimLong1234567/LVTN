import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faImagePortrait, faKey, faGenderless, faPhoneVolume, faRightFromBracket, faUser, faUserLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function BookPet(props) {
    const [pet, setPet] = useState({})
    const [files, setFiles] = useState()
    const [Type, setType] = useState([])
    const curentAccount = localStorage["currentAccount"] ? JSON.parse(localStorage["currentAccount"]) : null
    const Navigate = useNavigate()
    const onChangeHandle = (e) => {
        setPet({ ...pet, [e.target.name]: e.target.value })
        console.log(pet);
    }
    const changeFile = (e) => {
        setFiles(e.target.files[0]);
        console.log(e.target.files);
    }
    const handlChange = (e) => {
        const categoryId = e.target.value;
        setPet({ ...pet, cate_id: categoryId });
        console.log(categoryId);
    }
    console.log(pet);
    console.log(curentAccount.user_id)
    const onSubmit = (event) => {
        event.preventDefault();  // Ngăn chặn mặc định gửi lại trang

        const formDataToSend = new FormData();
        for (let key in pet) {
            formDataToSend.append(key, pet[key]);
        }
        formDataToSend.append('p_img', files)
        formDataToSend.append('kh_id', curentAccount.user_id,);
        axios
            .post('http://localhost:5000/api/pets/', formDataToSend)
            .then((res) => {
                toast.success('Booking succes.', {
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
                        Navigate('/')
                    },
                    4000
                );
            })
            .catch((Error => {
                toast.error('Booking not succes.', {
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
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/cate/')
            .then((res) => {
                setType(res.data.data)
            })
    }, [])
    return (
        <Container fluid className='padding-header' style={{ backgroundImage: `url('/image/Background/bg.jpg')`, backgroundSize: "cover" }}>
            <ToastContainer />
            <h3 className=" fw-bold text-uppercase text-primary">Book Pet</h3>
            <Card style={{ background: "none", border: "none", color: "white" }}>
                <Card.Body>
                    <Row>
                        <Col md='6' lg='12' className='d-flex flex-column align-items-center text-start'>
                            <Form onSubmit={onSubmit}>
                                <Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="hoten" className="control-label">
                                            <Icon icon={faUser} /> Pet name
                                        </Form.Label>
                                        <Form.Control
                                            className="form-control"
                                            type="text"
                                            name="p_name"
                                            placeholder="Pet name or skip "
                                            onChange={onChangeHandle}

                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Label
                                        htmlFor="email"
                                        className="control-label"
                                    >
                                        <Icon icon={faUserLock} />Pet description
                                    </Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="p_des"
                                        placeholder="type something about your pet problem"
                                        onChange={onChangeHandle}
                                        required
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="avt" className="control-label">
                                        <Icon icon={faImagePortrait} /> Image
                                    </Form.Label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        name="p_img"
                                        onChange={changeFile}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="sdt" className="control-label">
                                        <Icon icon={faGenderless} />   Species
                                    </Form.Label>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                                        <Form.Select aria-label="Default select example" name="type" onChange={handlChange}>
                                            <option>--SELECT--</option>
                                            {Type.map((type, idx) => (
                                                <option name="cate_id" value={type.cate_id} key={idx}>{type.cate_name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Form.Group>
                                <div style={{ height: "10px" }}></div>
                                {/* <Form.Group className='m-2'>
                                    <Form.Label>
                                        <Link to={'/login'} className={'text-white fw-bolder h5'}> <Icon icon={faRightFromBracket} /> Đăng nhập tài khoản hiện có </Link>
                                    </Form.Label>
                                </Form.Group> */}
                                <Button variant='primary' type='submit' onClick={() => onSubmit()}>Book Pet</Button>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        </Container>
    );
}

export default BookPet;