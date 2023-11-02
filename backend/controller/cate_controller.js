const pool = require("../database/index")
const multer = require("multer")

const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM cate WHERE cate_status = '0'")
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
            const [rows, fields] = await pool.query("SELECT * FROM cate WHERE cate_id = ?", [id])
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
            const { cate_name } = req.body;
            const cate_img = req.file.filename; // Lấy tên file đã được multer lưu
            const cate_create = new Date();

            console.log(req.body);
            console.log(req.file);
            console.log(cate_img);
            // console.log(pet_prod_img);
            const sql = "INSERT INTO cate (cate_name, cate_create, cate_img) VALUES (?,?,?)"
            const [rows, fields] = await pool.query(sql, [cate_name, cate_create, cate_img])
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
            if (req.body.cate_name) {
                updateData.cate_name = req.body.cate_name
            }

            if (req.body.status) {
                updateData.status = req.body.status
            }

            if (req.file && req.file.filename) {
                updateData.cate_img = req.file.filename;
            }

            updateData.cate_update = new Date();

            const sql = "UPDATE cate SET ? WHERE cate_id = ?"
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
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const c_status = req.body.c_status;
            console.log(req.body, c_status, id);
            let rows;
            if (c_status === 0) { //c_status la mong muon cua user nen cu update ko can kiem tra vi chi co 0 1
                [rows] = await pool.query("UPDATE cate SET c_status = 1 WHERE cate_id = ?", [id]);
            }
            else {
                [rows] = await pool.query("UPDATE cate SET c_status = 0 WHERE cate_id = ?", [id])
            }
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
