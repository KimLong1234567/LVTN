import axios from 'axios';
import React, { useEffect, useState } from 'react';

var TotalProfit = 0;

function ProfitByProduct(props) {
    const [Products, setProducts] = useState([]);
    const [Bill, setBill] = useState([]);
    const [ProductFind, setProductFind] = useState([]);
    const [Calcs, setCalcs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/dh/dhang/success', {
            params: { status: 'Đã giao hàng thành công' }
        }).then((res) => {
            setBill(res.data.data);
        });

        axios.get('http://localhost:5000/api/products').then((res) => {
            setProducts(res.data.data);
            setProductFind(res.data.data);
        });
    }, []);

    useEffect(() => {
        // Calculate profits and update Calcs
        const newCalcs = Products.map((product) => {
            let count = 0;
            let profit = 0;
            Bill.forEach((bill) => {
                bill.ctdh.forEach((item) => {
                    if (item.sp_code === product.sp_code) {
                        count += item.ctdh_sl;
                        profit += (item.ctdh_price - product.sp_gianhap) * item.ctdh_sl;
                    }
                });
            });
            return { id: product.sp_id, sold: count, profit: profit };
        });

        setCalcs(newCalcs);

        // Calculate total profit
        const totalProfit = newCalcs.reduce((sum, product) => sum + product.profit, 0);
        TotalProfit = totalProfit;

        // eslint-disable-next-line
    }, [Products, Bill]);

    const productsfind = (e) => {
        const temp = ProductFind.filter((element) =>
            element.sp_name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setProducts(temp);
    };

    return (
        <div className="boder-main">
            <div className="m-0">
                <h2 className="text-primary fw-bold text-uppercase">REVENUE BY PRODUCT</h2>
                <input
                    type="text"
                    className="form-control w-50 mx-auto"
                    placeholder="Type to find products"
                    onChange={productsfind}
                />
            </div>
            <div className="m-3">
                <table className="table table-bordered">
                    <thead>
                        <tr className="table-secondary text-center">
                            <th>No</th>
                            <th>PRODUCTS NAME</th>
                            <th>SPECIES</th>
                            <th>IMAGE</th>
                            <th>IMPORT PRICE</th>
                            <th>PRICE</th>
                            <th>QUANTITY SALES</th>
                            <th>PROFIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Products.map((product, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{product.sp_name}</td>
                                <td className="text-center">{product.cate_name}</td>
                                <td>
                                    <img
                                        src={`/image/SanPham/${product.sp_image}`}
                                        className="mb-2 mt-2"
                                        style={{ width: "150px" }}
                                        alt="..."
                                    />
                                </td>
                                <td>{product.sp_gianhap}</td>
                                <td>{product.sp_price}</td>
                                <td>{Calcs[idx]?.sold}</td>
                                <td>
                                    {Calcs[idx]?.profit >= 0 ? (
                                        <span className="fw-bold">{Calcs[idx]?.profit}</span>
                                    ) : (
                                        <span className="fw-bold text-danger">{Calcs[idx]?.profit}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="table-secondary text-center">
                            <td colSpan={7}>TOTAL REVENUE FROM ALL ITEMS: </td>
                            <td>{TotalProfit} $</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default ProfitByProduct;
