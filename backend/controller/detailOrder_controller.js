const pool = require("../database/index");

const controller = {
    //SELECT p.sp_id, p.sp_code, p.sp_name, p.sp_image, p.cate_id, p.sp_gianhap, p.s_status AS product_status, c.cate_name, c.cate_status AS category_status, c.cate_img, dh.ctdh_price, dh.ctdh_sl FROM products p LEFT JOIN cate c ON p.cate_id = c.cate_id LEFT JOIN ( SELECT ctdh.sp_code, ctdh.ctdh_price, ctdh.ctdh_sl FROM ctdh INNER JOIN donhang dh ON ctdh.dh_id = dh.dh_id WHERE dh.dh_status != 3 ) dh ON p.sp_code = dh.sp_code;
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM ctdh");
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
            const [rows, fields] = await pool.query("SELECT * FROM ctdh WHERE ctdh_id = ?", [id]);
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
            const { carts, dh_id } = req.body;
            const ctdh_create = new Date();
            console.log(dh_id);
            console.log(carts);
            // Lặp qua danh sách sản phẩm và thêm từng sản phẩm vào chi tiết phiếu nhập
            for (var cart of carts) {
                const { sp_code, gh_sl, sp_price } = cart;

                const sql = "INSERT INTO ctdh (dh_id, sp_code, ctdh_sl, ctdh_create, ctdh_price) VALUES (?,?,?,?,?)";
                await pool.query(sql, [dh_id, sp_code, gh_sl, ctdh_create, sp_price]);

                // Cập nhật số lượng trong bảng products
                const [productSql] = await pool.query("SELECT * FROM products WHERE sp_code = ?", [sp_code]);
                if (productSql.length > 0) {
                    const product = productSql[0];
                    const newProductQuantity = product.sp_sl - gh_sl;

                    // Cập nhật số lượng sản phẩm trong bảng products
                    await pool.query(
                        "UPDATE products SET sp_sl = ? WHERE sp_code = ?",
                        [newProductQuantity, sp_code]
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
    getByDh: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM donhang AS d, ctdh AS c WHERE d.dh_id = c.dh_id")
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
