import axios from 'axios';
import React, { useEffect, useState } from 'react';

var TotalProfit = 0
function ProfitByProduct(props) {
    const [Products, setProducts] = useState([])
    const [Bill, setBill] = useState([])
    const [ProductFind, setProductFind] = useState([])
    const [calcs, setCalcs] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/bill/status/1', {
                params: { status: 'Đã giao hàng thành công' }
            })
            .then((res) => {
                setBill(res.data.data)
            });
        axios
            .get('http://localhost:5000/api/products')
            .then((res) => {
                setProducts(res.data.data.cars)
                setProductFind(res.data.data.cars)
            });
    }, [])

    useEffect(() => {
        console.log(1111);
        Products.forEach(product => {
            var count = 0;
            var profit = 0;
            Bill.forEach(bill => {
                var current = bill?.products?.find(item => item?.id_product?._id === product._id);
                if (current) {
                    count += current.quantity
                    profit += (current.id_product.price - current.id_product.giatien) * current.quantity
                }
            })
            setCalcs((prev) => prev.concat({ id: product._id, sold: count, profit: profit }));
            TotalProfit += profit
        })
        // eslint-disable-next-line
    }, [Products,Bill])

    const productsfind = (e) => {
        const temp = ProductFind.filter(element => element.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setProducts(temp)
    }
    return (
        <div className='boder-main'>
            <div className='m-0'>
                <h2 className='text-primary fw-bold text-uppercase'> doanh thu theo sản phẩm </h2>
                <input type="text"
                    className="form-control w-50 mx-auto"
                    placeholder="Nhập tên sản phẩm"
                    onChange={productsfind}
                />
            </div>
            <div className='m-3'>
                <table className="table table-bordered">
                    <thead>
                        <tr className="table-secondary text-center">
                            <th> STT</th>
                            <th>TÊN SẢN PHẨM</th>
                            <th>THƯƠNG HIỆU</th>
                            <th>ẢNH</th>
                            <th>GIÁ NHẬP</th>
                            <th>GIÁ BÁN</th>
                            <th>SỐ LƯỢNG BÁN</th>
                            <th>LỢI NHUẬN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Products.map((product, idx) => (
                                <tr key={idx} >
                                    <td> {idx}</td>
                                    <td>{product.name}</td>
                                    <td className="text-center">
                                        {product.type.name}
                                    </td>
                                    <td >
                                        <img src={`/image/SanPham/${product.image}`} className="mb-2 mt-2" style={{ width: "150px" }} alt="..." />
                                    </td>
                                    <td>{product.giatien}</td>
                                    <td>{product.price}</td>
                                    <td>{calcs[idx]?.sold}</td>
                                    {
                                        calcs[idx]?.profit >= 0
                                            ? <td className='fw-bold'>{calcs[idx]?.profit}</td>
                                            : <td className='fw-bold text-danger'>{calcs[idx]?.profit}</td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr className="table-secondary text-center">
                            <td className='h5 text-start' colSpan={7}>Tổng lợi nhuận tất cả sản phẩm: </td>
                            <td className='h5' colSpan={1}>{TotalProfit}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default ProfitByProduct;