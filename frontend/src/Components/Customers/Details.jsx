import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Table, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faCommentDots, faCommentSms } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
// import ThreeSixty from 'react-360-view'

function Details(props) {
    var { id } = useParams()
    var [Product, setProduct] = useState({})
    const [dataLoaded, setDataLoaded] = useState(false);
    var [Products, setProducts] = useState([])
    const Navigate = useNavigate()
    // const curentAccount = localStorage.currentAccount ? JSON.parse(localStorage.currentAccount) : null
    const curentAccount = localStorage["currentAccount"] ? JSON.parse(localStorage["currentAccount"]) : null
    const [comment, setComment] = useState({});
    const [comments, setComments] = useState([]);
    const [refresh, setRefresh] = useState(0)
    const onChange = (e) => {
        setComment({ ...comment, [e.target.name]: e.target.value })
    }
    // console.log(comment);
    const addcomment = () => {
        if (curentAccount === null) {
            toast('Login before leaving a comment.', {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setTimeout(
                () => (Navigate('/login')),
                4000
            );
        }
        // Kiểm tra nếu comment đã được khởi tạo và có thuộc tính content
        if (comment && comment.bl_content) {
            comment.sp_id = id;
            comment.kh_id = curentAccount.user_id;
            axios.post('http://localhost:5000/api/comments/', comment, {})
                .then((res) => {
                    setRefresh((prev) => prev + 1);
                });
        }
    }
    const addToCart = () => {
        if (curentAccount === null) {
            toast.error('Login before making a purchase.', {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setTimeout(
                () => (Navigate('/login')),
                4000
            );
        }
        else {
            const productToAdd = Product[0];
            axios
                .post(`http://localhost:5000/api/orders/`, {
                    kh_id: curentAccount.user_id,
                    sp_code: productToAdd.sp_code,
                    gh_sl: 1,
                })
                .then((res) => {
                    console.log(res.data.status);
                    if (res) {
                        toast.success('Added to cart with success', {
                            position: "top-center",
                            autoClose: 3000,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })
                        setTimeout(
                            () => (Navigate('/cart')),
                            4000
                        );
                    }
                })
        }
    }
    console.log(Product[0]);
    useLayoutEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then((res) => {
                setProduct(res.data.data);
                setDataLoaded(true); // Data is now loaded
            })
            .catch((error) => {
                console.error('Error loading product:', error);
            });
        // eslint-disable-next-line
    }, [id, refresh]);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/products`)
            .then((res) => {
                setProducts(res.data.data.filter(e => e.type?.cate_id === Product.type?.cate_id));
            })
        axios
            .get(`http://localhost:5000/api/comments/${id}`)
            .then((res) => {
                setComments(res.data?.data?.filter((e) => (e.b_status === 0)))
                setDataLoaded(true);
            })
        // eslint-disable-next-line
    }, [Product]);


    return (
        <Container fluid className='padding-header'>
            <ToastContainer />
            {dataLoaded ? (
                <Row  >
                    <Col xs={12} sm={7} >
                        <div className='container'>
                            <img src={`/image/SanPham/${Product[0].sp_image}`} className='w-100' alt='...' style={{ height: '600px' }} />
                            <hr />
                        </div>
                        <div className='text-start mx-5 mt-1'>
                            <h4 >Comments <Icon icon={faCommentSms} /> </h4>
                            {comments.length !== 0 ?
                                comments.map((item, i) => {
                                    return (
                                        <div className='mt-2 d-flex align-items-center' key={i}>
                                            <div className='mx-2'>
                                                {
                                                    item?.user_avt ?
                                                        < img src={`/image/Avt/${item.user_avt}`} alt='...' style={{ width: '70px', height: '70px', borderRadius: "50%" }} />
                                                        :
                                                        <img src={`/image/Avt/Avatartrang.jpg`} alt='...' style={{ width: '60px', height: '100px', borderRadius: "50%" }} />

                                                }
                                            </div>
                                            <div>
                                                <div className='text-primary' style={{ fontSize: "24px" }}> {item.user_name}</div>
                                                <div style={{ fontSize: "24px" }}>{item.bl_content}</div>
                                            </div>
                                        </div>
                                    )
                                }) :
                                null
                            }
                        </div>
                    </Col>
                    <Col xs={12} sm={5}>
                        <div className='mx-5'>
                            <h3 className='fw-bolder text-uppercase'>detail product</h3>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>Id:</td>
                                        <td className='text-end'>{Product[0].sp_code}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>Name:</td>
                                        <td className='text-end'>{Product[0].sp_name}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>type:</td>
                                        <td className='text-end'>{Product[0].cate_name}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>Price:</td>
                                        <td className='text-end'>{new Intl.NumberFormat('vi').format(Product[0].sp_price)} $</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>origin:</td>
                                        <td className='text-end'>{Product[0].sp_xuatxu}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>describe:</td>
                                        <td className='text-end'>{Product[0].sp_describe}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <div className='mt-3'>
                                <Button variant='success' onClick={addToCart}>Add to cart<Icon icon={faCartArrowDown} /> </Button>
                            </div>
                        </div>
                        <div className='comment-Products mx-5 col-10'>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Comment's product <Icon icon={faCommentDots} /></Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Write something about product" name='bl_content' onChange={onChange} />
                                </Form.Group>
                            </Form>
                            <Button variant='primary' onClick={addcomment}>Comment</Button>
                        </div>
                    </Col>
                </Row>
            ) : (
                // Show loading or placeholder while data is loading
                <div>Loading...</div>
            )}
            <Container className='mt-2'>
                <Row >
                    <h4 className='text-start text-uppercase text-danger'>Same products:</h4>
                    {
                        Products.map((item, idx) => {
                            return item.cate_id === Product[0].cate_id && (
                                <div key={idx} className='col-md-4 col-sm-6 col-xs-12'>
                                    <Card className='card'>
                                        <Link className="text-primary" to={`/detail/${item.sp_id}`}>
                                            <Card.Img variant="top" src={`/image/SanPham/${item.sp_image}`} style={{ width: "400px", height: "400px", maxHeight: "300px" }} />
                                        </Link>
                                        <hr />
                                        <Card.Body>
                                            <Card.Title>{item.sp_name}</Card.Title>
                                            <Card.Text className='text-line'>
                                                <span className='text-primary fw-bold'>{new Intl.NumberFormat('vi').format(item.sp_price)} $</span> <br />
                                                <span>{item.sp_describe}</span>
                                            </Card.Text>
                                            <Link className="text-primary" to={`/detail/${item.sp_id}`}>Detail</Link>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                </Row>
            </Container>
        </Container >
    );
}

export default Details;