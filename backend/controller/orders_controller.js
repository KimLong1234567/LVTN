const pool = require("../database/index")

// function generateRandomCharacter() {
//     const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
//     let randomCharacters = '';
//     for (let i = 0; i < 10; i++) {
//         const randomIndex = Math.floor(Math.random() * characters.length);
//         randomCharacters += characters.charAt(randomIndex);
//     }
//     return randomCharacters;
// }

// const randomChars = generateRandomCharacter();
// Hàm kiểm tra sản phẩm trong giỏ
const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM cart")
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
            const [rows, fields] = await pool.query("SELECT * FROM cart WHERE dh_id = ?", [id])
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
            const [rows, fields] = await pool.query("SELECT * FROM cart WHERE kh_id = ?", [id])
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
    getByUserCheck: async (req, res) => {
        try {
            // SELECT *FROM orders AS o, pet_product AS p, users AS u WHERE o.pet_prod_id = p.pet_prod_id AND o.user_id = '$id' AND u.user_id = '$id'   AND u.user_id = ?
            const { id } = req.params
            const [rows, fields] = await pool.query("(SELECT * FROM cart AS o, pet_product AS p, users AS u WHERE o.user_id = ? AND o.pet_prod_id = p.pet_prod_id AND u.user_id = ? AND o.user_id = ?) ORDER BY order_date DESC ", [id, id, id])
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
    getByUserChecked: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("SELECT * FROM cart AS o, pet_product AS p WHERE o.user_id = ? AND o.Status = '1' AND o.pet_prod_id = p.pet_prod_id", [id])
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
    selectInCart: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("SELECT * FROM cart AS c, products AS p WHERE c.sp_code = p.sp_code AND c.kh_id = ? AND c.status = 0", [id])
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
            const { kh_id, sp_code, gh_sl } = req.body
            console.log(req.body);
            const gh_create = new Date()
            const [sql] = await pool.query("SELECT * FROM cart WHERE kh_id = ? AND sp_code = ? AND status = 0", [kh_id, sp_code]);

            const cart = sql[0];
            // Kiểm tra sản phẩm trong giỏ
            console.log(sql.length);
            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của người dùng chưa
            console.log(cart);
            if (sql.length > 0) {
                // Nếu sản phẩm đã tồn tại, cập nhật số lượng
                await pool.query(
                    "UPDATE cart SET gh_sl = gh_sl + ? WHERE kh_id = ? AND sp_code = ?",
                    [gh_sl, kh_id, sp_code]
                );
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
                await pool.query(
                    "INSERT INTO cart (kh_id, sp_code, gh_sl, gh_create) VALUES (?, ?, ?, ?)",
                    [kh_id, sp_code, gh_sl, gh_create]
                );
            }

            // Cập nhật số lượng trong bảng products
            const [productSql] = await pool.query("SELECT * FROM products WHERE sp_code = ?", [sp_code]);
            if (productSql.length > 0) {
                const product = productSql[0];
                const newProductQuantity = product.sp_sl - gh_sl;

                // Cập nhật số lượng sản phẩm trong bảng products
                await pool.query(
                    "UPDATE products SET sp_sl = ? WHERE sp_code = ?",
                    [newProductQuantity, sp_code]
                );
            }
            res.json({
                status: "success",
            });

        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            })
        }
    },
    // Update order information no use
    updateOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = {}; // Đối tượng chứa dữ liệu cần cập nhật
            // Kiểm tra từng trường có dữ liệu và thêm vào đối tượng cập nhật
            if (req.body.order_total) {
                updateData.order_total = req.body.order_total;
            }

            if (req.body.order_numberOfItem) {
                updateData.order_numberOfItem = req.body.order_numberOfItem;
            }

            if (req.body.user_id) {
                updateData.user_id = req.body.user_id;
            }

            if (req.body.pet_prod_id) {
                updateData.pet_prod_id = req.body.pet_prod_id;
            }

            updateData.Status = '1'
            updateData.ngay_sua_doi_order = new Date();

            const sql = "UPDATE cart SET ? WHERE stt_order = ?";
            const [rows, fields] = await pool.query(sql, [updateData, id]);

            res.json({
                data: rows,
                message: "Order updated successfully."
            });
        } catch (error) {
            console.error("Error updating order: ", error);
            res.status(500).json({
                status: "error",
                message: "Error updating order."
            });
        }
    },
    // use 
    delete: async (req, res) => {
        try {
            const { id } = req.params
            console.log(id);
            const [rows, fields] = await pool.query("DELETE FROM cart WHERE gh_id = ?", [id])
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
