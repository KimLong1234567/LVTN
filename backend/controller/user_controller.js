const pool = require('../database/index');
const multer = require('multer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
// Hàm để mã hóa mật khẩu bằng SHA - 256
const hashPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  sha256.update(password);
  return sha256.digest('hex');
};

const controller = {
  getAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query(
        'SELECT * FROM users WHERE user_status = 0'
      );
      const sanitizedRows = rows.map((row) => {
        const {
          user_id,
          user_name,
          user_email,
          user_avt,
          user_gt,
          user_phone,
          user_address,
        } = row;
        return {
          user_id,
          user_name,
          user_email,
          user_avt,
          user_gt,
          user_phone,
          user_address,
        };
      });

      res.status(200).json({
        data: sanitizedRows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
      });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        'SELECT * FROM users AS u, donhang AS c WHERE u.user_id = ? AND u.user_id = c.kh_id AND c.dh_status = 0',
        [id]
      );
      const sanitizedRows = rows.map((row) => {
        const {
          user_id,
          user_email,
          user_avt,
          user_gt,
          user_phone,
          user_address,
        } = row;
        return {
          user_id,
          user_email,
          user_avt,
          user_gt,
          user_phone,
          user_address,
        };
      });
      res.status(200).json({
        data: sanitizedRows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
      });
    }
  },

  getByUser: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        'SELECT * FROM users AS u WHERE user_id = ?',
        [id]
      );
      const sanitizedRows = rows.map((row) => {
        const {
          user_id,
          user_name,
          user_email,
          user_avt,
          user_gt,
          user_phone,
          user_address,
        } = row;
        return {
          user_id,
          user_name,
          user_email,
          user_avt,
          user_gt,
          user_phone,
          user_address,
        };
      });
      res.status(200).json({
        data: sanitizedRows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
      });
    }
  },
  create: async (req, res) => {
    try {
      const {
        user_name,
        user_email,
        user_gt,
        user_password,
        user_phone,
        user_address,
      } = req.body;
      const user_avt = req.file.filename; // Lấy tên file đã được multer lưu
      const user_create = new Date();
      const hashedpassword = hashPassword(user_password);
      const sql =
        'INSERT INTO users (user_name, user_password, user_email, user_avt, user_phone, user_address, user_gt, user_create) VALUES (?,?,?,?,?,?,?,?)';
      const [rows, fields] = await pool.query(sql, [
        user_name,
        hashedpassword,
        user_email,
        user_avt,
        user_phone,
        user_address,
        user_gt,
        user_create,
      ]);
      res.status(200).json({
        data: rows,
      });
    } catch (error) {
      console.status(500).log(error);
      res.json({
        status: 'error',
      });
    }
  },
  //
  createGoogleAcc: async (req, res) => {
    try {
      const { user_name, user_email, user_password, user_phone, user_address } =
        req.body.account;
      const user_avt = 'Avatartrang.jpg';
      const user_create = new Date();

      const sql =
        'INSERT INTO users (user_name, user_password, user_email, user_avt, user_phone, user_address, user_create) VALUES (?,?,?,?,?,?,?)';
      const [rows, fields] = await pool.query(sql, [
        user_name,
        user_password,
        user_email,
        user_avt,
        user_phone,
        user_address,
        user_create,
      ]);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
      });
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
      const sql = 'UPDATE users SET ? WHERE user_id = ?';
      const [rows, fields] = await pool.query(sql, [updateData, id]);
      // Tạo một truy vấn SELECT để lấy thông tin người dùng đã cập nhật
      const selectSql = 'SELECT * FROM users WHERE user_id = ?';
      const [updatedUser, userFields] = await pool.query(selectSql, [id]);
      res.status(200).json({
        data: rows,
        data: updatedUser[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "UPDATE users SET user_status = '2' WHERE user_id = ?",
        [id]
      );
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
      });
    }
  },
  login: async (req, res, next) => {
    try {
      const { user_email, user_password } = req.body;
      if (user_password !== '') {
        const hashedpassword = hashPassword(user_password);
        console.log(hashedpassword);
        console.log(req.body);
        const [rows] = await pool.query(
          'SELECT * FROM users WHERE user_email = ?',
          user_email
        );

        if (!rows.length) {
          return res.json({ data: 'Không tìm thấy users' });
        }

        const user = rows[0];

        if (user.user_email !== user_email) {
          return res.status(401).json({ error: 'Wrong email' });
        } else if (user.user_password !== hashedpassword) {
          return res.status(401).json({ error: 'Wrong password' });
        } else {
          console.log('da login');
          return res.status(200).json({ data: 'signed', user });
        }
      } else {
        const [rows] = await pool.query(
          'SELECT * FROM users WHERE user_email = ?',
          user_email
        );
        if (!rows.length) {
          return res.status(404).json({ error: 'Không tìm thấy người dùng' });
        }

        const user = rows[0];

        if (user.user_email !== user_email) {
          return res.status(400).json({ error: 'Email không đúng' });
        } else {
          console.log('da login');
          return res.status(200).json({ data: 'signed', user });
        }
      }
    } catch (error) {
      return res.json(error);
    }
  },
  //
  resetPassword: async (req, res, next) => {
    try {
      const { user_email } = req.body;
      const [user] = await pool.query(
        'SELECT * FROM users WHERE user_email = ?',
        user_email
      );
      console.log(user);
      if (!user[0]) {
        const err = new Error('User not found');
        err.statusCode = 404;
        throw err;
      }

      const secret = jwt + user.user_password; // Replace with your actual secret key
      const token = jwt.sign({ email: user[0].user_email }, secret, {
        expiresIn: '5m',
      });
      console.log(user[0].user_email);
      const link = `http://localhost:3000/${token}/reset-password`;

      // Sending email logic
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME, // Replace with your Gmail address
          pass: process.env.EMAIL_PASSWORD, // Replace with your Gmail password
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user_email,
        subject: 'From Petshop: Password Reset ',
        html: `Click the following link to reset your password: ${link}
                <h4>Petshop is truly grateful. We wish our clients continued professional success, fortune, and health.</h4>
                <h3>Do not rely this mail </h3>
                `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          const err = new Error('Failed to send email');
          err.statusCode = 500;
          throw err;
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getToken: async (req, res, next) => {
    try {
      const decodedToken = jwt.decode(req.params.token);
      if (decodedToken) {
        res.status(200).json({
          status: 'success',
          data: decodedToken,
        });
      } else {
        const err = new Error('Invalid token');
        err.statusCode = 400;
        throw err;
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updateResetPassword: async (req, res, next) => {
    try {
      const { email } = req.params;
      const { user_password } = req.body;
      console.log(req.body, req.params);
      console.log(email);
      console.log(user_password);
      const passwordHashed = hashPassword(user_password);
      console.log(passwordHashed);
      const [rows, fields] = await pool.query(
        'UPDATE users SET user_password = ? WHERE user_email = ?',
        [passwordHashed, email]
      );
      res.status(200).json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

module.exports = controller;
