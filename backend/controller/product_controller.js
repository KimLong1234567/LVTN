const pool = require("../database/index")
const multer = require("multer")

const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM products AS p, cate AS c WHERE p.sp_status = 0 AND p.cate_id = c.cate_id")
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
    getByUser: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM products AS p, cate AS c, nhan_vien AS n WHERE p.sp_status = 0 AND p.cate_id = c.cate_id AND p.nv_id = n.nv_id")
            // const productsArray = Object.values(rows);
            // res.json(productsArray);
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
            // console.log(id);
            const [rows, fields] = await pool.query("SELECT * FROM products AS p, cate AS c WHERE p.sp_id = ? AND p.sp_status = 0 AND p.cate_id = c.cate_id", [id])
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
    getByTag: async (req, res) => {
        try {
            const { id } = req.params;
            let sql;

            switch (id) {
                case '3':
                    sql =
                        "SELECT * FROM pet_product AS p, pet_category AS pc WHERE p.pet_category_id = '3' AND p.pet_category_id = pc.pet_category_id";
                    break;
                case '2':
                    sql =
                        "SELECT * FROM pet_product AS p, pet_category AS pc WHERE p.pet_category_id = '2' AND p.pet_category_id = pc.pet_category_id";
                    break;
                case '1':
                    sql =
                        "SELECT * FROM pet_product AS p, pet_category AS pc WHERE p.pet_category_id = '1' AND p.pet_category_id = pc.pet_category_id";
                    break;
                // default:
                //     sql = "SELECT * FROM pet_product WHERE pet_prod_name LIKE ?";
                //     break;
            }

            const [rows, fields] = await pool.query(sql, [`%${id}%`]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: 'error'
            });
        }
    },
    getByName: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("SELECT * FROM products WHERE sp_name LIKE ? AND sp_status = 0", [`%${id}%`])
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
    getByLowToHighPrice: async (req, res) => {
        try {
            // const { id } = req.params
            const [rows, fields] = await pool.query("(SELECT * FROM products AS p, cate AS c WHERE p.s_status = 1 AND p.cate_id = c.cate_id)ORDER BY sp_price ASC")
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
    getByHighToLowPrice: async (req, res) => {
        try {
            // const { id } = req.params
            const [rows, fields] = await pool.query("(SELECT * FROM products WHERE s_status = 1) ORDER BY sp_price DESC")
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
            const s_status = req.body.s_status;
            console.log(req.body, s_status, id);
            let rows;
            if (s_status === 0) { //c_status la mong muon cua user nen cu update ko can kiem tra vi chi co 0 1
                [rows] = await pool.query("UPDATE products SET s_status = 1 WHERE sp_id = ?", [id]);
            }
            else {
                [rows] = await pool.query("UPDATE products SET s_status = 0 WHERE sp_id = ?", [id])
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
            const sp_image = req.file.filename;
            const { sp_code, sp_name, sp_price, sp_describe, sp_sl, sp_xuatxu, cate_id, sp_gianhap, nv_id, sp_note } = req.body
            const sp_create = new Date();
            console.log(req.body);
            console.log(req.file);
            console.log(sp_image);
            // console.log(pet_prod_img);

            const sql = "INSERT INTO products (sp_code, sp_name, sp_price, sp_image, sp_describe, sp_sl, sp_xuatxu, cate_id, sp_gianhap, nv_id, sp_create, sp_note) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
            const [rows, fields] = await pool.query(sql, [sp_code, sp_name, sp_price, sp_image, sp_describe, sp_sl, sp_xuatxu, cate_id, sp_gianhap, nv_id, sp_create, sp_note])
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
            const updateData = {}; // Đối tượng chứa dữ liệu cần cập nhật
            // Kiểm tra từng trường có dữ liệu và thêm vào đối tượng cập nhật
            if (req.body.sp_name) {
                updateData.sp_name = req.body.sp_name;
            }

            if (req.body.sp_describe) {
                updateData.sp_describe = req.body.sp_describe;
            }

            if (req.body.sp_sl !== undefined) {
                updateData.sp_sl = req.body.sp_sl;
            }

            if (req.body.sp_xuatxu) {
                updateData.sp_xuatxu = req.body.sp_xuatxu;
            }

            if (req.file && req.file.filename) {
                updateData.sp_image = req.file.filename;
            }

            if (req.body.sp_price) {
                updateData.sp_price = req.body.sp_price;
            }

            if (req.body.sp_gianhap) {
                updateData.sp_gianhap = req.body.sp_gianhap;
            }

            if (req.body.sp_note) {
                updateData.sp_note = req.body.sp_note;
            }

            if (req.body.cate_id) {
                updateData.cate_id = req.body.cate_id;
            }

            if (req.body.s_status) {
                updateData.s_status = req.body.s_status;
            }
            updateData.sp_update = new Date();
            console.log(req.body);
            console.log(req.file);
            console.log(updateData);
            const sql = "UPDATE products SET ? WHERE sp_id = ?"
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
            //DELETE FROM pet_product WHERE pet_prod_id = ?
            const { id } = req.params
            const [rows, fields] = await pool.query("UPDATE products SET sp_status = 1 WHERE sp_id = ?", [id])
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
