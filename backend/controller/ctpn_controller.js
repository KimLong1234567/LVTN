const pool = require("../database/index");

const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM ctpnhap");
            res.json({
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query("SELECT * FROM ctpnhap WHERE ctpn_id = ?", [id]);
            res.json({
                data: rows
            });

        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },
    create: async (req, res) => {
        try {
            const { products, pn_id } = req.body;
            const ctpn_create = new Date();
            console.log(products);
            // Lặp qua danh sách sản phẩm và thêm từng sản phẩm vào chi tiết phiếu nhập
            for (var product of products) {
                const { sp_code, sp_sl, sp_gianhap } = product;

                const sql = "INSERT INTO ctpnhap (pn_id, sp_code, ctpn_sl, ctpn_gianhap, ctpn_create) VALUES (?,?,?,?,?)";
                await pool.query(sql, [pn_id, sp_code, sp_sl, sp_gianhap, ctpn_create]);

                // Cập nhật số lượng và giá nhập trong bảng products
                const [productSql] = await pool.query("SELECT * FROM products WHERE sp_code = ?", [sp_code]);
                if (productSql.length > 0) {
                    const product = productSql[0];
                    const newProductQuantity = parseInt(product.sp_sl) + parseInt(sp_sl);
                    const newProductCost = sp_gianhap;
                    console.log(newProductQuantity);
                    // Cập nhật số lượng và giá nhập sản phẩm trong bảng products
                    console.log(typeof (parseInt(product.sp_sl)));
                    await pool.query(
                        "UPDATE products SET sp_sl = ?, sp_gianhap = ? WHERE sp_code = ?",
                        [newProductQuantity, newProductCost, sp_code]
                    );
                }
            }

            res.json({
                status: "success"
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },
    // Các hàm khác cần phải cài đặt tương tự
    getByPn: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM phieu_nhap AS p, ctpnhap AS c WHERE p.pn_id = c.pn_id")
            res.json({
                data: rows
            })

        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            })
        }
    },
};

module.exports = controller;
