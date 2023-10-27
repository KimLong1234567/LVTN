const pool = require("../database/index")

const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM dchinhanhang")
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
            const [rows, fields] = await pool.query("SELECT * FROM dchinhanhang AS d, users AS u WHERE d.kh_id = u.user_id", [id])
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
            const { dcnh_address, kh_id } = req.body;
            const dcnh_create = new Date();

            console.log(req.body);
            console.log(sp_id, kh_id);
            // console.log(pet_prod_img);
            const sql = "INSERT INTO dchinhanhang (dcnh_address, kh_id, dcnh_create) VALUES (?,?,?)"
            const [rows, fields] = await pool.query(sql, [dcnh_address, kh_id, dcnh_create])
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
    update: async (req, res) => {
        try {
            const { id } = req.params;
            // const { pet_category_name } = req.body
            const updateData = {};
            if (req.body.dcnh_address) {
                updateData.dcnh_address = req.body.dcnh_address
            }

            if (req.body.kh_id) {
                updateData.kh_id = req.body.kh_id;
            }

            updateData.dcnh_update = new Date();

            const sql = "UPDATE dchinhanhang SET ? WHERE dcnh_id = ?"
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
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("DELETE FROM dchinhanhang WHERE bl_id = ?", [id])
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
