import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faSquarePlus, } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpRightFromSquare, } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
function Products() {
    // const curentAdmin = localStorage.admin ? JSON.parse(localStorage.admin) : null
    const curentAdmin = localStorage["admin"] ? JSON.parse(localStorage["admin"]) : null
    const [refresh, setRefresh] = useState(0)
    const [Type, setType] = useState([])
    const [Products, setProducts] = useState([])
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState({
        sp_image: null,
        nv_id: curentAdmin.nv_id,
        sp_code: '',
        sp_name: '',
        sp_price: 0,
        sp_describe: '',
        sp_sl: 0,
        sp_xuatxu: '',
        cate_id: '',
        sp_gianhap: 0,
        sp_note: '',
        pn_total: 0,
    })
    const [pn, setPn] = useState({
        sp_code: '',
        pn_total: selected.sp_sl * selected.sp_gianhap,
        nv_id: curentAdmin.nv_id,
    })
    const [total, setTotal] = useState({
        pn_total: 0,
    })
    const [ProductFind, setProductFind] = useState([])
    const [files, setFiles] = useState()

    const changeFile = (e) => {
        setFiles(e.target.files[0]);
        console.log(e.target.files);
    }
    const onChange = (e) => {
        const { name, value } = e.target;

        setSelected({ ...selected, [name]: value })
        setPn({ ...selected, [name]: value })
        setTotal({ ...total, pn_total: selected.sp_sl * selected.sp_gianhap })
        setShow((prevShow) => ({ ...prevShow, [name]: value }));
        console.log(selected);
        console.log(pn);
        console.log(pn.sp_code);
        console.log('total:', total.pn_total);
    }
    const handlChange = (e) => {
        const categoryId = e.target.value;
        setSelected({ ...selected, cate_id: categoryId });
        console.log(categoryId);
    }
    // console.log(curentAdmin);
    const productData = {
        sp_image: files,
        nv_id: curentAdmin.nv_id,
        sp_code: selected.sp_code,
        sp_name: selected.sp_name,
        sp_price: selected.sp_price,
        sp_describe: selected.sp_describe,
        sp_sl: selected.sp_sl,
        sp_xuatxu: selected.sp_xuatxu,
        cate_id: selected.cate_id,
        sp_gianhap: selected.sp_gianhap,
        sp_note: selected.sp_note
    };
    // console.log(productData);

    const pnData = {
        sp_code: pn.sp_code,
        nv_id: curentAdmin.nv_id,
        pn_total: total.pn_total,
    }
    // console.log(pnData);

    const addProducts = () => {

        console.log(productData);
        axios
            .post('http://localhost:5000/api/products', productData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {

                console.log(pnData);
                addPnhap();
                toast.success('Add product success', {
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
                setShow(false);
            })
            .catch((Error) => {
                toast.error('Error, please contact admin.', {
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
    }
    const addPnhap = () => {
        axios
            .post('http://localhost:5000/api/pn', pnData, {}, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
                // Xử lý khi thêm mới phiếu nhập thành công
                console.log('Thêm mới phiếu nhập thành công:', res.data);
                // Thực hiện các hành động khác sau khi thêm mới phiếu nhập
            })
            .catch((error) => {
                // Xử lý khi có lỗi xảy ra
                console.error('Đã xảy ra lỗi khi thêm mới phiếu nhập:', error);
                // Thực hiện các hành động khác khi xảy ra lỗi
            });
    };
    const statusProducts = (id, s_status) => {
        axios
            .put(`http://localhost:5000/api/products/status/${id}`, { s_status })
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
    // console.log(productData);
    const editProducts = async (id) => {
        const formdata = new FormData()
        formdata.append('file', files)
        buildFormData(formdata, selected);

        await axios
            .put(`http://localhost:5000/api/products/${id}`, productData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
                toast.info('Update success.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setShow(false);
                setTimeout(
                    function () {
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
    }
    const deleteProducts = (id) => {
        axios
            .delete(`http://localhost:5000/api/products/${id}`,)
            .then((res) => {
                toast('Products was deteled.', {
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
            .get('http://localhost:5000/api/products/')
            .then((res) => {
                setProducts(res.data.data)
                // console.log(res.data.data)
                setProductFind(res.data.data)
            })
    }, [refresh])

    const productsfind = (e) => {
        const temp = ProductFind.filter(element => element.sp_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setProducts(temp)
    }
    return (
        <div className='boder-main'>
            <ToastContainer />
            <div className='d-flex justify-content-between mt-2 px-4 pb-2'>
                <h4 className='text-primary fw-bold text-uppercase'>products list</h4>
                <input type="text"
                    className="form-control w-50 "
                    placeholder="Search products"
                    onChange={productsfind}

                />
                <Button variant="success" onClick={() => setShow(true)}>add new product <Icon icon={faSquarePlus} /></Button>
                <Modal show={show !== false} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title> {selected.sp_id ? "Update product" : "Add new product"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>PRODUCT CODE</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={selected.sp_code ? selected.sp_code : "product code "}
                                            name="sp_code"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>PRODUCT NAME</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={selected.sp_name ? selected.sp_name : "product name"}
                                            name="sp_name"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>IMPORT PRICE</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder={selected.sp_gianhap ? selected.sp_gianhap : "import price"}
                                            name="sp_gianhap"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>QUANTITY</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder={selected.sp_sl ? selected.sp_sl : "quantity"}
                                            name="sp_sl"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>SUM </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="pn_total"
                                            onChange={onChange}
                                            value={selected.sp_sl * selected.sp_gianhap}
                                            readOnly // Đặt readOnly để ngăn người dùng chỉnh sửa giá trị
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>SPECIES</Form.Label>
                                        <Form.Select aria-label="Default select example" name="type" onChange={handlChange}>
                                            <option>--SELECT--</option>
                                            {Type.map((type, idx) => (
                                                <option name="cate_id" value={type.cate_id} key={idx}>{type.cate_name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group controlId="formFileMultiple">
                                        <Form.Label >IMAGE</Form.Label>
                                        <Form.Control
                                            type="file"
                                            multiple
                                            name="sp_image"
                                            onChange={changeFile}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>describe</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={selected.sp_describe ? selected.sp_describe : "add some describe"}
                                            name="sp_describe"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Form.Label>DETAIL PRODUCT:</Form.Label>
                                <Col xs={6}>
                                    <Form.Group className="mt-2" controlId="exampleForm.ControlInput1">
                                        <Form.Label className='mt-2'>ORIGIN</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={selected.sp_xuatxu ? selected.sp_xuatxu : "origin"}
                                            name="sp_xuatxu"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mt-2" controlId="exampleForm.ControlInput1">
                                        <Form.Label className='mt-2'>PRICE</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder={selected.sp_price ? selected.sp_price : "price"}
                                            name="sp_price"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Label className='mt-2'>Note</Form.Label>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            placeholder={selected.sp_note ? selected.sp_note : "Take some note if need"}
                                            name="sp_note"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            selected.sp_id !== undefined ?
                                <Button variant="primary" onClick={() => editProducts(selected.sp_id)}>
                                    UPDATE
                                </Button> :
                                <Button variant="primary" onClick={(e) => { e.preventDefault(); addProducts(); }}>
                                    ADD
                                </Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
            {
                Products.length === 0 ?
                    <div className='mt-3 text-danger fw-bold '>No products found</div> :
                    <table className="table table-bordered">
                        <thead>
                            <tr className="table-secondary text-center">
                                <th scope="col" className="col-1">
                                    No
                                </th>
                                <th scope="col">NAME PRODUCT</th>
                                <th scope="col" className="col-2">
                                    SPECIES
                                </th>
                                <th>IMAGE</th>
                                <th>IMPORT PRICE</th>
                                <th>PRICE</th>
                                <th>QUANTITY</th>
                                <th>ON SCREEN</th>
                                <th scope="col" className="col-2" colSpan="3">
                                    MOVE
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Products.map((product, idx) => (
                                <tr key={idx} >
                                    <td> {idx + 1}</td>
                                    <td>{product.sp_name}</td>
                                    <td className="text-center text-uppercase">
                                        {product.cate_name}
                                    </td>
                                    <td >
                                        <img src={`/image/SanPham/${product.sp_image}`} className="mb-2 mt-2" style={{ width: "150px" }} alt="..." />
                                    </td>
                                    <td>{product.sp_gianhap}</td>
                                    <td>{product.sp_price}</td>
                                    <td>{product.sp_sl}</td>
                                    <td>
                                        <Form.Check type="switch" id='custom-switch' onChange={() => { statusProducts(product.sp_id, product.s_status) }} checked={product.s_status === 1 ? true : false} />
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="text-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#i${product.sp_id}`}
                                        >
                                            <Icon icon={faArrowUpRightFromSquare} />
                                        </button>
                                        <div
                                            className="modal fade"
                                            id={`i${product.sp_id}`}
                                            tabIndex="-1"
                                            aria-hidden="true"
                                        >
                                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <div className="modal-title fs-5 fw-bold text-uppercase">
                                                            Detail products
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                        ></button>
                                                    </div>
                                                    <div className="modal-body text-start">
                                                        <p className="text-uppercase">
                                                            Product code: <b>{product.sp_code}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            Product name: <b>{product.sp_name}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            species: <b>{product.cate_name}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            price: <b>{product.sp_price} $</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            Note: <b>{product.sp_note}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            Detail: <b>{product.sp_describe}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            staff: <b>{product.nv_hoten}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            date create : <b>{product.sp_update = new Date(product.sp_create).toLocaleString()}</b>
                                                        </p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-success me-2"
                                                            data-bs-dismiss="modal"
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <button className='text-success' onClick={() => {
                                            setShow(true);
                                            setSelected(product)
                                        }}><Icon icon={faPenToSquare} /></button>
                                    </td>
                                    <td className="text-center">
                                        <button className="text-danger" onClick={() => deleteProducts(product.sp_id)} >
                                            <Icon icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table >
            }

        </div >

    );
}

export default Products;