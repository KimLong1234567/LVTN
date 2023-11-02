const pool = require("../database/index")

const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM comments AS c, users AS u, products AS p WHERE c.kh_id = u.user_id AND c.sp_id = p.sp_id")
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
            const [rows, fields] = await pool.query("SELECT * FROM comments AS c, users AS u WHERE c.sp_id = ? AND c.kh_id = u.user_id", [id])
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
            const b_status = req.body.b_status;
            console.log(req.body, b_status, id);
            let rows;
            if (b_status === 0) { //c_status la mong muon cua user nen cu update ko can kiem tra vi chi co 0 1
                [rows] = await pool.query("UPDATE comments SET b_status = 1 WHERE bl_id = ?", [id]);
            }
            else {
                [rows] = await pool.query("UPDATE comments SET b_status = 0 WHERE bl_id = ?", [id])
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
    create: async (req, res) => {
        try {
            const { bl_content, sp_id, kh_id } = req.body;
            const bl_create = new Date();

            console.log(req.body);
            console.log(sp_id, kh_id);
            // console.log(pet_prod_img);
            const sql = "INSERT INTO comments (bl_content, sp_id, kh_id, bl_create) VALUES (?,?,?,?)"
            const [rows, fields] = await pool.query(sql, [bl_content, sp_id, kh_id, bl_create])
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
            if (req.body.bl_content) {
                updateData.bl_content = req.body.bl_content
            }

            if (req.body.sp_id) {
                updateData.sp_id = req.body.sp_id
            }

            if (req.body.kh_id) {
                updateData.kh_id = req.body.kh_id;
            }

            updateData.bl_update = new Date();

            const sql = "UPDATE comments SET ? WHERE bl_id = ?"
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
            const [rows, fields] = await pool.query("DELETE FROM comments WHERE bl_id = ?", [id])
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
