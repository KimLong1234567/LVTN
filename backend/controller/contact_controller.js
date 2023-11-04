const pool = require("../database/index")
const multer = require("multer")
const nodemailer = require('nodemailer');
require('dotenv').config()


const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM feedbacks ")
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
            // const { id } = req.params
            const [rows, fields] = await pool.query("SELECT * FROM feedbacks WHERE lh_status = '0'")
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
            const lh_img = req.file.filename;
            const { lh_name, lh_email, lh_sdt, lh_content, lh_address } = req.body;
            // Lấy tên file đã được multer lưu
            const lh_create = new Date();

            console.log(req.body);
            console.log(req.file);
            console.log(lh_img);
            // console.log(pet_prod_img);
            const sql = "INSERT INTO feedbacks (lh_name, lh_email, lh_sdt, lh_content, lh_address, lh_create, lh_img) VALUES (?,?,?,?,?,?,?)"
            const [rows, fields] = await pool.query(sql, [lh_name, lh_email, lh_sdt, lh_content, lh_address, lh_create, lh_img])
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
            const updateData = {};
            console.log(req.body);

            if (req.body.lh_ph) {
                updateData.lh_ph = req.body.lh_ph
            }

            const email = req.body.lh_email
            updateData.lh_update = new Date();
            updateData.lh_status = 1;
            const sql = "UPDATE feedbacks SET ? WHERE lh_id = ?"
            const [rows, fields] = await pool.query(sql, [updateData, id])
            console.log(updateData.lh_ph)
            console.log(email);

            // Cấu hình transporter ở đầu file
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                }
            });
            console.log(process.env.EMAIL_USERNAME);

            var mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: email, // Gửi email đến địa chỉ email của khách hàng
                subject: 'PETSHOP',
                html:
                    `   
                        <style>
                        h3 {
                            color: blue;
                        }
                        h4 {
                            font-weight: bold;
                        }
                        p {
                            font-size: 18px;
                        }
                        </style>
                        <div>
                            <h3>Hi, ${email}</h3>
                            <p>Here is what we had to say to you.</p>
                            <p>${updateData.lh_ph}<p>
                            <h4>Petshop is truly grateful. We wish our clients continued professional success, fortune, and health.</h4>
                            <h3>Do not rely this mail </h3>
                        </div>
                    `
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
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
            const [rows, fields] = await pool.query("UPDATE feedbacks SET  = '1' WHERE status = ?", [id])
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
