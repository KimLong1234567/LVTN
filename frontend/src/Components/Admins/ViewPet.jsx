import React, { useLayoutEffect, useState } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faCircleXmark, faFilter, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
function ViewPet(props) {
    const [show, setShow] = useState('')
    const [bill, setBill] = useState([])
    const [filterBill, setFilterBill] = useState([])
    const [refresh, setRefresh] = useState(0)
    const curentAccount = localStorage.admin ? JSON.parse(localStorage.admin) : null

    useLayoutEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:5000/api/pets/')
                .then((res) => {
                    const temp = res.data.data.filter((e) => (e.p_status !== 2))
                    setBill(temp.reverse())
                    setFilterBill(temp)
                })
        }
        fetchData()
    }, [refresh])
    function filter(Number) {
        setShow(Number)
        console.log(Number);
        var temp = []
        if (Number === 0) {
            temp = filterBill.filter(element => element.p_status === 0)
            console.log(temp);
        }
        else if (Number) {
            temp = filterBill.filter(element => element.p_status === Number)
            console.log(temp);
        }
        else {
            temp = filterBill
        }
        setBill(temp)
    }
    const onChange = (e) => {
        const temp = filterBill.filter(element => element.user_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setBill(temp)
    }
    function renderButton(status, id) {
        if (status === 1) { // da service
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' disabled >
                            <Icon icon={faCheckDouble} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' disabled>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                </>
            )
        }
        else if (status === 3) { // 3 = da xoa
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' disabled>
                            <Icon icon={faCheckDouble} />
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' disabled>
                            <Icon icon={faCircleXmark} />
                        </button>
                    </td>
                </>
            )
        }
        else if (status === 0) {
            return (
                <>
                    <td>
                        <button className='btn btn-outline-success' onClick={() => updateStatus(id, 1)}>
                            <Icon icon={faCheckDouble} />
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
    async function updateStatus(id, status) {

        await axios.put(`http://localhost:5000/api/pets/${id}`, {
            id: id,
            p_status: status,
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
    }
    function renderStatus(status) {
        if (status === 1) {
            return (
                <td className='text-primary fw-bold'>Done</td>
            )
        }
        else if (status === 3) {
            return (

                <td className='text-danger fw-bold'>Deleted</td>

            )
        }
        else if (status === 0) {
            return (

                <td className='text-warning fw-bold'>Wait</td>

            )
        }
        else {
            return (
                <td className='text-primary fw-bold'>{status}</td>
            )
        }
    }

    //pagination
    const [start, setStart] = useState(0)
    const end = start + 2;
    const dataPage = bill.slice(start, end);
    const pageCount = Math.ceil(bill.length / 2);
    const handlePageClick = (event) => {
        const number = (event.selected * 2) % bill.length;
        setStart(number);
    };

    return (
        <div className='boder-main'>
            <ToastContainer />
            <h2 className='text-uppercase text-center text-primary fw-bolder mt-2'>Pet management</h2>
            <h3 className='text-uppercase text-start text-success fw-bolder mx-2'>filter <Icon icon={faFilter} /></h3>
            <Row className='m-0'>
                <Col xs={12} md={3}>
                    <h4 style={{ color: 'tomato', fontWeight: "bolder" }}>All pets <input type='checkbox' onChange={() => { filter('') }} checked={show === ''} /> </h4>
                </Col>
                <Col xs={12} md={3}>
                    <h4 className='text-warning'>Wait <input type='checkbox' onChange={() => { filter(0) }} checked={show === 0} /> </h4>
                </Col>
                <Col xs={12} md={3}>
                    <h4 className='text-primary'>Finish <input type='checkbox' onChange={() => { filter(1) }} checked={show === 1} /> </h4>
                </Col>
                <Col xs={12} md={3}>
                    <h4 className='text-danger'>Deleted <input type='checkbox' onChange={() => { filter(3) }} checked={show === 3} /> </h4>
                </Col>
                <Col>
                    <div className='d-flex m-3 justify-content-center'>
                        <input type="text"
                            className="form-control w-50 "
                            placeholder="Input customer name"
                            onChange={onChange}
                        />
                    </div>
                </Col>
            </Row>
            <div style={{ width: "100%" }}>
                <div style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>
                    <table className="table table-bordered">
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
                            bill !== undefined && bill.length !== 0 ? (
                                <tbody>
                                    {
                                        dataPage.map((item, i) => (
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
                                                <td>{item.p_update === null ? "till waitting" : item.p_update = new Date(item.p_update).toLocaleString()}</td>
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
                    </table>
                    <ReactPaginate
                        previousLabel="Previous page"
                        nextLabel="Next page"
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
                </div>
            </div>
        </div>

    );
}

export default ViewPet;