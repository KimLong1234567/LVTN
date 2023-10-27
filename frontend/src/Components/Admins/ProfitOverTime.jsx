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
            .get('http://localhost:5000/api/bill/status/1', {
                params: { status: 'Đã giao hàng thành công' }
            })
            .then((res) => {
                var newBill = []
                res.data?.data?.forEach(item => {
                    newBill.push({ ...item, createdAt: format(parse(item.createdAt, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date()), 'yyyy-MM-dd') })
                })
                setBill(newBill);
                setFilterBill(newBill)
            });
    }, [])

    useEffect(() => {
        if (filterBill) {
            if (startDate !== '' && endDate !== '' && startDate > endDate) {
                toast.error('Ngày kết thúc phải lớn hơn ngày bắt đầu.', {
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
                        if (item.createdAt === startDate) {
                            dateBill.push(item)
                        }
                    })
                }
                if (endDate !== '') {
                    filterBill.forEach(item => {
                        if (item.createdAt >= startDate && item.createdAt <= endDate) {
                            dateBill.push(item)
                        }
                    })
                }
                setBill(dateBill)
            }
        }
        // eslint-disable-next-line
    }, [startDate, endDate])

    const TotalProfitOverDay = (temp) => {
        var TotalProfit = 0;
        temp?.forEach(Element => {
            Element.products.forEach(value => {
                TotalProfit += (value.id_product.price - value.id_product.giatien) * value.quantity
            })
        })
        return TotalProfit;
    }

    return (
        <div className='boder-main'>
            <ToastContainer />
            <div className='m-0 d-flex'>
                <div className='mx-auto fw-bold' >
                    <h2 className='text-primary text-uppercase'>doanh thu bán hàng</h2>
                    <div className='bg-light mt-3'>
                        Từ ngày : <input type="date" onChange={e => setStartDate(e.target.value)} /> Đến ngày : <input type="date" onChange={e => setEndDate(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className='m-3'>
                <table className="table table-bordered" >
                    <thead>
                        <tr className="table-secondary text-center">
                            <th> STT</th>
                            <th>NGÀY</th>
                            <th>SẢN PHẨM ĐÃ BÁN</th>
                            <th>ẢNH</th>
                            <th>GIÁ BÁN</th>
                            <th>SỐ LƯỢNG BÁN</th>
                        </tr>
                    </thead>
                    {Bill.length > 0 ?
                        Bill.map((value, idx) => {
                            return [
                                value.products.map((item, i) => {
                                    return (
                                        <tbody key={i}>
                                            <tr>
                                                <td>{idx}</td>
                                                <td>{value.createdAt}</td>
                                                <td>{item.id_product.name}</td>
                                                <td>
                                                    <img src={`/image/SanPham/${item.id_product.image}`} className="mb-2 mt-2" style={{ width: "150px" }} alt="..." />
                                                </td>
                                                <td>{item.id_product.price}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        </tbody>
                                    )
                                }),
                            ]
                        })
                        :
                        <div className='d-flex'>
                            <h5 className='m-3 text-warning'>Chưa bán được đơn hàng nào</h5>
                        </div>
                    }
                    <tfoot>
                        <tr className="table-secondary text-center">
                            <td className='text-start h5' colSpan={5}>Tổng Lợi nhuận</td>
                            <td className='h5'>{TotalProfitOverDay(Bill)} $</td>
                        </tr>

                    </tfoot>
                </table>
            </div>
        </div >
    );
}

export default ProfitOverTime;