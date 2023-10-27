import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function Blog(props) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/products')
            .then((res) => {
                setProducts(res.data.data)
            })
    }, [])

    return (
        <div>
            <div className='d-flex justify-content-center padding-header' style={{ backgroundImage: `url('/image/Background/bg-contacts.png')`, backgroundSize: "cover", height: "500px" }}>
                <div>
                    <h2 style={{ fontSize: "65px", textTransform: "uppercase", color: "#f33f3f", letterSpacing: "5px", fontWeight: "500" }}>PETSHOP</h2>
                    <h1 style={{ fontSize: "65px", textTransform: "uppercase", color: "white", letterSpacing: "5px", fontWeight: "500" }}>best selling blog</h1>
                </div>
            </div>
            <Container>
                {products.map((item, idx) => {
                    return idx >= 5 && idx < 9 && (
                        <Row className=' m-3 square border border-5 rounded' key={idx}>
                            <Col sm={4} sx={12}>
                                <div>
                                    <img src={`/image/SanPham/${item.sp_image}`} alt='Không tải được ảnh' width="300px" />
                                </div>
                            </Col>
                            <Col sm={8} sx={12} className='bg-light text-start'>
                                <div className='m-2'>
                                    <h4>{item.sp_name}</h4>
                                    <div className='d-flex'>
                                        <h5 className='text-info mx-2'>{new Intl.NumberFormat('vi').format(item.sp_price)} $</h5>
                                        <div className='fw-bold' >
                                            {/* <FontAwesomeIcon icon={faCheck} /> &nbsp;{item.color} */}
                                        </div>
                                    </div>
                                    <p>{item.sp_describe}</p>
                                    <Link to={`/detail/${item.sp_id}`}>
                                        <Button style={{ backgroundColor: "rgb(242,148,19)", border: "none" }}> Xem chi tiết</Button>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    )
                })}
            </Container>
        </div>
    );
}

export default Blog;