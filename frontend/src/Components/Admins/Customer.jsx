import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap'
import { ToastContainer, toast } from 'react-toastify';
function Customer(props) {
    const [Accounts, setAccounts] = useState([])
    const [show, setShow] = useState(false)
    const [newAccount, setNewAccount] = useState({})
    const [Refresh, setRefresh] = useState(0)
    const [FindAccount, setFindAccount] = useState([])
    const [files, setFiles] = useState()
    const onChange = (e) => {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value })
        setShow({ ...show, [e.target.name]: e.target.value })
        console.log(newAccount);
    }
    const handleFileChange = (e) => {
        setFiles(e.target.files[0]);
        console.log(e.target.files);
    };
    // console.log(newAccount);
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users/")
            .then((res) => {
                setAccounts(res.data.data)
                setFindAccount(res.data.data)
            })
    }, [Refresh])
    const addAccount = () => {
        const formDataToSend = new FormData();
        for (let key in newAccount) {
            formDataToSend.append(key, newAccount[key]);
        }
        formDataToSend.append('user_avt', files)
        console.log(formDataToSend);
        console.log(newAccount);
        axios
            .post("http://localhost:5000/api/users/", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Đặt header đúng loại dữ liệu là multipart/form-data
                }
            })
            .then((res) => {
                toast.success('Create Succes', {
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
                    },
                    3000
                );
            })
        setShow(false);
    }
    const deleteAccount = (id) => {
        axios
            .delete(`http://localhost:5000/api/users/${id}`)
            .then((res) => {
                toast.error('Account detele', {
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
                    },
                    3000
                );
            })
    }
    const updateAccount = (id) => {
        const formDataToSend = new FormData();
        for (let key in show) {
            formDataToSend.append(key, show[key]);
        }
        formDataToSend.append('user_avt', files)
        console.log(newAccount);
        axios
            .put(`http://localhost:5000/api/users/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Đặt header đúng loại dữ liệu là multipart/form-data
                }
            })
            .then((res) => {
                toast.info('Update Success', {
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
                    },
                    3000
                );
            })
        setShow(false)
    }
    const findaccount = (e) => {
        const temp = FindAccount.filter(element => element.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setAccounts(temp)
    }
    return (
        <div className='boder-main'>
            <ToastContainer />
            <div className='d-flex justify-content-between m-3'>
                <h4 className='text-primary fw-bold text-uppercase'>Customer account list</h4>
                <input type="text"
                    className="form-control w-50 "
                    placeholder="Type name customer"
                    onChange={findaccount}
                />
                <Button variant="success" onClick={() => setShow(true)}>Add new account <Icon icon={faSquarePlus} /></Button>
                <Modal show={show !== false} onHide={() => setShow(false)}>
                    <Modal.Header>
                        <Modal.Title>Customer Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="text" name="user_name" placeholder={show.user_name ? show.user_name : "Name"} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" name="user_email" placeholder={show.user_email ? show.user_email : "Email"} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="user_password" placeholder="Password" onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="user_phone" placeholder={show.user_phone ? show.user_phone : "Phone"} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select aria-label="Default select example" name="user_gt" onChange={onChange}>
                                    <option>-- Choose Gender --</option>
                                    <option value='nam'>Men</option>
                                    <option value='nữ'>Women</option>
                                    {/* <option name="nv_gt" value='unknow'>Không tiết lộ</option> */}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="user_address" placeholder={show.user_address ? show.user_address : "Address"} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control type="file"
                                    multiple
                                    name="user_avt"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            show.user_id !== undefined ?
                                <Button variant="primary" onClick={() => updateAccount(show.user_id)}>
                                    Update
                                </Button> :
                                <Button variant="success" onClick={() => addAccount()}>
                                    Add
                                </Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
            {
                Accounts.length === 0 ?
                    <div className='text-danger fw-bold mt-3 h4'> No customer found </div> :
                    <table className="table table-bordered">
                        <thead>
                            <tr className="table-secondary text-center">
                                <th scope="col" className="col-1">
                                    No
                                </th>
                                <th scope="col">Name</th>
                                {/* <th scope="col-2" colSpan={2}>TÀI KHOẢN</th> */}
                                <th scope="col">Email:</th>
                                <th scope="col">Image</th>
                                <th scope="col">Phone</th>
                                <th scope='col'>Address </th>
                                <th scope="col" className='col-2' colSpan="2">Move</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Accounts.map((account, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{account.user_name}</td>
                                        <td>Email:{account.user_email} </td>
                                        {/* <td>MK:{account.user_password}</td> */}
                                        <td>
                                            <img src={`/image/avt/${account.user_avt}`} className="mb-2 mt-2" style={{ width: "150px" }} alt="..." />
                                        </td>
                                        <td>{account.user_phone}</td>
                                        <td>{account.user_address}</td>
                                        <td className="text-center">
                                            <button
                                                className="text-success"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit"
                                                onClick={() => setShow(account)}

                                            >
                                                <Icon icon={faPenToSquare} />
                                            </button>
                                        </td>
                                        <td className="text-center">
                                            <button className="text-danger" onClick={() => deleteAccount(account.user_id)} >
                                                <Icon icon={faTrashCan} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </div>
    );
}

export default Customer;