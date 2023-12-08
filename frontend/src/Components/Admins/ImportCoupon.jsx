import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faBan, faEdit, faPlus, faPrint, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, InputGroup, Modal, Row, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function ImportCoupon(props) {
    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false);
    const Navigate = useNavigate();
    const [refresh, setRefresh] = useState(0)
    const [importProducts, setImportProducts] = useState([])
    // const curentAdmin = localStorage.admin ? JSON.parse(localStorage.admin) : null
    const curentAdmin = localStorage["admin"] ? JSON.parse(localStorage["admin"]) : null
    var [totalvalue, setTotalValue] = useState(0);


    const onChangegiatien = (id, e) => {
        const newValue = e.target.value;
        if (newValue >= 0) {
            for (let i = 0; i < importProducts.length; i++) {
                if (importProducts[i].sp_id === id) {
                    importProducts[i].sp_gianhap = newValue;
                    setImportProducts(prev => [...prev]);
                }
            }
        }
        else {
            toast.error('Input positive numbers', {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    }
    const onChangesoluong = (id, e) => {
        const newValue = e.target.value;
        if (newValue >= 0) {
            for (let i = 0; i < importProducts.length; i++) {
                if (importProducts[i].sp_id === id) {
                    importProducts[i].sp_sl = newValue;
                    setImportProducts(prev => [...prev]);
                }
            }
        }
        else {
            toast.error('Input positive numbers', {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    }
    useEffect(() => {
        axios.get('http://localhost:5000/api/products/')
            .then((res) => {
                setProducts(res.data.data)
            })
    }, [refresh])
    useEffect(() => {
        setTotalValue(importProducts.reduce((prev, current) => prev + current.sp_sl * current.sp_gianhap, 0))
    }, [importProducts])

    function showContent(product) {
        setImportProducts(prev => [...prev, product])
        setRefresh((prev) => prev + 1);
    }

    function deleteProduct(product) {
        setImportProducts((importProducts.filter((e) => e !== product)))
    }

    function addCoupon() {
        axios.post('http://localhost:5000/api/pn/', {
            nv_id: curentAdmin.nv_id,
            // products: importProducts,
            pn_total: totalvalue,
        })
            .then((res) => {
                const pn = res.data.data
                console.log(res.data.data, pn);
                addChiTietPn(pn);
                toast.success('Add Coupon Success', {
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
                        Navigate("/admin/phieunhap")
                    },
                    3000
                );
            })
    }
    console.log(importProducts);

    const addChiTietPn = (pn) => {
        // const pn_id = pn.pn_id; // Lấy mã phiếu nhập từ phiếu nhập đã tạo
        const ctpnp = {
            pn_id: pn.pn_id,
            products: importProducts,
        }
        console.log(ctpnp);
        // Gửi danh sách sản phẩm và mã phiếu nhập lên máy chủ để tạo các chi tiết phiếu nhập
        axios.post('http://localhost:5000/api/ctpn/', ctpnp, {
            headers: { 'Content-Type': 'application/json' }
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
    }
    return (
        <div className='boder-main'>
            <ToastContainer />
            <div >
                <h2 className="text-center text-uppercase fw-bold text-primary">
                    Import Coupon
                </h2>
                <Row className='justify-content-end m-2' >
                    <Col md="6" className='text-end '>
                        <Button variant='danger' className='m-2'>
                            <Icon icon={faBan} /> Delete
                        </Button>
                        <Button variant='success'>
                            <Icon icon={faPrint} /> Save
                        </Button>
                    </Col>
                </Row>
                <table className="table-export table table-bordered align-middle ">
                    <thead className="table-header table-secondary">
                        <tr>
                            <th scope="col-1">
                                No
                            </th>
                            <th scope="col">Product Name</th>
                            <th scope="col" className="col-2">
                                SPECIES
                            </th>
                            <th>IMAGE</th>
                            <th>PRICE</th>
                            <th>IMPORT PRICE</th>
                            <th>IMPORT QUANTITY</th>
                            <th scope="col" className="col">
                                MOVE
                            </th>
                            <th scope='col'>
                                <Button variant="success" onClick={() => setShow(true)}>
                                    <Icon className='fs-5 text-warning' icon={faPlus} />
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    {
                        importProducts.length !== 0 ?
                            importProducts.map((item, i) => (
                                <tbody key={i}>
                                    <tr >
                                        <td>{i + 1}</td>
                                        <td>{item.sp_name}</td>
                                        <td>{item.cate_name}</td>
                                        <td>
                                            <img src={`/image/SanPham/${item.sp_image}`} alt='...' style={{ width: "150px" }} />
                                        </td>
                                        <td>{item.sp_price}</td>
                                        <td>
                                            <InputGroup size='sm' className="mb-3">
                                                <InputGroup.Text id="nputGroup-sizing-sm"><Icon icon={faEdit} /></InputGroup.Text>
                                                <Form.Control
                                                    placeholder={item.sp_gianhap}
                                                    aria-label="Username"
                                                    name='ctpn_gianhap'
                                                    aria-describedby="nputGroup-sizing-sm"
                                                    className='text-center'
                                                    onChange={(e) => onChangegiatien(item.sp_id, e)}
                                                />
                                            </InputGroup>
                                        </td>
                                        <td>
                                            <InputGroup size='sm' className="mb-3">
                                                <InputGroup.Text id="nputGroup-sizing-sm"><Icon icon={faEdit} /></InputGroup.Text>
                                                <Form.Control
                                                    placeholder={item.sp_sl}
                                                    aria-label="Username"
                                                    name='ctpn_sl'
                                                    aria-describedby="nputGroup-sizing-sm"
                                                    className='text-center'
                                                    onChange={(e) => onChangesoluong(item.sp_id, e)}
                                                />
                                            </InputGroup>
                                        </td>
                                        <td>
                                            <Button variant='outline-danger' onClick={() => deleteProduct(item)}> <Icon icon={faTrashCanArrowUp} /></Button>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            )) : null
                    }
                    <tfoot>
                        <tr>
                            <td colSpan="6" className="text-start h5 fw-bold">SUM: </td>
                            <td colSpan="3" className="fw-bold">{totalvalue} $</td>
                        </tr>
                        <tr>
                            <td colSpan="12">
                                <Button variant='primary' onClick={() => addCoupon()} >ADD COUPON</Button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Products List</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowY: "scroll" }}>
                    {
                        products !== undefined && products.length !== 0 ?
                            products.map((item, i) => (
                                <div key={i} className='d-flex'>
                                    <button disabled className='fw-bold text-dark'>{i + 1}</button>
                                    <button className='border-0 btn btn-outline-info text-dark w-100 text-start m-1' onClick={() => showContent(item)}>{item.sp_name}</button>
                                </div>
                            )) :
                            <div>
                                <h5>Products not found</h5>
                            </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default ImportCoupon;