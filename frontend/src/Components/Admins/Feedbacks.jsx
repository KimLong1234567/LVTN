import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Button, Form, Modal } from 'react-bootstrap';
import { faCommentDots, faReplyAll } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
function Feedbacks(props) {
    const [feedback, setFeedback] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [reply, setReply] = useState({})
    const [refresh, setRefresh] = useState(0)

    const onchange = (e) => {
        setReply({ ...reply, [e.target.name]: e.target.value, lh_email: showModal.lh_email })
    }
    console.log(showModal);
    console.log(reply);
    useEffect(() => {
        axios.get('http://localhost:5000/api/contacts/')
            .then((res) => {
                setFeedback(res.data.data)
            })
    }, [refresh])
    function addFeedback(id) {
        axios.put(`http://localhost:5000/api/contacts/${id}`, reply)
            .then((res) => {
                toast.success('Phản hồi khách hàng thành công.', {
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
    return (
        <div className='boder-main'>
            <ToastContainer />
            <Modal show={showModal !== false} onHide={() => setShowModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={4} placeholder="feedback content" name='lh_ph' onChange={onchange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => addFeedback(showModal.lh_id)}>
                        feedback
                    </Button>
                </Modal.Footer>
            </Modal>
            <h2 className='text-primary text-uppercase mt-2'>Customer Care</h2>
            <table className="table table-bordered">
                <thead>
                    <tr className="table-secondary text-center">
                        <th scope="col-1">No</th>
                        <th scope="col">Customer or Guest Name: </th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Content</th>
                        <th scope="col">Image</th>
                        <th scope="col">Status</th>
                        <th scope="col">Feedback</th>
                    </tr>
                </thead>
                {
                    feedback !== undefined && feedback.length !== 0 ?
                        feedback.map((item, i) => {
                            return (
                                < tbody key={i} >
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{item.lh_name}</td>
                                        <td>{item.lh_email}</td>
                                        <td>{'' + item.lh_sdt}</td>
                                        <td>{item.lh_address}</td>
                                        <td>{item.lh_content}</td>
                                        {
                                            item.lh_img ?
                                                <td>
                                                    <img src={`/image/contacts/${item.lh_img}`} alt='...' style={{ width: '150px' }} />
                                                </td>
                                                : <td className='fw-bolder'>No image</td>
                                        }
                                        {
                                            item.lh_status === 1 ?
                                                <>

                                                    <td className='text-success fw-bolder'>feedbacked</td>
                                                    <td><Button variant='success' disabled> <Icon icon={faCommentDots} /></Button></td>
                                                </> :
                                                <>
                                                    <td className='text-danger fw-bolder'>not feedback yet</td>
                                                    <td><Button variant='outline-warning' onClick={() => setShowModal(item)}> <Icon icon={faReplyAll} /></Button></td>
                                                </>
                                        }
                                    </tr>
                                </tbody>

                            )
                        }) :
                        <tbody>
                            <tr>
                                <td className='text-danger text-uppercase h3' colSpan={9}>Hiện chưa có phản hồi nào</td>
                            </tr>
                        </tbody>
                }

            </table>
        </div >
    );
}

export default Feedbacks;