const pool = require("../database/index")

const controller = {
    getAll: async (req, res) => {
        try {
            //SELECT * FROM pet WHERE pet_status < 3 AS p, users AS u, cate AS c WHERE p.kh_id = u.user_id AND c.cate_id = p.cate_id
            const [rows, fields] = await pool.query("SELECT * FROM pet AS p, cate AS c, users AS u, service AS s WHERE p.cate_id = c.cate_id AND p.service_id = s.service_id AND p.kh_id = u.user_id")
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
            const [rows, fields] = await pool.query("SELECT * FROM pet WHERE p_id = ?", [id])
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
    getByUser: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("SELECT * FROM pet AS p, service AS s ,cate AS c, users AS u WHERE u.user_id = p.kh_id AND p.kh_id = ? AND u.user_id = ? AND c.cate_id = p.cate_id AND s.service_id = p.service_id", [id, id])
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
            const p_img = req.file.filename;
            const { p_name, service_id, cate_id, kh_id, } = req.body
            const p_create = new Date();
            console.log(req.body);
            console.log(req.file);
            console.log(p_img);

            const sql = "INSERT INTO pet ( p_name, service_id, cate_id, kh_id, p_create, p_img ) VALUES (?,?,?,?,?,?)"
            const [rows, fields] = await pool.query(sql, [p_name, service_id, cate_id, kh_id, p_create, p_img])
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
    updateAdmin: async (req, res) => {
        try {
            const { id } = req.params;
            // const { pet_name } = req.body
            const updateData = {};
            if (req.body.pet_service_detail) {
                updateData.pet_service_detail = req.body.pet_service_detail
            }

            if (req.body.pet_service_fee) {
                updateData.pet_service_fee = req.body.pet_service_fee
            }

            updateData.pet_status = 1;
            updateData.pet_service_date = new Date();

            const sql = "UPDATE pet SET ? WHERE stt_pet = ?"
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
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            // const { pet_name } = req.body
            const updateData = {};
            if (req.body.pet_name) {
                updateData.pet_name = req.body.pet_name
            }

            if (req.body.pet_description) {
                updateData.pet_description = req.body.pet_description
            }

            if (req.body.pet_category_id) {
                updateData.pet_category_id = req.body.pet_category_id
            }

            if (req.file && req.file.filename) {
                updateData.pet_img = req.file.filename;
            }

            updateData.ngay_sua_doi_pet = new Date();

            const sql = "UPDATE pet SET ? WHERE stt_pet = ?"
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
            //UPDATE pet_category SET pet_status = '3' WHERE stt_pet = ?
            const { id } = req.params
            const [rows, fields] = await pool.query("DELETE FROM pet WHERE stt_pet = ?", [id])
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
