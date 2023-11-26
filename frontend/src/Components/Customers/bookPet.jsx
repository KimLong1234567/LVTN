import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faImagePortrait, faUser, faInfoCircle, faPaw } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function BookPet(props) {
    const [pet, setPet] = useState({})
    const [files, setFiles] = useState()
    const [Type, setType] = useState([])
    const [Service, setService] = useState([])
    const curentAccount = localStorage["currentAccount"] ? JSON.parse(localStorage["currentAccount"]) : null
    const [showServiceDes, setShowServiceDes] = useState(false);
    const [selectedServiceDes, setSelectedServiceDes] = useState('');
    const Navigate = useNavigate()
    const onChangeHandle = (e) => {
        setPet({ ...pet, [e.target.name]: e.target.value })
        console.log(pet);
    }
    const ichange = (e) => {
        const service_id = parseInt(e.target.value, 10);
        const selectedService = Service.find(Service => Service.service_id === service_id);
        setPet({ ...pet, service_id: service_id });
        setSelectedServiceDes(selectedService ? selectedService.service_des : '');
        setShowServiceDes(true);
    }
    console.log(Service);
    const changeFile = (e) => {
        setFiles(e.target.files[0]);
        console.log(e.target.files);
    }
    const handlChange = (e) => {
        const categoryId = e.target.value;
        setPet({ ...pet, cate_id: categoryId });
        console.log(categoryId);
    }
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
                toast.error('Booking not success.', {
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
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/service/')
            .then((res) => {
                setService(res.data.data)
            })
    }, [])
    // console.log(Service);
    return (
        <Container fluid className='padding-header' style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url('/image/Background/bg.jpg')`, backgroundSize: "cover" }}>
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
                                    <Form.Group>
                                        <Form.Label htmlFor="sdt" className="control-label">
                                            <Icon icon={faInfoCircle} />    Pet description
                                        </Form.Label>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                                            <Form.Select aria-label="Default select example" name="type" onChange={ichange}>
                                                <option>--SELECT--</option>
                                                {Service.map((type, idx) => (
                                                    <option name="service_id" value={type.service_id} key={idx}>{type.service_name} - {type.service_price}$</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Form.Group>
                                </Form.Group>

                                {showServiceDes && (
                                    <Form.Group>
                                        <Form.Label htmlFor="service_des" className="control-label">
                                            Service Description
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="service_des"
                                            placeholder="Service Description"
                                            value={selectedServiceDes}
                                            readOnly
                                        />
                                    </Form.Group>
                                )}

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
                                        <Icon icon={faPaw} />   Species
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