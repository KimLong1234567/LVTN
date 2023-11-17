import React, { useLayoutEffect, useState } from 'react';
import { Row, Col, Container, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheckToSlot, faCircleXmark, faCommentMedical, faFilter, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
function ViewPet(props) {
    const [show, setShow] = useState('')
    const [pet, setPet] = useState([])
    const [filterPet, setFilterPet] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [feedback, setFeedback] = useState({})
    const [start, setStart] = useState(0)

    const curentAccount = localStorage.currentAccount ? JSON.parse(localStorage.currentAccount) : null
    console.log(curentAccount);
    useLayoutEffect(() => {
        async function fetchData() {
            const res = await axios.get(`http://localhost:5000/api/pets/userPet/${curentAccount.user_id}`)
            setPet(res.data.data)
            console.log(res.data.data)
            setFilterPet(res.data.data)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])
    function filter(Number) {
        setShow(Number)
        var temp = []
        if (Number) {
            temp = filterPet.filter(element => element.p_status === Number)
        }
        else {
            temp = filterPet
        }
        setPet(temp)
    }

    async function updateStatus(id, status) {
        await axios.put(`http://localhost:5000/api/bill/${id}`, {
            id: id,
            status: status
        })
            .then((res) => {
                toast.info('Cập nhật thành công.', {
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
                        setRefresh((prev) => prev + 1)
                        setShowModal(false)
                    },
                    3000
                );

            })
    }

    function renderButton(p_status, id) {
        //da service
        if (p_status === 1) {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' onClick={() => setShowModal(true)}>
                            <Icon icon={faCommentMedical} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' disabled>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-warning' onClick={() => updateStatus(id, 'Chờ xác nhận')} >
                            <Icon icon={faTrashCanArrowUp} />
                        </button>
                    </td>
                </>
            )
        }
        // da xoa
        else if (p_status === 3) {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' disabled>
                            <Icon icon={faCheckToSlot} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' disabled>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-warning' onClick={() => updateStatus(id, 'Chờ xác nhận')}>
                            <Icon icon={faTrashCanArrowUp} />
                        </button>
                    </td>
                </>
            )
        }
        // cho service
        else if (p_status === 0) {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' disabled>
                            <Icon icon={faCheckToSlot} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' onClick={() => updateStatus(id, 3)}>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                </>
            )
        }
    }
    function renderStatus(p_status) {
        if (p_status === 1) {
            return (
                <td className='text-success fw-bold'>finsid service</td>
            )
        }
        else if (p_status === 3) {
            return (

                <td className='text-danger fw-bold'>Deleted</td>

            )
        }
        else if (p_status === 0) {
            return (

                <td className='text-warning fw-bold'>Wait</td>

            )
        }
    }

    const onchange = (e) => {
        setFeedback({ ...feedback, [e.target.name]: e.target.value })
    }
    function addFeedback() {
        axios.post('http://localhost:5000/api/feedback/', {
            ...feedback,
            customer: curentAccount.user_id
        })
            .then((res) => {
                toast.success('Đã phản hồi, vui lòng kiểm tra email để nhận thông tin', {
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
                        setRefresh((prev) => prev + 1)
                        setShowModal(false)
                    },
                    3000
                );
            })
    }


    const pageCount = Math.ceil(pet.length / 2);
    const handlePageClick = (event) => {
        const number = (event.selected * 2) % pet.length;
        setStart(number);
    };

    return (
        <Container fluid className='padding-header'>
            <ToastContainer />
            <Modal show={showModal !== false} onHide={() => setShowModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Đánh giá dịch vụ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={4} placeholder="Vui lòng cho chúng tôi ý kiến về dịch vụ của chúng tôi" name='content' onChange={onchange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Đính kèm ảnh</Form.Label>
                            <Form.Control type="file"
                                multiple
                                name="image"
                                onChange={onchange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => addFeedback()}>
                        Thêm nhận xét
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <h2 className='text-primary text-uppercase'>Pets List</h2>
                <Row className='m-0'>
                    <h3 className='text-uppercase text-start text-success fw-bolder mx-2'>filter <Icon icon={faFilter} /></h3>
                    <Col xs={12} md={3}>
                        <h4 style={{ color: 'tomato', fontWeight: "bolder" }}>All pets <input type='checkbox' onChange={() => { filter('') }} checked={show === ''} /> </h4>
                    </Col>
                    <Col xs={12} md={3}>
                        <h4 className='text-warning'>Wait for care <input type='checkbox' onChange={() => { filter(0) }} checked={show === 0} /> </h4>
                    </Col>
                    <Col xs={12} md={3}>
                        <h4 className='text-primary'>finish care <input type='checkbox' onChange={() => { filter(1) }} checked={show === 1} /> </h4>
                    </Col>
                    <Col xs={12} md={3}>
                        <h4 className='text-danger'>Delete book <input type='checkbox' onChange={() => { filter(3) }} checked={show === 3} /> </h4>
                    </Col>
                </Row>
            </div>
            <table className="table table-bordered align-middle justify-content-center">
                <thead>
                    <tr className="table-secondary text-center">
                        <th scope="col">No</th>
                        <th scope="col">Pet name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Pet des</th>
                        <th scope="col">Pet's ower</th>
                        <th scope="col">Pet loai</th>
                        <th scope="col">Date book</th>
                        <th scope="col">Pet service fee</th>
                        <th scope="col">Pet service date</th>
                        <th scope='col'>Status</th>
                        <th scope="col" colSpan={3}>Move</th>
                    </tr>
                </thead>
                {
                    pet !== undefined && pet.length !== 0 ? (
                        <tbody>
                            {
                                pet.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.p_name}</td>
                                        <td>
                                            <img src={`/image/Pet/${item.p_img}`} style={{ width: "100px" }} alt='...' />
                                        </td>
                                        <td>{item.service_name}</td>
                                        <td>{item.user_name}</td>
                                        <td>{item.cate_name}</td>
                                        <td>{item.p_create = new Date(item.p_create).toLocaleString()}</td>
                                        <td>{item.service_price} $</td>
                                        <td>{item.p_update !== undefined ? "till waitting" : item.p_update = new Date(item.p_update).toLocaleString()}</td>
                                        {renderStatus(item.p_status)}
                                        {renderButton(item.p_status, item.p_id)}
                                    </tr>
                                ))}
                            <tr>
                            </tr>
                        </tbody >
                    ) : (
                        <tbody>
                            <tr className='text-center fw-bolder text-danger h3'><td colSpan={12}>No pets in book pets</td></tr>
                        </tbody>
                    )
                }
            </table >
            <ReactPaginate
                previousLabel="Trang trước"
                nextLabel="Trang sau"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={pageCount}
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName="pagination justify-content-center mt-5"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
                hrefAllControls
            // forcePage={currentPage}

            />
        </Container >
    );
}

export default ViewPet;