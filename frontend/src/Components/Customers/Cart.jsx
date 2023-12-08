import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faAmazonPay } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ToastContainer, toast } from 'react-toastify';
function Cart(props) {
    const Navigate = useNavigate()
    const curentAccount = localStorage.currentAccount ? JSON.parse(localStorage.currentAccount) : null
    const [products, setProducts] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [infoBill, setInfoBill] = useState({})
    //dia chi
    const [address, setAddress] = useState({ dh_address: '' })
    const [dchi, setDchi] = useState([]);
    const [newAddress, setNewAddress] = useState('');// Biến để lưu địa chỉ mới
    const [selectedAddress, setSelectedAddress] = useState('');
    const [open, setOpen] = useState(false);
    // thanh toán 
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Thanh toán hóa đơn ",
                    amount: {
                        currency_code: "USD",
                        // value: totalValue + totalValue * 0.01,
                        value: totalValue,
                    },
                },
            ],
            application_context: {
                shipping_preference: 'NO_SHIPPING'
            }
        }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };
    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
            console.log(payer);
            sendBillDataToServer()
        });

    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    const onchange = (e) => {
        const dh_pay = e.target.value;
        setInfoBill({ ...infoBill, dh_pay: dh_pay })
    }
    const onchangePhone = (e) => {
        const user_phone = e.target.value;
        setInfoBill({ ...infoBill, user_phone: user_phone })
    }
    console.log(infoBill);
    const onChange = (e) => {
        const dh_address = e.target.value;
        setAddress({ dh_address })
        setNewAddress(''); // Đặt giá trị địa chỉ mới về trống khi người dùng chọn từ danh sách
        setSelectedAddress(dh_address);
    }
    const onNewAddressChange = (e) => {
        const newAddr = e.target.value;
        setAddress({ dh_address: newAddr });
        setNewAddress(newAddr); // Lưu giá trị địa chỉ mới
        setSelectedAddress(newAddr); // Cập nhật selectedAddress khi người dùng nhập địa chỉ mới
        console.log(newAddress);
    }
    console.log(selectedAddress);
    // console.log(infoBill);
    function buttonPay(text) {
        if (text === 'Pay online') {
            return (
                <div>
                    <Button className='text-end mb-3' variant='success' onClick={() => setShow(true)} >Pay <Icon icon={faAmazonPay} /> </Button>
                    <PayPalScriptProvider
                        options={{
                            'client-id': "ARAvyA7MJ6zO-uJ3WW7w5ypwzPboZ1hkDsEE8ZJm4jcwoYB7DdSxTQ-YUER58nunHYF8eWAkToPnFfGC"
                        }}>
                        {show ? (
                            <PayPalButtons
                                style={{ layout: "vertical" }}
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                            />
                        ) : null}
                        {
                            success ? (
                                <h3 className='text-success'>pay success</h3>
                            ) : null
                        }
                        {
                            orderID ? (
                                <h5> Order ID: {orderID}</h5>
                            ) : null
                        }
                        {
                            ErrorMessage ? (
                                <h3>{ErrorMessage}</h3>
                            ) : null
                        }
                    </PayPalScriptProvider>
                </div>

            )
        }
        else {
            return (
                <div>
                    <Button className='text-end' variant='warning' onClick={() => sendBillDataToServer()}>Pay <Icon icon={faAmazonPay} /></Button>
                    {/* <Button> </Button> disabled  */}
                </div>
            )
        }
    }
    useEffect(() => {
        axios.get(`http://localhost:5000/api/dh/${curentAccount.user_id}`)
            .then((res) => {
                const response = res.data.data;
                console.log(response);
                setDchi(response);
                console.log(dchi);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh], [dchi])
    useLayoutEffect(() => {
        async function fecthData() {
            const res = ((await axios.get(`http://localhost:5000/api/orders/user/orders/${curentAccount.user_id}`, {
                params: { idCustomer: curentAccount.user_id }
            }))).data.data
            setProducts(res)
            // console.log(products);
        }
        fecthData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])
    const sumTotal = () => {
        var total = 0
        if (products !== null && products !== undefined && products.length !== 0) {
            for (let i = 0; i < products.length; i++) {
                total += products[i].gh_sl * products[i].sp_price
            }
        }
        return total;
    }
    let totalValue = sumTotal();
    const sumTotalUnit = () => {
        var total = 0
        if (products !== null && products !== undefined && products.length !== 0) {
            for (let i = 0; i < products.length; i++) {
                total += products[i].gh_sl
            }
        }
        return total;
    }
    let totalUnit = sumTotalUnit();
    const deleteProducts = (id) => {
        if (products !== null && products !== undefined) {
            for (let i = 0; i < products.length; i++) {
                if (products[i].gh_id === id) {
                    const gh_id = products[i].gh_id;
                    axios
                        .delete(`http://localhost:5000/api/orders/${gh_id}`)
                        .then((res) => {
                            toast.error('Product was successfully removed from the order.', {
                                position: "top-center",
                                autoClose: 2000,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            })
                            setTimeout(
                                () => (setRefresh((prev) => prev + 1)),
                                3000
                            );
                            console.log(refresh);
                        })
                }
            }
        }
    }
    // Hàm cộng thêm hoặc trừ 1 vào giá trị của sản phẩm
    const updateQuantity = (product, amount) => {
        // Tạo một bản sao của sản phẩm để không ảnh hưởng đến trạng thái ban đầu
        const updatedProduct = { ...product };
        // Kiểm tra nếu `gh_sl` đã bằng 1 hoặc nhỏ hơn, thì không thực hiện phép trừ
        // update trg hop nay: || (updatedProduct.gh_sl >= products.sp_sl && amount === 1)
        if (updatedProduct.gh_sl <= 1 && amount === -1) {
            return;
        }
        updatedProduct.gh_sl += amount;

        // Tìm chỉ mục của sản phẩm trong mảng `products` và cập nhật giá trị
        const productIndex = products.findIndex((p) => p.gh_id === updatedProduct.gh_id);
        const updatedProducts = [...products];
        updatedProducts[productIndex] = updatedProduct;

        // Cập nhật mảng `products` với giá trị mới
        setProducts(updatedProducts);
    };
    // Tạo một hàm để tạo dữ liệu Bill từ các giá trị
    const createBillData = (totalBillValue, totalBillUnit) => {
        // Lấy các giá trị từ products và các biến khác
        const dh_pay = infoBill.dh_pay // Đảm bảo rằng curentAccount tồn tại trước khi sử dụng
        const user_id = curentAccount ? curentAccount.user_id : '';
        const totalValue = totalBillValue; // Đảm bảo bạn đã có totalValue từ nơi nào đó
        const totalUnit = totalBillUnit; // Đảm bảo bạn đã có totalUnit từ nơi nào đó

        // Tạo đối tượng Bill
        const Bill = {
            dh_pay,
            user_id,
            totalValue,
            totalUnit,
        };
        // console.log(Bill);
        return Bill;

    };
    createBillData(totalValue, totalUnit);
    // Tạo một hàm để tạo dữ liệu DetailBill từ các sản phẩm
    const createDetailBillData = () => {
        if (products) {
            // Lặp qua các sản phẩm và lấy thông tin cần thiết
            const DetailBill = products.map((product) => {
                const sp_code = product.sp_code;
                const gh_sl = product.gh_sl;
                const sp_price = product.sp_price;
                return { sp_code, gh_sl, sp_price };
            });
            return DetailBill;
        } else {
            return [];
        }
    };
    // Khi bạn muốn gửi dữ liệu Bill và DetailBill
    function sendBillDataToServer() {
        const Bill = createBillData(totalValue, totalUnit);
        console.log(Bill);
        const dh = {
            dh_pay: Bill.dh_pay,
            kh_id: Bill.user_id,
            dh_total: Bill.totalValue,
            dh_sl: Bill.totalUnit,
            dh_address: selectedAddress,
            user_email: curentAccount.user_email,

        }
        // console.log(DetailBill);
        axios
            .put(`http://localhost:5000/api/users/${curentAccount.user_id}`, infoBill.user_phone)
            .then();
        axios
            .post('http://localhost:5000/api/dh/', dh)
            .then((res) => {
                const user_phone = infoBill.user_phone
                const dh = res.data.data
                console.log(res.data.data, dh);
                addChiTietDh(dh);
                axios
                    .put(`http://localhost:5000/api/users/${curentAccount.user_id}`, { user_phone })
                toast.success('Purchase Success. Kindly await delivery.', {
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
    };
    const addChiTietDh = (dh) => {
        const DetailBill = createDetailBillData();
        const ctdh = {
            dh_id: dh.dh_id,
            carts: DetailBill,
        }
        axios.post('http://localhost:5000/api/ctdh/', ctdh, {
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


    console.log(dchi);
    return (
        <Container fluid className='padding-header'>
            <ToastContainer />
            <Row className='m-3'>
                <Col xs={4} sm={3}>
                    <div className='bg-light text-center '>
                        <h4 className='text-uppercase text-success'> <Icon icon={faCaretRight} className='m-1' />Customer Info </h4>
                        <div className='text-start mx-3 pb-2'>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder={curentAccount.user_name} name='name_customer' disabled required />
                                </Form.Group>
                            </Form>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={curentAccount.user_email} disabled />
                                </Form.Group>
                            </Form>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Phone</Form.Label>
                                    {
                                        curentAccount.user_phone ?
                                            <Form.Control type="text" placeholder={curentAccount.user_phone} name='user_phone' />
                                            :
                                            <Form.Control type="text" placeholder={'Input your phone number'} name='user_phone' onChange={onchangePhone} required />
                                    }
                                </Form.Group>
                            </Form>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Address </Form.Label>
                                    <Form.Select aria-label="Default select example" name='dh_address' onChange={onChange}>
                                        <option> --- Select Address ---</option>
                                        {dchi.length > 0 ? (
                                            dchi.map((item, idx) => (
                                                <option value={item.dh_address} key={idx}>
                                                    {item.dh_address}
                                                </option>
                                            ))
                                        ) : (
                                            <option>You do not have an address for shipping</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                            <Form>
                                <Button
                                    onClick={() => setOpen(!open)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                    className='mb-2'
                                >
                                    Input your new address
                                </Button>
                                <Collapse in={open}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" id="example-collapse-text">
                                        <Form.Label>New Address</Form.Label>
                                        <Form.Control type="text" placeholder='Input new address' name='dh_adress' onChange={onNewAddressChange} value={newAddress} />
                                    </Form.Group>
                                </Collapse>
                            </Form>
                            <Button variant='primary mx-2' onClick={() => { Navigate('/products') }} type='submit'>Keep buy</Button>
                        </div>
                    </div>
                </Col>
                <Col xs={8} sm={9}>
                    <table className="table align-middle text-center responsive">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Image</th>
                                <th scope="col">Products Name</th>
                                <th scope="col">Your quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Sum</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        {products !== null && products !== undefined ?
                            products.map((item, idx) => {
                                return item.sp_id !== undefined && (
                                    <tbody key={idx}>
                                        <tr >
                                            <td>{idx + 1}</td>
                                            <td>
                                                <img src={`/image/SanPham/${item.sp_image}`} alt='...' style={{ width: "100px" }} />
                                            </td>
                                            <td >{item.sp_name}</td>
                                            <td>
                                                <div style={{
                                                    justifyContent: "center",
                                                    display: "flex",
                                                    borderRadius: "0.25rem",
                                                    overflow: "hidden",
                                                    border: "1px",
                                                }}>
                                                    <button style={{ padding: "0.125rem 0.25rem" }} onClick={() => updateQuantity(item, -1)}><Icon icon={faMinus} /></button>
                                                    <input type='number' readOnly value={item.gh_sl} style={{ width: "40px", textAlign: "center" }} />
                                                    <button style={{ padding: "0.125rem 0.25rem" }} onClick={() => updateQuantity(item, 1)}><Icon icon={faPlus} /></button>
                                                </div>
                                            </td>
                                            <td>{item.sp_price}</td>
                                            <td>{item.gh_sl * item.sp_price}</td>
                                            <td>
                                                <button className="text-danger" onClick={() => deleteProducts(item.gh_id)}>
                                                    <Icon icon={faTrashCan} />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })
                            : null
                        }
                    </table>
                    <Row>
                        <div className='text-end g-3'>
                            <h4 >Sum quantity: {new Intl.NumberFormat('vi').format(totalUnit)} unit</h4>
                            <h4 >Sum: {new Intl.NumberFormat('vi').format(totalValue)} $</h4>
                            {/* <h4 >VAT: 10%</h4>
                            <h4 >Final: {new Intl.NumberFormat('vi').format(totalValue + totalValue * 0.1)} $</h4> */}
                            <div>
                                <h4>Pay with:</h4>
                                <div className='d-flex justify-content-end'>
                                    <Form.Select style={{ width: "250px" }} className='text-center mb-2' name='dh_pay' onChange={onchange}>
                                        <option>--Select-- </option>
                                        <option name='dh_pay'>Pay when products arrive</option>
                                        <option name='dh_pay'>Pay online</option>
                                    </Form.Select>
                                </div>
                                {buttonPay(infoBill.dh_pay)}
                            </div>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container >
    );
}
export default Cart;