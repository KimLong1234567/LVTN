import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap'
import { ToastContainer, toast } from 'react-toastify';
function Category(props) {
    const [type, setType] = useState([])
    const [newType, setNewType] = useState([])
    const [show, setShow] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [typeFind, setTypeFind] = useState([])
    const [files, setFiles] = useState()
    const changeFile = (e) => {
        setFiles(e.target.files[0]);
        console.log(e.target.files);
    }
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/cate/')
            .then((res) => {
                console.log(res.data.data)
                setType(res.data.data)
                setTypeFind(res.data.data)
            })
        // .catch((console.log("loi");))
    }, [refresh])
    const deleteBrand = (id) => {
        axios
            .delete(`http://localhost:5000/api/cate/${id}`)
            .then((res) => {
                toast('SPECIES ALREADY DELETED.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setTimeout(
                    function () {
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
        setRefresh((prev) => prev + 1);
    }
    const onChange = (e) => {
        setNewType({ ...newType, [e.target.name]: e.target.value })
        setShow({ ...show, [e.target.name]: e.target.value })
    }
    const buildFormData = (formData, data, parentKey) => {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;
            formData.append(parentKey, value);
        }
    }

    const addType = async () => {
        const formdata = new FormData()
        formdata.append('cate_img', files)
        buildFormData(formdata, newType);
        axios
            .post("http://localhost:5000/api/cate/", formdata, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
                toast.success('ADD SUCCESS.', {
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
            .catch((Error) => {
                toast.error('Error, please check it.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
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
    const updateType = async (id) => {
        const formdata = new FormData()
        formdata.append('cate_img', files)
        buildFormData(formdata, show);
        await axios
            .put(`http://localhost:5000/api/cate/${id}`, formdata, {}, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
                toast.info('UPDATE SUCCESS.', {
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
            .catch((error) => {
                toast.error('Error, please check it.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                setTimeout(
                    function () {
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
        setShow(false)
        setRefresh((prev) => prev + 1);
    }
    const TypeFind = (e) => {
        const temp = typeFind.filter(element => element.cate_name.toLowerCase().includes(e.target.value.toLowerCase()))
        console.log(temp);
        setType(temp)
    }
    const statusType = (id, c_status) => {
        console.log(id, c_status, type);
        axios
            .put(`http://localhost:5000/api/cate/status/${id}`, { c_status })
            .then((res) => {
                toast.info('Update success.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                setTimeout(
                    function () {
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
        setRefresh((prev) => prev + 1);
    }
    return (
        <div className='boder-main'>
            <ToastContainer />
            <div className='d-flex justify-content-between px-3 pb-2'>
                <h4 className='text-primary fw-bold text-uppercase'>Category List</h4>
                <input type="text"
                    className="form-control w-50 "
                    placeholder="Find species"
                    onChange={TypeFind}
                />
                <Button variant="success" onClick={() => setShow(true)}>Add new category <Icon icon={faSquarePlus} /></Button>
                <Modal show={show !== false} onHide={() => setShow(false)} id="edit">
                    <Modal.Header>
                        <Modal.Title>Category list</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control type="text" name="cate_name" placeholder={show.cate_name ? show.cate_name : "Category Name"} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file"
                                    multiple
                                    name="cate_img"
                                    onChange={changeFile}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            show.cate_id !== undefined ?
                                <Button variant="primary" onClick={() => updateType(show.cate_id)}>
                                    Update
                                </Button> :
                                <Button variant="success" onClick={() => addType()}>
                                    Add
                                </Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div >
            {
                type.length === 0 ?
                    <div className='mt-3 text-danger fw-bold'>No category found.</div> :
                    <table className="table table-bordered">
                        <thead>
                            <tr className="table-secondary text-center">
                                <th scope="col" className="col-1">
                                    No
                                </th>
                                <th scope="col">CATEGORY NAME</th>
                                <th scope="col" className="col-2">
                                    IMAGE
                                </th>
                                <th scope="col" className="col-2">
                                    ON SCREEN
                                </th>
                                <th scope="col" className="col-2" colSpan="2">
                                    MOVE
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-uppercase'>
                            {type.map((Type, i) => (

                                <tr key={i}>
                                    <td className="text-center">{i + 1}</td>
                                    <td>{Type.cate_name}</td>
                                    <td className="text-center">
                                        <img src={`/image/Loai/${Type.cate_img}`} className="mb-2 mt-2" style={{ width: "150px" }} alt="..." />
                                    </td>
                                    <td>
                                        <Form.Check type="switch" id='custom-switch' onChange={() => { statusType(Type.cate_id, Type.c_status) }} checked={Type.c_status === 1 ? true : false} />
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="text-success"
                                            data-bs-toggle="modal"
                                            data-bs-target="#edit"
                                            onClick={() => setShow(Type)}
                                        >
                                            <Icon icon={faPenToSquare} />
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button className="text-danger" onClick={() => deleteBrand(Type.cate_id)}>
                                            <Icon icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
        </div >
    );
}

export default Category;