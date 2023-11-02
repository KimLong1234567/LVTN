const pool = require("../database/index")

const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM donhang")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("SELECT * FROM donhang WHERE kh_id = ?", [id])
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
    getByDh: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("(SELECT * FROM donhang AS d, ctdh AS c WHERE c.dh_id = d.dh_id AND sp_code IS NULL) ORDER BY dh_id DESC")
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
    getAllBill: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT d.dh_id, d.dh_sl, d.dh_total , d.dh_create, d.dh_pay, d.dh_status, d.dh_address, u.user_name, u.user_email, u.user_phone, c.ctdh_id, c.sp_code, c.ctdh_sl, p.sp_name, p.sp_image, c.ctdh_price FROM donhang AS d LEFT JOIN ctdh AS c ON d.dh_id = c.dh_id LEFT JOIN products AS p ON c.sp_code = p.sp_code LEFT JOIN users AS u ON d.kh_id = u.user_id ORDER BY d.dh_create DESC")

            // Tạo một đối tượng mới để lập trình lại cấu trúc dữ liệu
            const result = [];
            let currentDhId = -1;
            let currentCtdhId = -1;
            let currentRow = null;

            for (const row of rows) {
                if (row.dh_id !== currentDhId) {
                    // Bắt đầu một đơn hàng mới
                    currentRow = {
                        dh_id: row.dh_id,
                        dh_create: row.dh_create,
                        dh_address: row.dh_address,
                        dh_pay: row.dh_pay,
                        dh_status: row.dh_status,
                        dh_sl: row.dh_sl,
                        dh_total: row.dh_total,
                        user_name: row.user_name,
                        user_email: row.user_email,
                        user_phone: row.user_phone,
                        ctdh: [],
                    };
                    result.push(currentRow);
                    currentDhId = row.dh_id;
                }

                if (row.ctdh_id !== currentCtdhId) {
                    // Thêm chi tiết sản phẩm vào đơn hàng
                    currentRow.ctdh.push({
                        ctdh_id: row.ctdh_id,
                        sp_code: row.sp_code,
                        ctdh_sl: row.ctdh_sl,
                        sp_name: row.sp_name,
                        sp_image: row.sp_image,
                        ctdh_price: row.ctdh_price,
                    });
                    currentCtdhId = row.ctdh_id;
                }
            }
            res.json({
                data: result,
            })

        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            })
        }
    },
    getByUserId: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("SELECT d.dh_id, d.dh_sl, d.dh_total , d.dh_create, d.dh_pay, d.dh_status, d.dh_address, u.user_name, u.user_email, u.user_phone, c.ctdh_id, c.sp_code, c.ctdh_sl, p.sp_name, p.sp_image, c.ctdh_price FROM donhang AS d LEFT JOIN ctdh AS c ON d.dh_id = c.dh_id LEFT JOIN products AS p ON c.sp_code = p.sp_code LEFT JOIN users AS u ON d.kh_id = u.user_id WHERE u.user_id = ? ORDER BY d.dh_create DESC", [id])

            // Tạo một đối tượng mới để lập trình lại cấu trúc dữ liệu
            const result = [];
            let currentDhId = -1;
            let currentCtdhId = -1;
            let currentRow = null;

            for (const row of rows) {
                if (row.dh_id !== currentDhId) {
                    // Bắt đầu một đơn hàng mới
                    currentRow = {
                        dh_id: row.dh_id,
                        dh_create: row.dh_create,
                        dh_address: row.dh_address,
                        dh_pay: row.dh_pay,
                        dh_status: row.dh_status,
                        dh_sl: row.dh_sl,
                        dh_total: row.dh_total,
                        user_name: row.user_name,
                        user_email: row.user_email,
                        user_phone: row.user_phone,
                        ctdh: [],
                    };
                    result.push(currentRow);
                    currentDhId = row.dh_id;
                }

                if (row.ctdh_id !== currentCtdhId) {
                    // Thêm chi tiết sản phẩm vào đơn hàng
                    currentRow.ctdh.push({
                        ctdh_id: row.ctdh_id,
                        sp_code: row.sp_code,
                        ctdh_sl: row.ctdh_sl,
                        sp_name: row.sp_name,
                        sp_image: row.sp_image,
                        ctdh_price: row.ctdh_price,
                    });
                    currentCtdhId = row.ctdh_id;
                }
            }
            res.json({
                data: result,
            })

        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        try {
            const { sp_code, dh_pay, dh_total, kh_id, dh_sl, dh_address } = req.body;
            const dh_create = new Date();

            console.log(req.body);
            // console.log(pet_prod_img);
            const sql = "INSERT INTO donhang (dh_pay, dh_total, sp_code, dh_create, kh_id, dh_sl, dh_address) VALUES (?,?,?,?,?,?,?)"
            const [result] = await pool.query(sql, [dh_pay, dh_total, sp_code, dh_create, kh_id, dh_sl, dh_address])
            const dh_id = result.insertId;
            const sqla = "UPDATE cart SET status = 1 WHERE kh_id = ?"
            await pool.query(sqla, [kh_id]);
            console.log(dh_id);
            res.json({
                data: { dh_id }
            })
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            // const { pet_category_name } = req.body
            const updateData = {};
            if (req.body.dh_status) {
                updateData.dh_status = req.body.dh_status
            }

            if (req.body.nv_id) {
                updateData.nv_id = req.body.nv_id
            }

            updateData.dh_update = new Date();

            const sql = "UPDATE donhang SET ? WHERE dh_id = ?"
            const [rows, fields] = await pool.query(sql, [updateData, id])
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
    //no use
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("UPDATE cate SET cate_status = '1' WHERE cate_id = ?", [id])
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
}

module.exports = controller
