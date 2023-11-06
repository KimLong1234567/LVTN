import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { Bar } from "react-chartjs-2"
// eslint-disable-next-line
import Chart from 'chart.js/auto';
import { Badge } from 'react-bootstrap';
function Dahroash(props) {
    const curentAdmin = localStorage.admin ? JSON.parse(localStorage.admin) : null
    const Navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [customer, setCustomer] = useState([])
    const [employee, setEmployee] = useState([])
    const [order, setOrder] = useState([])
    const [totalValue, setTotalValue] = useState(0)
    const date = new Date().toLocaleDateString()
    var newoder = 0;
    if (curentAdmin === null) {
        Navigate('/admin/login')
    }
    useLayoutEffect(() => {
        async function loadData() {
            await axios.get('http://localhost:5000/api/products/')
                .then((res) => {
                    setProducts(res.data.data);
                })
            await axios.get('http://localhost:5000/api/users/')
                .then((res) => {
                    setCustomer(res.data.data);
                })
            await axios.get('http://localhost:5000/api/dh/dhang/all')
                .then((res) => {
                    const temp = res.data.data.filter((e) => (e.dh_status === 0))
                    setOrder(temp)
                    // setTotalValue(res.data.total)
                    // Tính tổng dh_total từ danh sách temp
                    axios.get('http://localhost:5000/api/dh/dhang/success')
                        .then((res) => {
                            const total = res.data.data
                            const totalValue = total.reduce((total, order) => total + order.dh_total, 0);
                            setTotalValue(totalValue);
                        })
                })
            await axios.get('http://localhost:5000/api/admins/')
                .then((res) => {
                    setEmployee(res.data.data);
                })
        }
        loadData();
    }, [])
    const count = order?.filter((e) => ((e.dh_create = new Date(e.dh_create).toLocaleDateString()) === date))
    newoder = count?.length
    const data = {
        labels: ['Products', 'New Orders',
            'Customer', 'Employee', 'Sales'],
        datasets: [
            {
                label: 'The diagram shows the store in visual form',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(153, 105, 255, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgba(153, 102, 255)',
                    'rgb(54, 162, 235)',
                ],
                borderWidth: 1,
                data: [products.length, order.length, customer.length, employee.length, totalValue]
            }
        ]
    }
    // Nếu chưa request hoặc chưa có dữ liệu, không hiển thị component
    return (
        <div className='boder-main'>
            <div className="bg-white align-items-center my-2 p-2 rounded-3">
                <div className="row">
                    <div className="col-3 ">
                        <div className="card text-white  border border-3 border-primary">
                            <div className="card-body d-flex align-items-center bg-primary p-2">
                                <div>
                                    <p className="card-text mb-0">Products</p>
                                    <h2 className="card-title">{products?.length}</h2>
                                </div>
                            </div>
                            <Link
                                to="/admin/product"
                                className="card-body d-block text-primary p-2 fw-bold"
                            >
                                Detail <i className="fa-solid fa-circle-right"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card text-white border border-3 border-success">
                            <div className="card-body d-flex align-items-center bg-success p-2">
                                <div>
                                    <p className="card-text mb-0">Customer</p>
                                    <h2 className="card-title">{customer?.length}</h2>
                                </div>
                            </div>
                            <Link
                                to="/admin/customer "
                                className="card-body d-block text-success p-2 fw-bold"
                            >
                                Detail <i className="fa-solid fa-circle-right"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card text-white  border border-3 border-warning">
                            <div className="card-body d-flex align-items-center bg-warning p-2">
                                <div>
                                    <div className='d-flex'>
                                        <p className="card-text mb-0">All Orders
                                            <Badge bg='info' className='ms-1 h4 mb-0' text='white'>{newoder}</Badge>
                                        </p>
                                    </div>
                                    <h2 className="card-title">{order?.length}</h2>
                                </div>
                            </div>
                            <Link
                                to='/admin/order'
                                className="card-body d-block text-warning p-2 fw-bold"
                            >
                                Detail <i className="fa-solid fa-circle-right"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card text-white  border border-3 border-danger">
                            <div className="card-body d-flex align-items-center bg-danger p-2">

                                <div>
                                    <p className="card-text mb-0">total earnings</p>
                                    <h2 className="card-title">
                                        {
                                            totalValue ? new Intl.NumberFormat('vi').format(totalValue) : 0
                                        }
                                    </h2>
                                </div>
                            </div>
                            <Link
                                to='/admin/bill'
                                className="card-body d-block text-warning p-2 fw-bold"
                            >
                                Detail <i className="fa-solid fa-circle-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Bar
                data={data}
                options={{
                    title: {
                        display: true,
                        fontSize: 100
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </div>
    );
}

export default Dahroash;