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
                            className="d-block w-100"
                            src="/image/Banner/vinfast.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption className='info-banner'>
                            <h1>VinFast</h1>
                            <p>The company was founded in 2017 by Vingroup.The company designed its models with the help of Pininfarina, BMW and Magna Steyr and participated in the 2018 Paris Motor Show.VinFast claims it will be the first volume automotive manufacturer in Vietnam as well as the first Vietnamese automaker to participate in a major international auto show.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/image/Banner/maybach.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption className='info-banner'>
                            <h1>Maybach</h1>
                            <p>Wilhelm Maybach was technical director of the Daimler-Motoren-Gesellschaft (DMG) until he left in 1907. On 23 March 1909, he founded the new company, Luftfahrzeug-Motorenbau GmbH (literally "Aircraft Engine Building Company"), with his son Karl Maybach as director.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/image/Banner/lambogini.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption className='info-banner'>
                            <h1>Lamborghini</h1>
                            <p>
                                Launched on 28 February 2011 at the Geneva Motor Show, five months after its initial unveiling in Sant'Agata Bolognese, the vehicle, internally codenamed LB834, was designed to replace the then-decade-old Murciélago as the new flagship model.
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
                    <h1 style={{ textTransform: "uppercase", color: "rgb(200,16,46)" }}>Highly recoment </h1>
                    {Products.map((item, idx) => {
                        return idx < 6 && (
                            renderProducts(item, idx)
                        )
                    })}
                </Row>
                <Row className='mt-3 mb-2 g-3'>
                    <h1 style={{ textTransform: "uppercase", color: "rgb(200,16,46)" }}>New Products </h1>
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