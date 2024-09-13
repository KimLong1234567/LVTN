const pool = require('../database/index');
const multer = require('multer');
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
      const [rows, fields] = await pool.query(
        'SELECT * FROM nhan_vien WHERE nv_status = 0'
      );
      const sanitizedRows = rows.map((row) => {
        const {
          nv_id,
          nv_email,
          nv_hoten,
          nv_phone,
          nv_adress,
          cv_id,
          nv_avt,
          nv_date,
          nv_gt,
        } = row;
        return {
          nv_id,
          nv_email,
          nv_hoten,
          nv_phone,
          nv_adress,
          cv_id,
          nv_avt,
          nv_date,
          nv_gt,
        };
      });

      res.json({
        data: sanitizedRows,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
      });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query(
        'SELECT * FROM nhan_vien AS nv, chuc_vu AS cv WHERE nv.nv_id = ? AND nv.nv_status = 0 AND nv.cv_id = cv.cv_id',
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ status: 'not found' });
      }
      const sanitizedRows = rows.map(
        ({
          nv_id,
          nv_email,
          nv_hoten,
          nv_phone,
          nv_adress,
          cv_id,
          nv_avt,
          nv_date,
          nv_gt,
          cv_name,
        }) => ({
          nv_id,
          nv_email,
          nv_hoten,
          nv_phone,
          nv_adress,
          cv_id,
          nv_avt,
          nv_date,
          nv_gt,
          cv_name,
        })
      );
      res.json({ data: sanitizedRows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error' });
    }
  },

  create: async (req, res) => {
    try {
      const {
        nv_email,
        nv_password,
        nv_hoten,
        nv_phone,
        nv_address,
        nv_gt,
        cv_id,
        nv_date,
      } = req.body;
      const nv_avt = req.file.filename; // Lấy tên file đã được multer lưu
      const nv_create = new Date();
      const hashedpassword = hashPassword(nv_password);

      const sql =
        'INSERT INTO nhan_vien (nv_email, nv_password, nv_hoten, nv_avt, nv_phone, nv_adress, nv_gt, cv_id, nv_create, nv_date) VALUES (?,?,?,?,?,?,?,?,?,?)';
      const [rows, fields] = await pool.query(sql, [
        nv_email,
        hashedpassword,
        nv_hoten,
        nv_avt,
        nv_phone,
        nv_address,
        nv_gt,
        cv_id,
        nv_create,
        nv_date,
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
      if (req.body.nv_email) {
        updateData.nv_email = req.body.nv_email;
      }

      if (req.body.nv_password) {
        if (req.body.nv_password.length > 50) {
          updateData.nv_password = req.body.nv_password;
        }
        // const passwordHashed = hashPassword(req.body.nv_password);
        else {
          const passwordHashed = hashPassword(req.body.nv_password);
          updateData.nv_password = passwordHashed;
        }
      }

      console.log(req.body.nv_password);

      if (req.body.nv_hoten) {
        updateData.nv_hoten = req.body.nv_hoten;
      }

      if (req.body.nv_phone) {
        updateData.nv_phone = req.body.nv_phone;
      }

      if (req.file && req.file.filename) {
        updateData.nv_avt = req.file.filename;
      }

      if (req.body.nv_address) {
        updateData.nv_address = req.body.nv_address;
      }

      if (req.body.nv_gt) {
        updateData.nv_gt = req.body.nv_gt;
      }

      if (req.body.cv_id) {
        updateData.cv_id = req.body.cv_id;
      }

      updateData.nv_update = new Date();
      const sql = 'UPDATE nhan_vien SET ? WHERE nv_id = ?';
      const [rows, fields] = await pool.query(sql, [updateData, id]);
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
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "UPDATE nhan_vien SET nv_status = '1' WHERE nv_id = ?",
        [id]
      );
      res.status(200).json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
      });
    }
  },
  login: async (req, res, next) => {
    try {
      const { nv_email, nv_password } = req.body;
      console.log(req.body);
      console.log(nv_email);
      const hashedpassword = hashPassword(nv_password);
      console.log(hashedpassword);
      // Fetch admin by email from the database
      const [rows] = await pool.query(
        'SELECT * FROM nhan_vien AS n, chuc_vu AS c WHERE n.nv_email = ? AND n.cv_id = c.cv_id',
        nv_email
      );
      console.log(rows);
      const admin = rows[0];

      if (admin) {
        if (admin.nv_email !== nv_email) {
          res.status(400).json({
            data: 'email is not correct',
          });
        } else if (admin.nv_password !== hashedpassword) {
          res.status(400).json({
            data: 'password not correct',
          });
        } else {
          console.log('da login');
          return res.status(200).json({ data: 'signed', admin: admin });
        }
      } else {
        res.status(404).json({ data: 'admin not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
};

module.exports = controller;
