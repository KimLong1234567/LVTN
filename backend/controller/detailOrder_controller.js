const pool = require("../database/index");

const controller = {
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
                const { sp_code, gh_sl } = cart;

                const sql = "INSERT INTO ctdh (dh_id, sp_code, ctdh_sl, ctdh_create) VALUES (?,?,?,?)";
                await pool.query(sql, [dh_id, sp_code, gh_sl, ctdh_create]);
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
