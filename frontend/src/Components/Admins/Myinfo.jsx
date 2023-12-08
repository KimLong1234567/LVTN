import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Button, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
function Myinfo(props) {
    const curentAdmin = localStorage["admin"] ? JSON.parse(localStorage["admin"]) : null
    const [show, setShow] = useState(false)
    const [Refresh, setRefresh] = useState(0)
    const [Accounts, setAccounts] = useState([])
    console.log(Accounts);
    console.log(curentAdmin);
    const [requested, setRequested] = useState(false);

    const [files, setFiles] = useState()
    // console.log(userId);
    const onChange = (e) => {
        const { name, value } = e.target;

        // Cập nhật newAccount và show dựa trên tên trường (name)
        setAccounts((prevAccount) => ({ ...prevAccount, [name]: value }));
        setShow((prevShow) => ({ ...prevShow, [name]: value }));
        console.log(value);
    }
    const handleFileChange = (e) => {
        setFiles(e.target.files[0]);
        console.log(e.target.files);
    };

    const update = (id) => {
        const formDataToSend = new FormData();
        for (let key in Accounts) {
            formDataToSend.append(key, Accounts[key]);
        }
        formDataToSend.append('nv_avt', files)
        console.log(formDataToSend);
        axios
            .put(`http://localhost:5000/api/admins/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Đặt header đúng loại dữ liệu là multipart/form-data
                }
            })
            .then((res) => {
                console.log(show);
                toast.info('Update success', {
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
                    }, 3000);
                setShow(false);
            })
            .catch(error => {
                console.error('Error update: ', error);
            });
        setShow(false)
    }
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/admins/${curentAdmin.nv_id}`)
            .then((res) => {
                // console.log(res.data.data);
                setRequested(true);  // Đã gọi request
                const adminData = res.data.data;
                if (Array.isArray(adminData) && adminData.length > 0) {
                    setAccounts({
                        ...Accounts,
                        nv_id: adminData[0].nv_id,
                        nv_email: adminData[0].nv_email,
                        nv_hoten: adminData[0].nv_hoten,
                        nv_phone: adminData[0].nv_phone,
                        nv_adress: adminData[0].nv_adress,
                        nv_avt: adminData[0].nv_avt,
                        nv_date: adminData[0].nv_date,
                        cv_name: adminData[0].cv_name,
                        nv_gt: adminData[0].nv_gt,
                    })
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Refresh, requested])
    // console.log(Accounts);
    if (!requested || !Accounts) {
        return null;
    }
    return (
        <div className='boder-main'>
            <ToastContainer />
            <h3 className='fw-bold text-uppercase mt-3 text-danger'> Your personal information</h3>
            <Modal show={show !== false} onHide={() => setShow(false)}>
                <Modal.Header>
                    <Modal.Title>Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="nv_hoten" placeholder={Accounts.nv_hoten} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder={Accounts.nv_email} onChange={onChange} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="nv_password" placeholder='Update password' onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="nv_phone" placeholder={Accounts.nv_phone} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="nv_adress" placeholder={Accounts.nv_adress} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select aria-label="Default select example" name='nv_gt' onChange={onChange}>
                                <option>--Choose--</option>
                                <option value='nam'>Nam</option>
                                <option value='nữ'>Nữ</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date Born</Form.Label>
                            <Form.Control type="text" name="nv_date" placeholder={Accounts.nv_date} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file"
                                multiple
                                name="nv_avt"
                                id='image'
                                accept='image/*'
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => update(show.nv_id)}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <table className="table table-bordered">
                <thead>
                    <tr className="table-secondary text-center">
                        <th scope="col">Staff</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Date Born</th>
                        <th scope="col">Email</th>
                        {/* <th scope="col">MẬT KHẨU</th> */}
                        <th scope="col">Image</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Position</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>{Accounts.nv_id}</td>
                        <td>{Accounts.nv_hoten}</td>
                        <td>{Accounts.nv_gt}</td>
                        <td>{Accounts.nv_date}</td>
                        <td>{Accounts.nv_email}</td>
                        {/* <td>{Accounts.password}</td> */}
                        <td>
                            <img src={`/image/avt/${Accounts.nv_avt}`} className="mb-2 mt-2" style={{ width: "150px" }} alt="..." />
                        </td>
                        <td>{Accounts.nv_phone}</td>
                        <td>{Accounts.nv_adress}</td>
                        {/* <td>Nhân viên</td> */}
                        <td>{Accounts.cv_name}</td>
                        <td>
                            <Button variant="success" onClick={() => setShow(Accounts)} data-bs-toggle="modal" data-bs-target="#edit"><Icon icon={faPenToSquare} /></Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Myinfo;