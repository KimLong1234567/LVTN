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
        setReply({ ...reply, [e.target.name]: e.target.value })
    }
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
                    <Modal.Title>Phản hồi khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={4} placeholder="Phản hồi ý kiến khách hàng" name='lh_ph' onChange={onchange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => addFeedback(showModal.lh_id)}>
                        Phản hồi
                    </Button>
                </Modal.Footer>
            </Modal>
            <h2 className='text-primary text-uppercase mt-2'>chăm sóc khách hàng</h2>
            <table className="table table-bordered">
                <thead>
                    <tr className="table-secondary text-center">
                        <th scope="col-1">STT</th>
                        <th scope="col">KHÁCH HÀNG</th>
                        <th scope="col">TÀI KHOẢN</th>
                        <th scope="col">SĐT</th>
                        <th scope="col">ĐỊA CHỈ</th>
                        <th scope="col">NỘI DUNG</th>
                        <th scope="col">HÌNH ẢNH</th>
                        <th scope="col">TRẠNG THÁI</th>
                        <th scope="col">PHẢN HỒI</th>
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
                                                : <td className='fw-bolder'>Không có hình ảnh</td>
                                        }
                                        {
                                            item.lh_status === 1 ?
                                                <>

                                                    <td className='text-success fw-bolder'>Đã phản hồi</td>
                                                    <td><Button variant='success' disabled> <Icon icon={faCommentDots} /></Button></td>
                                                </> :
                                                <>
                                                    <td className='text-danger fw-bolder'>Chưa phản hồi</td>
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