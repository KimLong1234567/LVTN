import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap'
import { ToastContainer, toast } from 'react-toastify';
function Employee(props) {
    const [Accounts, setAccounts] = useState([])
    const [show, setShow] = useState(false)
    const [newAccount, setNewAccount] = useState({
        nv_gt: "",
        cv_id: "",
    })
    const [Refresh, setRefresh] = useState(0)
    const [FindAccount, setFindAccount] = useState([])
    const [cate, setCate] = useState([]);
    const [files, setFiles] = useState()

    const onChange = (e) => {
        // // const { name, value } = e.target;
        // // setNewAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
        // setNewAccount({ ...newAccount, [e.target.name]: e.target.value })
        // setShow({ ...show, [e.target.name]: e.target.value })
        const { name, value } = e.target;

        // Cập nhật newAccount và show dựa trên tên trường (name)
        setNewAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
        setShow((prevShow) => ({ ...prevShow, [name]: value }));
        console.log(value);
    }
    const handleFileChange = (e) => {
        setFiles(e.target.files[0]);
        console.log(e.target.files);
    };
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/cv/")
            .then((res) => {
                setCate(res.data.data)
            })
            .catch((error) => {
                console.error("Error fetching cate: ", error);
            });
    }, [Refresh])

    const handlCvChange = (e) => {
        const categoryId = e.target.value;
        setNewAccount({ ...newAccount, cv_id: categoryId });
        console.log(categoryId);
        // const cv_id = e.target.value;
        // setNewAccount({ ...newAccount, cv_id: cv_id });
        // console.log(cv_id);
    }
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/admins/")
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
        formDataToSend.append('nv_avt', files)
        console.log(formDataToSend);
        console.log(newAccount);
        axios
            .post("http://localhost:5000/api/admins/", formDataToSend, {})
            .then((res) => {
                toast.success('Create account success', {
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
            .delete(`http://localhost:5000/api/admins/${id}`)
            .then((res) => {
                toast.error('Account deteled', {
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
        formDataToSend.append('nv_avt', files)
        console.log(newAccount);
        axios
            .put(`http://localhost:5000/api/admins/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Đặt header đúng loại dữ liệu là multipart/form-data
                }
            })
            .then((res) => {
                console.log(formDataToSend);
                console.log(show);
                toast.info('Cập nhật thành công', {
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

    };
    const findaccount = (e) => {
        const temp = FindAccount.filter(element => element.nv_hoten.toLowerCase().includes(e.target.value.toLowerCase()))
        setAccounts(temp)
    }
    return (
        <div className='boder-main'>
            <ToastContainer />
            <div className='d-flex justify-content-between m-3'>
                <h4 className='text-primary fw-bold text-uppercase'>Employee List</h4>
                <input type="text"
                    className="form-control w-50 "
                    placeholder="Type employee name"
                    onChange={findaccount}
                />
                <Button variant="success" onClick={() => setShow(true)}>Add employee account <Icon icon={faSquarePlus} /></Button>
                <Modal show={show !== false} onHide={() => setShow(false)} id="edit">
                    <Modal.Header>
                        <Modal.Title>Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="text" name="nv_hoten" placeholder={show.nv_hoten ? show.nv_hoten : "Name"} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" name="nv_email" placeholder={show.nv_email ? show.nv_email : "Email"} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="nv_password" placeholder="Password" onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="nv_phone" placeholder={show.nv_phone ? show.nv_phone : "Phone"} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="nv_address" placeholder={show.nv_adress ? show.nv_adress : "Address"} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select aria-label="Default select example" name="nv_gt" onChange={onChange}>
                                    <option>-- Choose Gender--</option>
                                    <option value='nam'>Men</option>
                                    <option value='nữ'>Women</option>
                                    {/* <option name="nv_gt" value='unknow'>Không tiết lộ</option> */}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Position</Form.Label>
                                <Form.Select aria-label="Default select example" name="cv_id" onChange={handlCvChange}>
                                    <option>-- Choose Position --</option>
                                    {cate.map((category) => (
                                        <option key={category.cv_id} value={category.cv_id}>{category.cv_name}</option>
                                    ))}
                                    {/* <option name="cv_id" value=''>Quản Lý</option>
                                    <option name="cv_id" value=''>Nhân Viên</option> */}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Date Born</Form.Label>
                                <Form.Control type="text" name="nv_date" placeholder={show.nv_date ? show.nv_date : "dd/mm/yyyy"} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control type="file"
                                    multiple
                                    name="nv_avt"
                                    id='image'
                                    accept='image/*'
                                    // onChange={onChange}
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            show.nv_id !== undefined ?
                                <Button variant="primary" onClick={() => updateAccount(show.nv_id)}>
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
                    <div className='text-danger fw-bold mt-3 '> No employee found </div>
                    : <table className="table table-bordered">
                        <thead>
                            <tr className="table-secondary text-center">
                                <th scope="col-1">
                                    No
                                </th>
                                <th scope="col">Name</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Date Born</th>
                                {/* <th colSpan={2} scope='col-2'>TÀI KHOẢN</th> */}
                                <th scope='col-2'>Email</th>
                                <th scope="col">Image</th>
                                <th scope="col">Phone</th>
                                <th scope="col" className='col-2' colSpan="2">Move</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Accounts.map((account, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{account.nv_hoten}</td>
                                        <td>{account.nv_gt}</td>
                                        <td>{account.nv_date}</td>
                                        <td>Email: {account.nv_email}</td>
                                        {/* <td>MK: {account.nv_password}</td> */}
                                        <td>
                                            <img src={`/image/avt/${account.nv_avt}`} className="mb-2 mt-2" style={{ width: "150px" }} alt="..." />
                                        </td>
                                        <td>{account.nv_phone}</td>
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
                                            <button className="text-danger" onClick={() => deleteAccount(account.nv_id)} >
                                                <Icon icon={faTrashCan} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </div >
    );
}

export default Employee;