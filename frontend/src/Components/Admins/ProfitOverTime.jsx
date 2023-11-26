import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { format, parse } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
function ProfitOverTime(props) {
    const [Bill, setBill] = useState([])
    const [filterBill, setFilterBill] = useState([])
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/dh/dhang/success')
            .then((res) => {
                var newBill = []
                res.data?.data?.forEach(item => {
                    newBill.push({ ...item, dh_create: format(parse(item.dh_create, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date()), 'yyyy-MM-dd') })
                })
                setBill(newBill);
                setFilterBill(newBill)
            });
    }, [])

    useEffect(() => {
        if (filterBill) {
            if (startDate !== '' && endDate !== '' && startDate > endDate) {
                toast.error('The end date must be greater than the start date.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }
            else {
                var dateBill = []
                if (startDate !== '') {
                    filterBill.forEach(item => {
                        if (item.dh_create === startDate) {
                            dateBill.push(item)
                        }
                    })
                }
                if (endDate !== '') {
                    filterBill.forEach(item => {
                        if (item.dh_create >= startDate && item.dh_create <= endDate) {
                            dateBill.push(item)
                        }
                    })
                }
                setBill(dateBill)
            }
        }
        // eslint-disable-next-line
    }, [startDate, endDate])

    return (
        <div className='boder-main'>
            <ToastContainer />
            <div className='m-0 d-flex'>
                <div className='mx-auto fw-bold' >
                    <h2 className='text-primary text-uppercase'>Sales</h2>
                    <div className='bg-light mt-3'>
                        From Date : <input type="date" onChange={e => setStartDate(e.target.value)} /> To date : <input type="date" onChange={e => setEndDate(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className='m-3'>
                <table className="table table-bordered" >
                    <thead>
                        <tr className="table-secondary text-center">
                            <th>No</th>
                            <th>Date</th>
                            <th>SOLD PRODUCTS</th>
                            <th>IMAGE</th>
                            <th>NUMBER SALES</th>
                            <th>PRICE</th>
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    {Bill.length > 0 ? Bill.map((value, idx) => (
                        <tbody key={idx}>
                            {value.ctdh.map((item, i) => (
                                <tr key={i}>
                                    <td>{idx + 1}</td>
                                    <td>{value.dh_create}</td>
                                    <td>{item.sp_name}</td>
                                    <td>
                                        <img src={`/image/SanPham/${item.sp_image}`} className="mb-2 mt-2" style={{ width: "150px" }} alt="..." />
                                    </td>
                                    <td>{item.ctdh_sl}</td>
                                    <td>{item.ctdh_price}</td>
                                </tr>
                            ))}
                            <tr className="table-secondary text-center">
                                <td colSpan={4} className='fw-bolder text-uppercase text-end'>Sum:</td>
                                <td className='fw-bolder text-uppercase text-center'>{value.dh_sl}</td>
                                <td className='fw-bolder text-primary text-end' >{new Intl.NumberFormat('vi').format(value.dh_total)} $</td>
                            </tr>
                        </tbody>
                    )) : (
                        <div className='d-flex'>
                            <h5 className='m-3 text-warning'>Orders have not yet been sold.</h5>
                        </div>
                    )}
                </table>
            </div>
        </div >
    );
}

export default ProfitOverTime;