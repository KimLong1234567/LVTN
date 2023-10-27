const pool = require("../database/index")

const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM phieu_nhap WHERE sp_code IS NULL;")
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
            const [rows, fields] = await pool.query("SELECT * FROM phieu_nhap WHERE pn_id = ?", [id])
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
    getByPn: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("(SELECT * FROM phieu_nhap AS p, nhan_vien AS n WHERE  n.nv_id = p.nv_id AND sp_code IS NULL) ORDER BY pn_id DESC")
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
    getByPnId: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("SELECT * FROM phieu_nhap AS p, nhan_vien AS n, ctpnhap AS c, products AS pr WHERE p.pn_id = c.pn_id AND n.nv_id = p.nv_id AND p.pn_id = ? AND pr.sp_code = c.sp_code ", [id])
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
            const { pn_total, nv_id, sp_code } = req.body;
            const pn_create = new Date();

            console.log(req.body);
            // console.log(pet_prod_img);
            const sql = "INSERT INTO phieu_nhap (pn_total, nv_id, sp_code, pn_create) VALUES (?,?,?,?)"
            const [result] = await pool.query(sql, [pn_total, nv_id, sp_code, pn_create])
            const pn_id = result.insertId;
            res.json({
                data: { pn_id }
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
            if (req.body.pn_total) {
                updateData.pn_total = req.body.pn_total
            }

            if (req.body.nv_id) {
                updateData.nv_id = req.body.nv_id
            }

            if (req.body.sp_code) {
                updateData.sp_id = req.file.sp_code;
            }

            updateData.cate_update = new Date();

            const sql = "UPDATE phieu_nhap SET ? WHERE pn_id = ?"
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
