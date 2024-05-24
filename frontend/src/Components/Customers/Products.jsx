import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faMicrophone, } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Card, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
function Products(props) {
    const [type, setType] = useState([])
    const [sort, setSort] = useState('')
    const [Products, setProducts] = useState([])
    const [ProductFind, setProductFind] = useState([])
    const [start, setStart] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    //pagination
    // console.log(type);
    function PaginatedItems({ itemsPerPage }) {
        const end = start + itemsPerPage;
        const dataPage = Products.slice(start, end);
        const pageCount = Math.ceil(Products.length / itemsPerPage);
        const handlePageClick = (event) => {
            const number = (event.selected * itemsPerPage) % Products.length;
            setStart(number);
        };
        const currentPage = Math.round(Products.length / itemsPerPage);
        return (
            <Row>
                {
                    dataPage.length === 0 ? <h4 className='text-danger fw-bold'>No Products found</h4> :
                        dataPage.map((item, idx) => (
                            renderProducts(item, idx)
                        ))
                }
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
                    forcePage={currentPage}

                />
            </Row>
        );
    }
    //voice
    const SpeechToText = window.speechRecognition || window.webkitSpeechRecognition;
    var speechApi = new SpeechToText();
    var status = 0

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/cate/')
            .then((res) => {
                // console.log(res);
                setType(res.data.data)
                // console.log(res.data.data)
            })
    }, [])
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/products/')
            .then((res) => {
                // console.log(res);
                const temp = res?.data?.data?.filter((e) => (e.deleted !== 0))
                setProducts(temp)
                setProductFind(temp)
            })
    }, [])
    const onChange = (e) => {
        const temp = ProductFind.filter(element => element.sp_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setProducts(temp)
    }
    console.log(Products);
    const ProductType = (name) => {
        const filterId = parseInt(name, 10);
        const temp = ProductFind.filter(element => element.cate_id === filterId)
        console.log(name, temp)
        setProducts(temp)
    }

    function renderProducts(item, idx) {
        if (item.s_status && item.sp_sl !== 0) {
            return (
                <Col xs={12} md={6} sm={6} key={idx} className='g-3'>
                    <Card className='card cardProduct border-success border border-2' >
                        <Link to={`/detail/${item.sp_id}`}>
                            <Card.Img variant="top" src={`/image/SanPham/${item.sp_image}`} className='w-100' style={{ height: '430px' }} />
                        </Link>
                        <Card.Body>
                            <Card.Title className='text-uppercase mt-3' >{item.sp_name}</Card.Title>
                            <Card.Subtitle className='text-line'>
                                <div>
                                    <p className='p-0 m-0 fw-bolder'>Price </p>
                                    <p className='text-primary fw-bold'>
                                        {new Intl.NumberFormat('vi').format(item.sp_price)} $
                                    </p>
                                </div>
                                <span className=''>{item.sp_describe}</span>
                            </Card.Subtitle>
                        </Card.Body>
                        <Link className="text-primary fw-bold text-center" to={`/detail/${item.sp_id}`}>
                            <Card.Title className='footer-card'>
                                Details
                            </Card.Title>
                        </Link>
                    </Card>
                </Col >
            )
        }
        else {
            return (
                <Col xs={12} md={6} sm={6} key={idx} className='g-3'>
                    <Card className='card cardProduct border-success border border-2' >
                        <Card.Img variant="top" src={`/image/SanPham/${item.sp_image}`} className='w-100' style={{ height: '430px' }} />
                        <Card.Body>
                            <Card.Title className='text-uppercase mt-3'>{item.sp_name}</Card.Title>
                            <Card.Subtitle className='text-line'>
                                <div>
                                    <p className='p-0 m-0 fw-bolder'>Price </p>
                                    <p className='text-primary fw-bold'>
                                        {new Intl.NumberFormat('vi').format(item.sp_price)} $
                                    </p>
                                </div>
                                <span className=''>{item.sp_describe}</span>
                            </Card.Subtitle>
                        </Card.Body>
                        <Card.Title className='footer-card'>
                            <Link className="text-danger fw-bolder" to={`/detail/${item.sp_id}`} style={{ pointerEvents: "none" }}>sold out</Link>
                        </Card.Title>
                    </Card>
                </Col>
            )
        }
    }
    function renderType(item, idx) {
        if (item.c_status === 1) {
            return (
                <h5 key={idx} className='m-1 text-start text-uppercase type' >
                    <Link className=" text-dark" onClick={() => ProductType(item.cate_id)}><img src={`/image/Loai/${item.cate_img}`} alt='...' style={{ width: "100px" }} className='m-3' />{item.cate_name}</Link>
                </h5>
            )
        }
    }

    const setPrice = (e) => {
        const temp = (ProductFind.filter(element => element.sp_price < e.target.value))
        setProducts(temp)
    }

    useEffect(() => {
        if (sort === 'Từ thấp đến cao') {
            axios
                .get('http://localhost:5000/api/products/low/a')
                .then((res) => {
                    const temp = res.data.data;
                    setProducts(temp)
                })
        }
        else if (sort === "Từ cao đến thấp") {
            axios
                .get('http://localhost:5000/api/products/high/b')
                .then((res) => {
                    // console.log(res);
                    const temp = res.data.data;
                    setProducts(temp)
                })
        }
    }, [sort, Products])

    //voice
    speechApi.continuous = true;
    speechApi.interimResults = false;
    speechApi.lang = 'en-US'
    window.onload = function () {
        document.getElementById("voice").addEventListener("click", () => {
            if (status === 1) {
                status = 0;
                return speechApi.stop();
            }
            speechApi.start();
            status = 1;
            speechApi.onresult = function (event) {
                speechApi.stop()
                console.log(event.results[0][0].transcript)
                if (event.results && event.results[0] && event.results[0][0]) {
                    const transcript = event.results[0][0].transcript;
                    const sanitizedTranscript = transcript.replace(/\./g, ''); //loai dau cham
                    console.log(sanitizedTranscript);
                    setSearchValue(sanitizedTranscript); // Cập nhật giá trị từ giọng nói
                    if (ProductFind && sanitizedTranscript) {
                        const temp = ProductFind.filter(e => e.sp_name && e.sp_name.toLowerCase().includes(sanitizedTranscript.toLowerCase()));
                        setProducts(temp);
                    }
                }
                status = 0
            };
            speechApi.onspeechend = function () {
                speechApi.stop();
                status = 0
            };
        });
    }

    return (
        <div >
            <video controls autoPlay muted loop preload='auto' className='w-100'>
                <source src='/image/Banner/videodemo1.mp4' type='video/mp4' />
            </video>
            <Container fluid>
                <Row className='d-flex mt-4 pb-4 justify-content-center'>
                    <div className='d-flex w-50' >
                        <input type="text"
                            className="form-control mx-1"
                            placeholder="LOOKING FOR PRODUCT? TYPE HERE"
                            onChange={onChange}
                            style={{ height: "50px" }}
                        // value={searchValue}
                        />
                        <Button variant='outline-success' id='voice' className='text-start'> <Icon icon={faMicrophone} /> </Button>
                    </div>
                </Row>
                <Row >
                    <Col xs={3} >
                        <div className='text-start bg-light p-3 ' style={{ position: 'sticky', zIndex: 1000, fontFamily: "cursive" }}>
                            <h4 style={{ color: "rgb(255,142,81)", textTransform: "uppercase" }}> <Icon icon={faCaretRight} className='me-1 mt-1' />Shop by pet</h4>
                            {
                                type.map((item, idx) => (
                                    renderType(item, idx)
                                ))
                            }
                        </div>
                        <div className='text-start bg-light mt-5 p-3' style={{ position: 'sticky', zIndex: 1000 }}>
                            <h4 style={{ color: "rgb(255,142,81)", textTransform: "uppercase" }}  > <Icon icon={faCaretRight} className='me-1 mt-1' />Price</h4>
                            <Row className='m-1 d-flex text-primary'>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label="Low to high" name='sp_price' value={'Từ thấp đến cao'} onChange={(e) => {
                                        setSort(e.target.value)

                                    }} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label="High to low" name='sp_price' value={'Từ cao đến thấp'} onChange={(e) => {
                                        setSort(e.target.value)

                                    }} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label="Min 10$" value={10} name='sp_price' onChange={setPrice} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label=" Min 20$" value={20} name='sp_price' onChange={setPrice} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label=" Min 30$" value={30} name='sp_price' onChange={setPrice} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label="Min 40$" value={40} name='sp_price' onChange={setPrice} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label="Min 50$" value={50} name='sp_price' onChange={setPrice} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label="Min 100$" value={100} name='sp_price' onChange={setPrice} />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <Row className='d-flex'>
                            <h2 className='bg-light text-start text-info fw-bold py-2 text-uppercase'>  <Icon icon={faCaretRight} className='me-2 mt-1' />All Products</h2>
                        </Row>
                        <Row>
                            <PaginatedItems itemsPerPage={4} />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Products;