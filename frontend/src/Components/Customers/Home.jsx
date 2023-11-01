import { Link } from 'react-router-dom';
import { Card, Carousel, Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Home(props) {

    const [Products, setProducts] = useState([])
    const [ProductFind, setProductFind] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/products/')
            .then((res) => {
                const temp = res?.data?.data?.filter((e) => (e.deleted !== true))
                setProducts(temp)
                setProductFind(temp)
            })
    }, [])
    const onChange = (e) => {
        const temp = ProductFind.filter(element => element.sp_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setProducts(temp)
    }
    function renderProducts(item, idx) {
        if (item.s_status && item.sp_sl !== 0) {
            return (
                <Col xs={12} md={4} sm={6} key={idx} className='g-3'>
                    <Card className='card border-success border border-2'>
                        <Link to={`/detail/${item.sp_id}`}>
                            <Card.Img variant="top" src={`/image/SanPham/${item.sp_image}`} style={{ width: "auto", height: "400px", maxHeight: "300px" }} />
                        </Link>
                        <Card.Body className='bg-light'>
                            <Card.Title>{item.sp_name}</Card.Title>
                            <Card.Text className='text-line'>
                                <span className='text-primary fw-bold'>{new Intl.NumberFormat('vi').format(item.sp_price)} $</span> <br />
                                <span>{item.sp_describe}</span>
                            </Card.Text>
                            <Card.Title >
                                <Link className="text-primary fw-bolder" to={`/detail/${item.sp_id}`} >Deltail</Link>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            )
        }
        else {
            return (
                <Col xs={12} md={4} sm={6} key={idx} className='g-3'>
                    <Card className='card border-success border border-2' >
                        <Card.Img variant="top" src={`/image/SanPham/${item.sp_image}`} style={{ width: "auto", height: "400px", maxHeight: "300px" }} />
                        <Card.Body className='bg-light'>
                            <Card.Title>{item.sp_name}</Card.Title>
                            <Card.Text className='text-line'>
                                <span className='text-primary fw-bold'>{new Intl.NumberFormat('vi').format(item.sp_price)} $</span> <br />
                                <span>{item.sp_describe}</span>
                            </Card.Text>
                            <Card.Title >
                                <Link className="text-danger fw-bolder" to={`/detail/${item.sp_id}`} style={{ pointerEvents: "none" }}>Tạm hết hàng</Link>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            )
        }
    }
    return (
        <div>
            <div className='banner'>
                <Carousel>
                    <Carousel.Item>
                        <img
                            height={700}
                            className="d-block w-100"
                            src="/image/Banner/banner1.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption className='info-banner' style={{ color: "black" }}>
                            <h1>Furina</h1>
                            <p>For over 90 years, we've been guided by the belief that pets and people are better together.</p>
                            <p>The reason we're so invested in the quality of our food is because we love pets as much as you do. You'll find pets in our homes, and even sitting by our feet as we work in our offices.
                                Our passion for pets goes beyond pushing pet nutrition forward, and into forging partnerships in the pet welfare world and raising awareness of what pets truly need. After all, we've seen firsthand how powerful the bond with a pet can be, and the many unique ways that pets can strengthen our families and bring our communities closer.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            height={700}
                            className="d-block w-100"
                            src="/image/Banner/banner2.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption className='info-banner'>
                            <h1>Fritz Aquatics</h1>
                            <p>Fritz Aquatics has helped serve professional aquarists for over 30 years. We work with professionals from marine biologists and zoologists to transhippers and large retail destinations all over the world to help them optimize the lives of their fish.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            height={700}
                            className="d-block w-100"
                            src="/image/Banner/banner3.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption className='info-banner' style={{ color: "black" }}>
                            <h1>Stella & Chewy's </h1>
                            <p>
                                At Stella & Chewy's, we put pets first; behind everything we do is our mission to help dogs and cats thrive. Founded in 2003 by Marie Moody to help her own rescue dogs, we are the innovators of raw frozen and freeze dried raw pet food. Today, we are a full line manufacturer of premium pet food, focused on best-in-class nutrition with high-quality ingredients, offering a range of products including frozen raw, freeze dried raw, kibble, wet food, and treats. We are the fastest growing pet food brand in neighborhood pet and offer a flexible and dog-friendly office culture.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <Container fluid>
                <Row className='d-flex m-5'>
                    <div className='mxx-auto'>
                        <input type="text"
                            className="form-control w-50 mx-auto"
                            placeholder="Searching product"
                            onChange={onChange}
                            style={{ height: "50px" }}
                        />
                    </div>
                </Row>
                <Row className='m-0'>
                    <h1 style={{ textTransform: "uppercase", color: "rgb(200,16,46)" }}>New Products</h1>
                    {Products.map((item, idx) => {
                        return idx < 6 && (
                            renderProducts(item, idx)
                        )
                    })}
                </Row>
                <Row className='mt-3 mb-2 g-3'>
                    <h1 style={{ textTransform: "uppercase", color: "rgb(200,16,46)" }}>Highly recommend </h1>
                    {Products.map((item, idx) => {
                        return idx >= 6 && idx < 12 && (
                            renderProducts(item, idx)
                        )
                    })}
                </Row>
            </Container>
        </div>

    );
}

export default Home;