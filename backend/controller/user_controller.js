const pool = require("../database/index")
const multer = require("multer")
const crypto = require('crypto');

// Hàm để mã hóa mật khẩu bằng SHA - 256
const hashPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    sha256.update(password);
    return sha256.digest('hex');
};

const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM users ")
            const sanitizedRows = rows.map((row) => {
                const { user_id, user_name, user_email, user_avt, user_gt, user_phone, user_address } = row;
                return { user_id, user_name, user_email, user_avt, user_gt, user_phone, user_address };
            });

            res.json({
                data: sanitizedRows
            });
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
            const [rows, fields] = await pool.query("SELECT * FROM users AS u, donhang AS c WHERE u.user_id = ? AND u.user_id = c.kh_id AND c.dh_status = 0", [id])
            const sanitizedRows = rows.map((row) => {
                const { user_id, user_email, user_avt, user_gt, user_phone, user_address } = row;
                return { user_id, user_email, user_avt, user_gt, user_phone, user_address };
            });
            res.json({
                data: sanitizedRows
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
            const { user_name, user_email, user_gt, user_password, user_phone, user_address } = req.body;
            const user_avt = req.file.filename; // Lấy tên file đã được multer lưu
            const user_create = new Date();
            const hashedpassword = hashPassword(user_password);

            console.log(req.body);
            console.log(req.file);
            console.log(hashedpassword);
            console.log(user_gt);
            console.log(user_avt);
            const sql = "INSERT INTO users (user_name, user_password, user_email, user_avt, user_phone, user_address, user_gt, user_create) VALUES (?,?,?,?,?,?,?,?)"
            const [rows, fields] = await pool.query(sql, [user_name, hashedpassword, user_email, user_avt, user_phone, user_address, user_gt, user_create])
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
    // den day
    update: async (req, res) => {
        try {
            const { id } = req.params;
            // const nv_password = req.body.nv_password;
            const updateData = {}; // Đối tượng chứa dữ liệu cần cập nhật
            // Kiểm tra từng trường có dữ liệu và thêm vào đối tượng cập nhật
            if (req.body.user_email) {
                updateData.user_email = req.body.user_email;
            }

            if (req.body.user_password) {
                if (req.body.user_password.length > 50) {
                    updateData.user_password = req.body.user_password;
                }
                // const passwordHashed = hashPassword(req.body.nv_password);
                else {
                    const passwordHashed = hashPassword(req.body.user_password);
                    updateData.user_password = passwordHashed;
                }
            }

            console.log(req.body.user_password);

            if (req.body.user_name) {
                updateData.user_name = req.body.user_name;
            }

            if (req.body.user_phone) {
                updateData.user_phone = req.body.user_phone;
            }

            if (req.file && req.file.filename) {
                updateData.user_avt = req.file.filename;
            }

            if (req.body.user_address) {
                updateData.user_address = req.body.user_address;
            }

            if (req.body.user_gt) {
                updateData.user_gt = req.body.user_gt;
            }

            updateData.user_update = new Date();
            console.log(req.body);
            console.log(req.file);
            console.log(updateData);
            const sql = "UPDATE users SET ? WHERE user_id = ?"
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
            const [rows, fields] = await pool.query("UPDATE nhan_vien SET nv_status = '1' WHERE nv_id = ?", [id])
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
    login: async (req, res, next) => {
        try {
            const { user_email, user_password } = req.body;
            const hashedpassword = hashPassword(user_password);
            console.log(hashedpassword);
            console.log(req.body);
            const [rows] = await pool.query("SELECT * FROM users WHERE user_email = ?", user_email);

            if (!rows.length) {
                return res.json({ data: "Không tìm thấy users" });
            }

            const user = rows[0];

            if (user.user_email !== user_email) {
                return res.json({ data: "email is not correct" });
            } else if (user.user_password !== hashedpassword) {
                return res.json({ data: "password not correct" });
            } else {
                console.log("da login");
                return res.status(200).json({ data: "signed", user });
            }

        } catch (error) {
            return res.json(error);
        }
    }
}


module.exports = controller
