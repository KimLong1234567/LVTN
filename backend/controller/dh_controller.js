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
    //no use
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
    //no use
    getByPnId: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("SELECT * FROM donhang AS p, nhan_vien AS n, ctpnhap AS c, products AS pr WHERE p.pn_id = c.pn_id AND n.nv_id = p.nv_id AND p.pn_id = ? AND pr.sp_code = c.sp_code ", [id])
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
