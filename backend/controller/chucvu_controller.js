const pool = require("../database/index")


const controller = {
    getChucVu: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM chuc_vu")
            res.json({
                data: rows
            })
        } catch (e) {
            console.log(error);
            res.json({
                status: "error"
            })
        }
    },
}

module.exports = controller
